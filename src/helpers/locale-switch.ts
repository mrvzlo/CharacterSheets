import { VueI18n } from 'vue-i18n';
import StorageService from './storage.service';

export default class LocaleSwitch extends StorageService {
   private $i18n: VueI18n;
   private locales = ['ru', 'en'];
   private nativeNames = ['Русский', 'English'];

   constructor($i18n: VueI18n) {
      super('locale');
      this.$i18n = $i18n;
      this.checkTheme('en').then((res) => {
         this.setLocale(res);
      });
   }

   toggleLocale() {
      this.setLocale(this.nextLocale());
   }

   nextLocale(): string {
      return this.locales[this.nextLocaleId()];
   }

   nextLocaleId(): number {
      const current = this.locales.indexOf(this.$i18n.locale);
      return (current + 1) % this.locales.length;
   }

   nextLocaleNativeName(): string {
      return this.nativeNames[this.nextLocaleId()];
   }

   setLocale(newLocale: string) {
      this.$i18n.locale = newLocale;
   }
}
