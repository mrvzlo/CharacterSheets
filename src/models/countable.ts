import Deletable from './base/deletable';

export default class Countable extends Deletable {
   name = '';
   count = 0;
   max = 1;

   inc() {
      if (this.count < this.max) this.count++;
   }

   dec() {
      if (this.count > 0) this.count--;
   }
}
