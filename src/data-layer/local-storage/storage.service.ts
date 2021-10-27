import { Storage } from '@capacitor/storage';

export default class StorageService {
   private key: string;

   constructor(key: string) {
      this.key = key;
   }

   setData = async (theme: string) => {
      await Storage.set({
         key: this.key,
         value: theme,
      });
   };

   getData = async (defaultValue: string): Promise<string> => {
      const { value } = await Storage.get({ key: this.key });
      return value ?? defaultValue;
   };
}
