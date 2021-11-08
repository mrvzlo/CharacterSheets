import CheckData from '@/data-layer/checks/check-data';
import { CheckType } from '@/data-layer/checks/check-type';

export default class Check {
   knowledge: number = 0;
   name: string = '';

   constructor(private id: number = 0) {}

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
            return 'icon icon-circle-empty';
         case 1:
            return 'icon icon-dot-circled';
         case 2:
            return 'icon icon-circle';
      }

      return '';
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
