import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'charsheets',
   appName: 'CharSheets',
   webDir: 'dist',
   bundledWebRuntime: false,
   plugins: {
      SplashScreen: {
         launchShowDuration: 1000,
         launchAutoHide: true,
         useDialog: true,
      },
   },
};

export default config;
