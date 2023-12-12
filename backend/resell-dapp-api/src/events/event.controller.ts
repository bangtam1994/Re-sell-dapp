import { Body, Param, Controller, Post, Put, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { TicketDto } from './dto/ticket.dto';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Creates an event in the database
  @Post('/create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  // Adds a ticket to an event (passing the event contract address as a parameter)
  @Put('/:eventAddress/ticket')
  async addTicket(
    @Param('eventAddress') eventAddress: string,
    @Body() ticketDto: TicketDto,
  ) {
    return this.eventService.createTicket(ticketDto, eventAddress);
  }

  // Resells a ticket (passing the event contract address as a parameter, the owner address and the quantity as query parameters)
  @Put('/:eventAddress/update-ticket')
  async updateTicket(
    @Param('eventAddress') eventAddress: string,
    @Body() ticketDto: TicketDto,
  ) {
    return this.eventService.updateTicket(eventAddress, ticketDto);
  }

  // Gets all the events of an user from the database
  @Get('/events/:userAddress')
  async getEvents(@Param('userAddress') userAddress: string) {
    return this.eventService.getEvents(userAddress);
  }

  // Gets one event by its contract address
  @Get('/event/:eventAddress')
  async getEventById(@Param('eventAddress') eventAddress: string) {
    return this.eventService.getEventById(eventAddress);
  }
}
