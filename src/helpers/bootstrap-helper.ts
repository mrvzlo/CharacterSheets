import { Popover } from 'bootstrap';
export default class BootstrapHelper {
   initTooltips() {
      [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
         return new Popover(e, { placement: 'top', trigger: 'focus' });
      });
   }
}
