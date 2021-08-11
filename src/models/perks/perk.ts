import { CooldownType } from './cooldown-type';

export default class Perk {
   name = '';
   description = '';
   count = 0;
   max = 1;
   expand = true;
   delete = false;
   cooldown = CooldownType.Permanent;

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
