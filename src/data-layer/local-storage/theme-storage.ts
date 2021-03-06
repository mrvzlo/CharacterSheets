import StorageService from './storage.service';

export default class ThemeStorage extends StorageService {
   darkThemeClass = 'dark-mode';
   isDark = false;

   constructor() {
      super('theme');
      this.getData('').then((res) => {
         this.isDark = res == this.darkThemeClass;
         this.applyTheme();
         document.body.style.backgroundColor = '';
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
      this.setData(this.isDark ? this.darkThemeClass : '');
   }

   addAnimation(): void {
      document.body.classList.add('theme-transition');
   }
}
