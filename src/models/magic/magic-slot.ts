import DynamicArray from '../base/dynamic-array';
import Spell from './spell';

export default class MagicSlot {
   name = '';
   uses = 0;
   limit = 0;
   expand = true;
   spells = new DynamicArray<Spell>(Spell);

   reset() {
      this.uses = this.limit;
   }

   addItem() {
      this.spells.pushNew();
   }

   toggleDeleteMode(mode: boolean) {
      this.spells.forEach((x) => x.toggleDeleteMode(mode));
   }

   clear() {
      this.spells.clear();
   }
}
