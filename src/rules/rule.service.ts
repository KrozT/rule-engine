import { Injectable } from '@nestjs/common';
import { Rule } from './rule.model';

@Injectable()
export class RuleService {
  evaluateData<T>(data: T, rule): boolean {
    switch (typeof data[rule.property]) {
      case 'number':
        if (this.checkNumericRule(data, rule)) {
          return false;
        }
        break;
      default:
        throw new Error('Invalid property type');
    }
    return true;
  }

  private checkNumericRule<T>(data: T, rule: Rule<T>): boolean {
    const { property, operator, value } = rule;
    const dataValue = data[property] as number;

    switch (operator) {
      case '>':
        return dataValue > value;
      case '<':
        return dataValue < value;
      case '>=':
        return dataValue >= value;
      case '<=':
        return dataValue <= value;
      case '==':
        return dataValue === value;
      default:
        return false;
    }
  }
}
