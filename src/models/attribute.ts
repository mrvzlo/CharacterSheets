import Check from './check';
import { CheckTypes } from './enums/check-types';

export default class Attribute {
  name: string;
  value: number;
  checks: Check[];

  constructor(name: string) {
    this.name = name;
    this.value = 10;
    this.checks = [];
  }

  bonus() {
    return Math.floor(this.value / 2) - 5;
  }

  getChecks(type: CheckTypes) {
    return this.checks.filter(function (x) {
      return x.type === type;
    });
  }
}
