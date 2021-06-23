import { AttributeType } from "@/data-layer/attributes/attribute-type";
import Attribute from "./attribute";
import TypedArray from "./base/typed-array";
import CharacterClass from "./character-class";
import Check from "./check";
import Container from "./inventory/container";
import MagicSlot from "./magic/magic-slot";
import Settings from "./settings";

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
   magicAttribute: AttributeType = AttributeType.Unknown;
   magicLimit: number = 0;
   magicSlots: MagicSlot[] = [];
   attributes: Attribute[] = [];
   inventory: TypedArray<Container> = new TypedArray<Container>(Container);
   class: CharacterClass = new CharacterClass();
   settings: Settings = new Settings();

   constructor() {
      for (let i = 0; i < 6; i++) {
         this.attributes.push(new Attribute(i));
      }

      for (let i = 0; i < 11; i++) {
         this.magicSlots.push(new MagicSlot());
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
      this.magicSlots.forEach((x) => x.reset());
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

   clearSpells() {
      this.magicSlots.forEach((x) => x.confirmDelete());
   }

   get magicBonus() {
      return (this.magicAttribute < 0 ? 0 : this.attributes[this.magicAttribute].bonus) + this.proficiency;
   }

   get spellDifficulty() {
      return 8 + this.magicBonus;
   }
}
