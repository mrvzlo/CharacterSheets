import Check from './check';
import { CheckType } from '../data-layer/checks/check-type';
import { AttributeType } from '../data-layer/attributes/attribute-type';
import AttributeData from '@/data-layer/attributes/attribute-data';

export default class Attribute {
   type: AttributeType;
   value: number = 10;
   checks: Check[] = [];

   constructor(type: AttributeType) {
      this.type = type;
   }

   get bonus() {
      return Math.floor(this.value / 2) - 5;
   }

   getChecks(type: CheckType) {
      return this.checks.filter(function(x) {
         return x.type === type;
      });
   }

   get skillChecks() {
      return this.checks.filter(function(x) {
         return x.type >= 10;
      });
   }

   addCheck(type: CheckType): void {
      this.checks.push(new Check(type));
   }

   get color(): string {
      return this.data?.color ?? '';
   }

   get data(): AttributeData {
      return this.all.find((x) => x.id == this.type);
   }

   get all(): any[] {
      return require('@/data-layer/attributes/attributes.json');
   }
}
