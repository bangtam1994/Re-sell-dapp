import { Body, Param, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { TicketDto } from './dto/ticket.dto';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/create-event')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Put('/:contractAddress/create-ticket')
  async createTicket(
    @Body() ticketDto: TicketDto,
    @Param('contractAddress') contractAddress: string,
  ) {
    return this.eventService.createTicket(ticketDto, contractAddress);
  }
}
