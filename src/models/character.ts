import Attribute from "./attribute";
import TypedArray from "./base/typed-array";
import CharacterClass from "./character-class";
import Check from "./check";
import Container from "./inventory/container";

export default class Character {
   name: string = "";
   race: string = "";
   story: string = "";
   level: number = 1;
   size: number = 2;
   alignment: number = 4;
   speed: number = 30;
   armor: number = 10;
   initiative: number = 0;
   masterInspiration: Boolean = false;
   bardInspiration: number = 0;
   health: number = 8;
   healthMax: number = 8;
   healthBonus: number = 0;
   healthBoneValue: number = 8;
   healthBones: number = 1;
   attributes: Attribute[] = [];
   inventory: TypedArray<Container>;
   class: CharacterClass = new CharacterClass();

   constructor() {
      this.inventory = new TypedArray<Container>(Container);
      for (let i = 0; i < 6; i++) {
         this.attributes.push(new Attribute(i));
      }

      new Check().all.forEach((check) => {
         this.attributes[check.attribute].addCheck(check.id);
      });
   }

   get proficiency() {
      return Math.floor((this.level - 1) / 4) + 2;
   }

   addContainer() {
      this.inventory.pushNew();
   }

   longRest() {
      this.health = this.healthMax;
      this.healthBones = this.level;
   }

   clearInventory() {
      for (let i = 0; i < this.inventory.length; i++) {
         if (this.inventory[i].delete) {
            this.inventory.splice(i, 1);
            i--;
         }
      }
      this.inventory.forEach((x) => x.confirmDelete());
   }
}
