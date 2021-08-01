export default class Deletable {
   public delete = false;

   toggleDeleteMode(mode: boolean) {
      this.delete = mode;
   }
}
