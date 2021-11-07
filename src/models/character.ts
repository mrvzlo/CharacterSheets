import { AttributeType } from '@/data-layer/attributes/attribute-type';
import Attribute from './attribute';
import DynamicArray from './base/dynamic-array';
import CharacterClass from './character-class';
import Check from './check';
import Countable from './countable';
import Container from './inventory/container';
import Item from './inventory/item';
import MagicSlot from './magic/magic-slot';
import Perk from './perks/perk';
import Proficiencies from './proficiencies/proficiencies';
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
   inventory = new DynamicArray<Container>(Container);
   countable = new DynamicArray<Countable>(Countable);
   perks = new DynamicArray<Perk>(Perk);
   class = new CharacterClass();
   settings = new Settings();
   proficiencies = new Proficiencies();

   constructor(public saveSlot: number) {
      const attributeCount = 6;
      const magicLevelsCount = 11;

      for (let i = 0; i < attributeCount; i++) {
         this.attributes.push(new Attribute(i));
      }

      for (let i = 0; i < magicLevelsCount; i++) {
         this.magicSlots.push(new MagicSlot());
      }

      new Check().all.forEach((check) => {
         this.attributes[check.attribute].addCheck(check.id);
      });
   }

   addContainer() {
      this.inventory.pushNew();
   }

   clearInventory() {
      this.inventory.clear();
      this.inventory.forEach((x) => x.clear());
   }

   addCountable() {
      this.countable.pushNew();
   }

   clearCountable() {
      this.countable.clear();
   }

   addPerk() {
      this.perks.pushNew();
   }

   clearPerks() {
      this.perks.clear();
   }

   clearSpells() {
      this.magicSlots.forEach((x) => x.clear());
   }

   get proficiency() {
      return Math.floor((this.level - 1) / 4) + 2;
   }

   get magicBonus() {
      let result = this.proficiency;
      if (this.magicAttribute === AttributeType.Unknown) return result;
      result += this.attributes[this.magicAttribute].bonus;
      return result;
   }

   get spellDifficulty() {
      return 8 + this.magicBonus;
   }

   get markedItems(): Item[] {
      return this.inventory.flatMap((x) => x.marked());
   }
}
