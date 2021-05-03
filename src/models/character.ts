import { CheckType } from "../data-layer/checks/check-type";
import Attribute from "./attribute";
import { AttributeType } from "../data-layer/attributes/attribute-type";

export default class Character {
   name: string = "";
   class: string = "";
   race: string = "";
   level: number = 1;
   speed: number = 30;
   armor: number = 10;
   initiative: number = 0;
   inspiration: Boolean = false;
   health: number = 8;
   healthMax: number = 8;
   healthBonus: number = 0;
   healthBoneValue: number = 8;
   healthBones: number = 1;
   attributes: Attribute[] = [];

   constructor() {
      for (let i = 0; i < 6; i++) {
         this.attributes.push(new Attribute(i));
         this.attributes[i].addCheck(CheckType.Saving);
      }

      this.attributes[AttributeType.Strength].addCheck(CheckType.Athletics);
      this.attributes[AttributeType.Dexterity].addCheck(CheckType.Acrobatics);
      this.attributes[AttributeType.Dexterity].addCheck(CheckType.SleightOfHand);
      this.attributes[AttributeType.Dexterity].addCheck(CheckType.Stealth);
      this.attributes[AttributeType.Intelligence].addCheck(CheckType.Investigation);
      this.attributes[AttributeType.Intelligence].addCheck(CheckType.History);
      this.attributes[AttributeType.Intelligence].addCheck(CheckType.Arcana);
      this.attributes[AttributeType.Intelligence].addCheck(CheckType.Nature);
      this.attributes[AttributeType.Intelligence].addCheck(CheckType.Religion);
      this.attributes[AttributeType.Wisdom].addCheck(CheckType.Perception);
      this.attributes[AttributeType.Wisdom].addCheck(CheckType.Survival);
      this.attributes[AttributeType.Wisdom].addCheck(CheckType.Medicine);
      this.attributes[AttributeType.Wisdom].addCheck(CheckType.Insight);
      this.attributes[AttributeType.Wisdom].addCheck(CheckType.AnimalHandling);
      this.attributes[AttributeType.Charisma].addCheck(CheckType.Performance);
      this.attributes[AttributeType.Charisma].addCheck(CheckType.Intimidation);
      this.attributes[AttributeType.Charisma].addCheck(CheckType.Deception);
      this.attributes[AttributeType.Charisma].addCheck(CheckType.Persuasion);
   }

   get proficiency() {
      return Math.floor((this.level - 1) / 4) + 2;
   }

   longRest() {
      this.health = this.healthMax;
      this.healthBones = this.level;
   }
}
