import Deletable from '../base/deletable';

export default class Spell extends Deletable {
   name = '';
   components = '';
   marked = false;
   verbal = false;
   material = false;
   somatic = false;
   ritual = false;
   concentration = false;
}
