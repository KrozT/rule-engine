import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Measurement, MeasurementSchema } from './measurement.model';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Measurement.name,
        schema: MeasurementSchema,
      },
    ]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService],
})
export class MeasurementModule {}
