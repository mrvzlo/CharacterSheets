export default class Countable {
   name = '';
   count = 0;
   max = 1;
   delete = false;

   toggleDeleteMode(mode: boolean) {
      this.delete = mode;
   }

   inc() {
      if (this.count < this.max) this.count++;
   }

   dec() {
      if (this.count > 0) this.count--;
   }
}
