import { HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      const createdEvent = new this.eventModel(createEventDto);
      return await createdEvent.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while creating the event',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTicket(
    ticketDto: TicketDto,
    eventAddress: string,
  ): Promise<Event> {
    const event = await this.eventModel.findOne({
      contractAddress: eventAddress,
    });
    if (event) {
      // check if ticket already exists
      const ticket = event.ticketList.find(
        (ticket) => ticket.ticket_address === ticketDto.ticket_address,
      );
      if (ticket) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Ticket already exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      // check if the length of the ticket list is equal to the quantity of the event
      if (event.ticketList.length === event.quantity) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No more tickets available',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      event.ticketList.push(ticketDto);
      return await event.save();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTicket(
    eventAddress: string,
    ticketDto: TicketDto,
  ): Promise<Event> {
    const event = await this.eventModel.findOne({
      contractAddress: eventAddress,
    });
    if (event) {
      const ticket = event.ticketList.find(
        (ticket) => ticket.ticket_address === ticketDto.ticket_address,
      );
      if (ticket) {
        ticket.owner_address = ticketDto.owner_address;
        ticket.onSale = ticketDto.onSale;
        ticket.price = ticketDto.price;
        ticket.date = ticketDto.date;
        return await event.save();
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Ticket not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  // ) {
  //   const event = await this.eventModel.findOne({
  //     eventAddress: eventAddress,
  //   });
  //   if (event) {
  //     const tickets = event.ticketList.filter(
  //       (ticket) => ticket.owner_address === ownerAddress,
  //     );
  //     if (tickets.length < quantity) {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.BAD_REQUEST,
  //           error: 'Not enough tickets',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     } else {
  //       change the onSale property of the tickets to true
  //       tickets.forEach((ticket) => (ticket.onSale = true));
  //       return await event.save();
  //     }
  //   } else {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         error: 'Event not found',
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }
}
