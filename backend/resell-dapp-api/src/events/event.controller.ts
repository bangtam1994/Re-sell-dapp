import {
  Body,
  Param,
  Query,
  Controller,
  Post,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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

  // Buys a ticket (passing the event contract address as a parameter, the buyer address as a query parameter)
  // @Put('/:eventAddress/buy-ticket')
  // async buyTicket(
  //   @Query('buyerAddress') buyerAddress: string,
  //   @Param('eventAddress') eventAddress: string,
  // ) {
  //   return this.eventService.buyTicket(buyerAddress, eventAddress);
  // }
}
