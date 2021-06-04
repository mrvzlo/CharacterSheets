import TypedArray from "../base/typed-array";
import Item from "./item";

export default class Container {
   name: string = "";
   capacity: number = 30;
   inner: TypedArray<Item> = new TypedArray<Item>(Item);
   delete: boolean = false;

   get weight() {
      const sum = this.inner.reduce((sum, x) => sum + x.count * x.weight, 0);
      return sum;
   }

   addItem() {
      this.inner.pushNew();
   }

   toggleDeleteMode(mode: boolean) {
      this.delete = mode;
      this.inner.forEach((x) => x.toggleDeleteMode(mode));
   }

   confirmDelete() {
      for (let i = 0; i < this.inner.length; i++) {
         if (this.inner[i].delete) {
            this.inner.splice(i, 1);
            i--;
         }
      }
   }
}
