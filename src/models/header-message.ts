export default class HeaderMessage {
   text: string = "";
   icon: string = "";
   color: string = "";
   show: boolean = false;

   closeHeader() {
      this.show = false;
   }
   showHeader(text: string) {
      this.text = text;
      this.show = true;
      setTimeout(() => this.closeHeader(), 3000);
   }
   showError(text: string) {
      this.showHeader(text);
      this.icon = "fas fa-exclamation-triangle";
      this.color = "bg-danger";
   }
   showSuccess(text: string) {
      this.showHeader(text);
      this.icon = "fas fa-thumbs-up";
      this.color = "bg-success";
   }
}
