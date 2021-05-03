import Check from "./check";
import { CheckType } from "../data-layer/checks/check-type";
import AttributeData from "../data-layer/attributes/attribute-data";
import { AttributeType } from "../data-layer/attributes/attribute-type";

export default class Attribute {
   type: AttributeType;
   value: number;
   checks: Check[];

   constructor(type: AttributeType) {
      this.value = 10;
      this.checks = [];
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

   get name(): string {
      const list: AttributeData[] = require("../data-layer/attributes/attributes.json");
      return list.find((x) => x.id == this.type)?.short ?? "";
   }
}
