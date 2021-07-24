import { AttributeType } from '@/data-layer/attributes/attribute-type';
import Attribute from './attribute';
import TypedArray from './base/typed-array';
import CharacterClass from './character-class';
import Check from './check';
import Countable from './countable';
import Container from './inventory/container';
import MagicSlot from './magic/magic-slot';
import Settings from './settings';

export default class Character {
   name = '';
   race = '';
   story = '';
   level = 1;
   size = 2;
   alignment = 4;
   speed = 30;
   armor = 10;
   initiative = 0;
   masterInspiration = false;
   bardInspiration = 0;
   health = 8;
   healthMax = 8;
   healthBonus = 0;
   healthBoneValue = 8;
   healthBones = 1;
   magicAttribute = AttributeType.Unknown;
   magicLimit = 0;
   magicSlots: MagicSlot[] = [];
   attributes: Attribute[] = [];
   inventory = new TypedArray<Container>(Container);
   countable = new TypedArray<Countable>(Countable);
   class = new CharacterClass();
   settings = new Settings();

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

   addCountable() {
      this.countable.pushNew();
   }

   longRest() {
      this.health = this.healthMax;
      this.healthBones += this.level >> 1;
      if (this.healthBones > this.level) this.healthBones = this.level;
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

   clearCountable() {
      for (let i = 0; i < this.countable.length; i++) {
         if (this.countable[i].delete) {
            this.countable.splice(i, 1);
            i--;
         }
      }
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
