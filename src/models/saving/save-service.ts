import Character from "../character";
import Encoder from "../encoder";
import HeaderMessageModel from "../header-message";
import SaveData from "./save-data";

export default class SaveService {
   saveSlots: SaveData[];
   encoder = new Encoder();

   constructor() {
      this.saveSlots = [];
      for (let i = 0; i < 4; i++) {
         this.saveSlots.push(new SaveData(i));
      }
   }

   importCharacter(input: string, method: number, headerMessage: HeaderMessageModel): Character {
      if (method == 0 || !this.isValid(input)) {
         return new Character();
      }

      try {
         const character = method == 64 ? this.encoder.decode64(input) : this.encoder.decode256(input);
         return character;
      } catch {
         headerMessage.showError("Ошибка загрузки");
         return new Character();
      }
   }

   hasSave(id: number) {
      const name = this.saveSlots[id].name;
      const check = this.isValid(name);
      return check;
   }

   async getSaveData(id: number) {
      return await this.saveSlots[id].getEncoded();
   }

   isValid(string: string) {
      return !!string && string !== "null";
   }

   applySave(character: Character, id: number = 0) {
      const encoded = this.encoder.encode256(character);
      if (character.name.length === 0) {
         character.name = "Неизвестный";
      }
      this.saveSlots[id].setData(encoded, character.name);
   }

   deleteSave(id: number) {
      this.saveSlots[id].setData("", "");
   }

   savedName(id: number) {
      if (!this.hasSave(id)) return "Свободный слот";
      const save = this.saveSlots[id];
      return save.name + " - " + this.dateFormat(save.datetime);
   }

   dateFormat(date: Date) {
      if (!date) return "";
      const formatted = new Date(date);
      return (
         this.formatTwoDigits(formatted.getDate()) +
         "." +
         this.formatTwoDigits(1 + formatted.getMonth()) +
         " " +
         this.formatTwoDigits(formatted.getHours()) +
         ":" +
         this.formatTwoDigits(formatted.getMinutes())
      );
   }

   formatTwoDigits(number: number) {
      return number > 9 ? number : "0" + number;
   }
}
