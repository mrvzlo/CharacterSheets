import TypedArray from "../base/typed-array";
import Item from "./item";

export default class Container {
   name: string = "";
   capacity: number = 30;
   inner: TypedArray<Item> = new TypedArray<Item>(Item);

   get weight() {
      const sum = this.inner.reduce((sum, x) => sum + x.count * x.weight, 0);
      return sum;
   }

   addItem() {
      this.inner.pushNew();
   }
}
