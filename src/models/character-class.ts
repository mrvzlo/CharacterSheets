import { ClassType } from '../data-layer/classes/class-type';
import ClassData from '../data-layer/classes/class-data';

export default class CharacterClass {
   type: ClassType;

   constructor(type: ClassType = ClassType.Unknown) {
      this.type = type;
   }

   get chosen(): boolean {
      return this.type !== ClassType.Unknown;
   }

   get bone(): number {
      return this.all.find((x) => x.id == this.type)?.bone ?? 0;
   }

   get all(): ClassData[] {
      return require('../data-layer/classes/classes.json');
   }
}
