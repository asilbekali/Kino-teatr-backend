import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type filmDocument = HydratedDocument<film>;

@Schema()
export class film {
  @Prop()
  name: string;

  @Prop()
  image: string
}

export const filmSchema = SchemaFactory.createForClass(film);
