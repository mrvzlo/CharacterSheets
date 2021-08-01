import { ParameterlessConstructor } from './parameterless-constructor';
import TypedArray from './typed-array';
import Deletable from './deletable';

export default class DynamicArray<T extends Deletable> extends TypedArray<T> {
   constructor(ctor: ParameterlessConstructor<T>) {
      super(ctor);
   }

   clear() {
      for (let i = 0; i < this.length; i++) {
         if (this[i].delete) {
            this.splice(i, 1);
            i--;
         }
      }
   }
}
