import Deletable from '../base/deletable';
import DynamicArray from '../base/dynamic-array';
import Item from './item';

export default class Container extends Deletable {
   name = '';
   capacity = 30;
   inner = new DynamicArray<Item>(Item);
   expand = true;

   get weight() {
      const sum = this.inner.reduce((sum, x) => sum + x.count * x.weight, 0);
      return Math.round(sum * 100) / 100;
   }

   addItem() {
      this.inner.pushNew();
   }

   toggleDeleteMode(mode: boolean) {
      super.toggleDeleteMode(mode);
      this.inner.forEach((x) => x.toggleDeleteMode(mode));
   }

   clear() {
      this.inner.clear();
   }
}
