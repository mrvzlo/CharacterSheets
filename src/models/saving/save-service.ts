import AppConfig from '@/app-config';
import Character from '../character';
import Encoder from '../encoder';
import SaveData from './save-data';
import SaveResponse from './save-response';

export default class SaveService {
   encoder = new Encoder();
   config = new AppConfig();

   async getAll(): Promise<SaveData[]> {
      const list = [];
      for (let i = 0; i < this.config.saveSlots; i++) {
         list.push(new SaveData(i));
         await list[i].fillFields();
      }
      return list;
   }

   importCharacter(input: string, saveSlot: number): SaveResponse {
      try {
         const character = this.encoder.decode256(input, saveSlot);
         return new SaveResponse(character, true);
      } catch {
         return new SaveResponse(new Character(saveSlot), false);
      }
   }

   makeSave(character: Character) {
      const encoded = this.encoder.encode256(character);
      new SaveData(character.saveSlot).setData(encoded, character.name);
   }

   deleteSave(id: number) {
      new SaveData(id).delete();
   }

   async getSaveData(id: number): Promise<string> {
      return await new SaveData(id).getEncoded();
   }
}
