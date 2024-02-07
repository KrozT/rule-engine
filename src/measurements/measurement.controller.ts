import { Controller, Post, Body } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { Measurement } from './measurement.model';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  async create(@Body() measurementData: Measurement) {
    return this.measurementService.createMeasurement(measurementData);
  }
}
