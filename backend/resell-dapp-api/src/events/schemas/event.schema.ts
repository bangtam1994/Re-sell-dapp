import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TicketDto } from '../dto/ticket.dto';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  contractAddress: string;

  @Prop()
  artistAddress: string;

  @Prop()
  artistName: string;

  @Prop()
  eventDate: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  ticketList: TicketDto[];
}
export const EventSchema = SchemaFactory.createForClass(Event);
