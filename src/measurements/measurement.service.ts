import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measurement } from './measurement.model';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectModel(Measurement.name)
    private readonly measurementModel: Model<Measurement>,
  ) {}

  async createMeasurement(measurementData: Measurement): Promise<Measurement> {
    const createdMeasurement = new this.measurementModel(measurementData);
    return createdMeasurement.save();
  }
}
