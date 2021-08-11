import { Storage } from '@capacitor/storage';

export default class ThemeSwitch {
   key = 'theme';
   darkThemeClass = 'dark-mode';
   isDark = false;

   constructor() {
      this.checkTheme().then((res) => {
         this.isDark = res == this.darkThemeClass;
         this.applyTheme();
         document.body.classList.remove('bg-primary');
      });
      setTimeout(() => this.addAnimation(), 1000);
   }

   toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
   }

   applyTheme() {
      if (this.isDark) document.body.classList.add(this.darkThemeClass);
      else document.body.classList.remove(this.darkThemeClass);
      this.setTheme(this.isDark ? this.darkThemeClass : '');
   }

   setTheme = async (theme: string) => {
      await Storage.set({
         key: this.key,
         value: theme,
      });
   };

   checkTheme = async () => {
      const { value } = await Storage.get({ key: this.key });
      return value ?? '';
   };

   addAnimation(): void {
      document.body.classList.add('theme-transition');
   }
}
