import Deletable from '../base/deletable';

export default class Item extends Deletable {
   name = '';
   count = 1;
   weight = 0;
   marked = false;
   bonus = 0;
   category = 0;
}
