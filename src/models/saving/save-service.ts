import AppConfig from '@/app-config';
import Character from '../character';
import Encoder from '../encoder';
import FixedMessage from '../fixed-message';
import SaveData from './save-data';

export default class SaveService {
   saveSlots: SaveData[];
   encoder = new Encoder();
   config = new AppConfig();

   constructor() {
      this.saveSlots = [];
      for (let i = 0; i <= this.config.saveSlots; i++) {
         this.saveSlots.push(new SaveData(i));
      }
   }

   importCharacter(input: string, method: number, headerMessage: FixedMessage): Character {
      if (method == 0 || !this.isValid(input)) {
         return new Character();
      }

      try {
         const character = method == 64 ? this.encoder.decode64(input) : this.encoder.decode256(input);
         headerMessage.showSuccess('Загрузка завершена');
         return character;
      } catch {
         headerMessage.showError('Ошибка загрузки');
         return new Character();
      }
   }

   hasSave(id: number) {
      if (!this.saveSlots[id]) return false;
      const name = this.saveSlots[id].name;
      const check = this.isValid(name);
      return check;
   }

   isValid(string: string) {
      return !!string && string !== 'null';
   }

   makeSave(character: Character, id: number = 0) {
      if (character.name.length === 0) {
         character.name = 'Неизвестный';
      }
      const encoded = this.encoder.encode256(character);
      this.saveSlots[id].setData(encoded, character.name);
   }

   deleteSave(id: number) {
      this.saveSlots[id].delete();
   }

   savedName(id: number) {
      if (!this.hasSave(id)) return 'Пустой слот';
      const textLimit = 15;
      const name = this.saveSlots[id].name;
      return name.length > textLimit ? name.substring(0, textLimit) + '...' : name;
   }

   dateFormat(id: number) {
      if (!this.hasSave(id)) return '';
      const date = this.saveSlots[id].datetime;
      const formatted = new Date(date);
      return (
         this.formatTwoDigits(formatted.getDate()) +
         '.' +
         this.formatTwoDigits(1 + formatted.getMonth()) +
         ' ' +
         this.formatTwoDigits(formatted.getHours()) +
         ':' +
         this.formatTwoDigits(formatted.getMinutes())
      );
   }

   async getSaveData(id: number = 0): Promise<string> {
      return await this.saveSlots[id].getEncoded();
   }

   formatTwoDigits(number: number) {
      return number > 9 ? number : '0' + number;
   }
}
