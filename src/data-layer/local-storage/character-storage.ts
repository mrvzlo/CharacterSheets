import { AppConfig } from '@/app-config';
import StorageService from './storage.service';

export default class CharacterStorage extends StorageService {
   constructor() {
      super('character');
   }

   getChoice(): Promise<number> {
      return this.getData(AppConfig.unselected.toString()).then((res) => +res);
   }

   saveChoice(newCharacter: number) {
      this.setData(newCharacter.toString());
   }
}
