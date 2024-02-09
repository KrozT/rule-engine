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
}
