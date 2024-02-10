import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measurement } from './measurement.model';
import { RuleService } from '../rules/rule.service';
import { Rule } from '../rules/rule.model';

@Injectable()
export class MeasurementService {
  private readonly rules: Rule<Measurement>[];

  constructor(
    @InjectModel(Measurement.name)
    private readonly measurementModel: Model<Measurement>,
    private readonly ruleService: RuleService,
  ) {
    this.rules = [
      { property: 'temperature', operator: '>', value: 70 },
      { property: 'humidity', operator: '>', value: 50 },
      { property: 'flow', operator: '>', value: 10 },
      { property: 'pressure', operator: '<', value: 1 },
    ];
  }

  /**
   * Create a new measurement
   * @param measurementData
   */
  async createMeasurement(measurementData: Measurement): Promise<Measurement> {
    const allRulesPassed = this.rules.every((rule) => {
      if (this.ruleService.evaluateData(measurementData, rule)) {
        console.log(
          `Measurement rule passed: ${rule.property} ${rule.operator} ${rule.value} | Current value: ${measurementData[rule.property]}`,
        );
        return true;
      }
      console.log(
        `Measurement failed rule: ${rule.property} ${rule.operator} ${rule.value} | Current value: ${measurementData[rule.property]}`,
      );
      return false;
    });

    if (allRulesPassed) {
      console.log(
        'All rules passed, measurement has optimal values, congratulations!',
      );
    } else {
      console.log(
        'At least one rule failed, measurement has suboptimal values, please check the values and try again',
      );
    }

    const createdMeasurement = new this.measurementModel(measurementData);
    return createdMeasurement.save();
  }

  /**
   * Find all measurements
   */
  async findAll(): Promise<Measurement[]> {
    return this.measurementModel.find().exec();
  }

  /**
   * Find a measurement by its id
   * @param id
   */
  async findById(id: string): Promise<Measurement> {
    return this.measurementModel.findById(id).exec();
  }

  /**
   * Find all measurements by topic
   * @param topic
   */
  async findByTopic(topic: string): Promise<Measurement[]> {
    return this.measurementModel.find({ topic }).exec();
  }

  /**
   * Delete all measurements
   */
  async deleteAll(): Promise<Measurement[]> {
    const measurements = await this.measurementModel.find({}).exec();
    await this.measurementModel.deleteMany({}).exec();

    return measurements;
  }

  /**
   * Delete a measurement by its id
   * @param id
   */
  async deleteById(id: string): Promise<Measurement> {
    return this.measurementModel.findByIdAndDelete(id).exec();
  }

  /**
   * Delete all measurements by topic
   * @param topic
   */
  async deleteByTopic(topic: string): Promise<Measurement[]> {
    const measurements = await this.measurementModel.find({ topic }).exec();
    await this.measurementModel.deleteMany({ topic }).exec();

    return measurements;
  }

  /**
   * Update a measurement by its id
   * @param id
   * @param measurementData
   */
  async updateById(
    id: string,
    measurementData: Measurement,
  ): Promise<Measurement> {
    return this.measurementModel.findByIdAndUpdate(id, measurementData).exec();
  }

  /**
   * Update all measurements by topic
   * @param topic
   * @param measurementData
   */
  async updateByTopic(
    topic: string,
    measurementData: Measurement,
  ): Promise<Measurement[]> {
    await this.measurementModel.updateMany({ topic }, measurementData).exec();
    return await this.measurementModel.find({ topic }).exec();
  }
}
