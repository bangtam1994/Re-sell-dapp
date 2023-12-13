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

  async updateTicket(eventAddress: string, ticketDto: TicketDto) {
    const result = await this.eventModel.updateOne(
      {
        contractAddress: eventAddress,
        'ticketList.ticket_address': ticketDto.ticket_address,
      },
      {
        $set: {
          'ticketList.$.ticket_address': ticketDto.ticket_address,
          'ticketList.$.owner_address': ticketDto.owner_address,
          'ticketList.$.onSale': ticketDto.onSale,
          'ticketList.$.price': ticketDto.price,
          'ticketList.$.date': ticketDto.date,
        },
      },
    );

    if (result.matchedCount == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Event or ticket not found',
        },
        HttpStatus.NOT_FOUND,
      );
    } else if (result.modifiedCount == 0) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ticket not updated',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEvents(userAddress: string) {
    // fetch all events from the database
    const events = await this.eventModel.find().exec();

    // iterate over the events
    const attendingEvents = [];
    const myEvents = [];
    const remainingEvents = [];

    events.forEach((event) => {
      // check if the user is the artist
      if (event.artistAddress === userAddress) {
        myEvents.push(event);
      } else {
        // check if the user is attending the event
        const ticket = event.ticketList.find(
          (ticket) => ticket.owner_address === userAddress,
        );
        if (ticket) {
          attendingEvents.push(event);
        } else {
          remainingEvents.push(event);
        }
      }
    });

    return {
      attendingEvents,
      myEvents,
      remainingEvents,
    };
  }

  async getEventById(eventAddress: string) {
    const event = await this.eventModel.findOne({
      contractAddress: eventAddress,
    });
    if (event) {
      return event;
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
}
