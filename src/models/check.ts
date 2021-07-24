import CheckData from '@/data-layer/checks/check-data';
import { CheckType } from '@/data-layer/checks/check-type';

export default class Check {
   id: number;
   knowledge: number = 0;

   constructor(id: number = 0) {
      this.id = id;
   }

   get(proficiency: number, value: number) {
      return value + proficiency * this.knowledge;
   }

   inc() {
      this.knowledge = this.knowledge + 1;
      this.knowledge %= this.type == CheckType.Saving ? 2 : 3;
   }

   get level(): string {
      switch (this.knowledge) {
         case 0:
            return 'far fa-circle';
         case 1:
            return 'fas fa-dot-circle';
         case 2:
            return 'fas fa-circle';
      }

      return '';
   }

   get name(): string {
      return this.data?.name ?? '';
   }

   get type(): CheckType {
      return this.data?.type ?? 0;
   }

   get data(): CheckData {
      return this.all.find((x) => x.id == this.id);
   }

   get all(): any[] {
      return require('../data-layer/checks/checks.json');
   }
}
