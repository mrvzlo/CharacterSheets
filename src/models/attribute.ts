import Check from './check';
import { CheckType } from './enums/check-type';
import { AttributeType } from './enums/attribute-type';

export default class Attribute {
  type: AttributeType;
  value: number;
  checks: Check[];

  constructor(type: AttributeType) {
    this.value = 10;
    this.checks = [];
    this.type = type;
  }

  bonus() {
    return Math.floor(this.value / 2) - 5;
  }

  getChecks(type: CheckType) {
    return this.checks.filter(function (x) {
      return x.type === type;
    });
  }

  getSkillChecks() {
    return this.checks.filter(function (x) {
      return x.type >= 10;
    });
  }

  addCheck(type: CheckType): void {
    this.checks.push(new Check(type));
  }

  name(): string {
    switch (this.type) {
      case AttributeType.Charisma: return "ХАР";
      case AttributeType.Wisdom: return "МУД";
      case AttributeType.Strength: return "СИЛ";
      case AttributeType.Constitution: return "ТЕЛ";
      case AttributeType.Dexterity: return "ЛОВ";
      case AttributeType.Intelligence: return "ИНТ";
    }
    return '';
  }
}
