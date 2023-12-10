import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('')
export class EventController {
  constructor() {}

  @Post('/create-event')
  async createEvent() {}
}
