import { Body, Param, Query, Controller, Post, Put, HttpStatus, HttpException } from '@nestjs/common';
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
  @Put('/:contractAddress/ticket')
  async addTicket(
    @Param('contractAddress') contractAddress: string,
    @Body() ticketDto?: TicketDto,
    @Body('buyerAddress') buyerAddress?: string,
  ) {
    if (ticketDto) {
      return this.eventService.createTicket(ticketDto, contractAddress);
    }
    else if (buyerAddress) {
      return this.eventService.buyTicket(buyerAddress, contractAddress);
    }
    else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No ticket or buyer address provided',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // Resells a ticket (passing the event contract address as a parameter, the owner address and the quantity as query parameters)
  @Put('/:contractAddress/resell-ticket')
  async resellTicket(
    @Query('ownerAddress') ownerAddress: string,
    @Query('quantity') quantity: number,
    @Param('contractAddress') contractAddress: string,    
  ) {
    return this.eventService.resellTicket(ownerAddress, quantity, contractAddress);
  }

  // Buys a ticket (passing the event contract address as a parameter, the buyer address as a query parameter)
  // @Put('/:contractAddress/buy-ticket')
  // async buyTicket(
  //   @Query('buyerAddress') buyerAddress: string,
  //   @Param('contractAddress') contractAddress: string,
  // ) {
  //   return this.eventService.buyTicket(buyerAddress, contractAddress);
  // }
}
