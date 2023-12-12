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
    event.ticketList.push(ticketDto);
    return event.save();
  }

  
}
