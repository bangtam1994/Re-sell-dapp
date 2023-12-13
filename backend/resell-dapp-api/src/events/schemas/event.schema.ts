import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

interface Ticket {
  ticket_address: string;
  owner_address: string;
  onSale: boolean;
  price: number;
  date: string;
}

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
  ticketList: Ticket[];
}
export const EventSchema = SchemaFactory.createForClass(Event);
