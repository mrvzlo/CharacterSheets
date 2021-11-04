import Deletable from '../base/deletable';
import { CooldownType } from './cooldown-type';

export default class Perk extends Deletable {
   name = '';
   description = '';
   count = 0;
   max = 1;
   expand = true;
   cooldown = CooldownType.Permanent;

   inc() {
      if (this.count < this.max) this.count++;
   }

   dec() {
      if (this.count > 0) this.count--;
   }
}
