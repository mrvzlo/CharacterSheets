export default class Spell {
   name = "";
   components = "";
   marked = false;
   verbal = false;
   material = false;
   somatic = false;
   ritual = false;
   delete = false;

   toggleDeleteMode(mode: boolean) {
      this.delete = mode;
   }
}
