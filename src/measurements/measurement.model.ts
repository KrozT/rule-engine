import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Measurement extends Document {
  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true, index: true })
  topic: string;

  @Prop({ required: false })
  temperature: number;

  @Prop({ required: false })
  humidity: number;

  @Prop({ required: false })
  flow: number;

  @Prop({ required: false })
  pressure: number;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
