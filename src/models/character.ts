import Attribute from "./attribute";
import CharacterClass from "./character-class";
import { ClassType } from "../data-layer/classes/class-type";
import Check from "./check";

export default class Character {
   name: string = "";
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
   class: CharacterClass = new CharacterClass(ClassType.Unknown);

   constructor() {
      for (let i = 0; i < 6; i++) {
         this.attributes.push(new Attribute(i));
      }

      new Check(0).all.forEach((check) => {
         this.attributes[check.attribute].addCheck(check.id);
      });
   }

   get proficiency() {
      return Math.floor((this.level - 1) / 4) + 2;
   }

   longRest() {
      this.health = this.healthMax;
      this.healthBones = this.level;
   }
}
