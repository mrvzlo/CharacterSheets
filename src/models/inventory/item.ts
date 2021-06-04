export default class Item {
   name: string = "";
   count: number = 1;
   weight: number = 0;
   delete = false;

   toggleDeleteMode(mode: boolean) {
      this.delete = mode;
   }
}
