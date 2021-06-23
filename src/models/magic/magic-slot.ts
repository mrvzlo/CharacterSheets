import TypedArray from "../base/typed-array";
import Spell from "./spell";

export default class MagicSlot {
   name = "";
   uses = 0;
   limit = 0;
   spells: TypedArray<Spell> = new TypedArray<Spell>(Spell);

   reset() {
      this.uses = this.limit;
   }

   addItem() {
      this.spells.pushNew();
   }

   toggleDeleteMode(mode: boolean) {
      this.spells.forEach((x) => x.toggleDeleteMode(mode));
   }

   confirmDelete() {
      for (let i = 0; i < this.spells.length; i++) {
         if (this.spells[i].delete) {
            this.spells.splice(i, 1);
            i--;
         }
      }
   }
}
