export default class FixedMessage {
   text = '';
   icon = '';
   color = '';
   show = false;
   close = true;

   closeHeader() {
      this.show = false;
   }
   showHeader(text: string) {
      this.text = text;
      this.show = true;
      setTimeout(() => this.closeHeader(), 3000);
   }
}
