import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  artistAddress: string;

  @Prop()
  eventDate: string;

  @Prop()
  feePercentage: string;
}
export const EventSchema = SchemaFactory.createForClass(Event);
