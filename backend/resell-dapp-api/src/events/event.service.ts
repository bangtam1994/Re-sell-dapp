import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { TicketDto } from './dto/ticket.dto';

@Injectable()
export class EventService {

  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async createTicket(ticketDto: TicketDto, contractAddress: string): Promise<Event> {
    const event = await this.eventModel.findOne({ contractAddress: contractAddress });
    if (event) {
      // check if ticket already exists
      const ticket = event.ticketList.find(ticket => ticket.ticket_address === ticketDto.ticket_address);
      if (ticket) {
        throw new Error('Ticket already exists');
      }
      event.ticketList.push(ticketDto);
      return event.save();
    }
    else {
      throw new Error('Event not found');
    }
  }

  async resellTicket(ownerAddress: string, quantity: number, contractAddress: string) {
    // return all the tickets of the event that have the same owner address as the one passed as a parameter
    const event = await this.eventModel.findOne({ contractAddress: contractAddress });
    if (event) {
      const tickets = event.ticketList.filter(ticket => ticket.owner_address === ownerAddress);
      if (tickets.length < quantity) {
        throw new Error('Not enough tickets');
      }
      else {
        // change the onSale property of the tickets to true
        tickets.forEach(ticket => ticket.onSale = true);
        return event.save();
      }
    }
    else {
      throw new Error('Event not found');
    }
  }
  
}
