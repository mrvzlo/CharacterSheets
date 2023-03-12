import LZUTF8 from 'lzutf8/build/production/lzutf8';
import Character from './character';

export default class Encoder {
   dict: string[];

   constructor() {
      this.dict = [];
      this.dict.push('{"knowledge":');
      this.dict.push(',"id":');
      this.dict.push(',"type":');
      this.dict.push('{"value":');
      this.dict.push(',"checks":[');
      this.dict.push(',"inventory":[');
      this.dict.push('{"name":');
      this.dict.push(',"capacity":');
      this.dict.push('health');
   }

   compress(src: any): string {
      let json = JSON.stringify(src);
      if (!json) return '';

      this.dict.forEach((value, index) => {
         json = json.split(value).join(String.fromCharCode(index + 1));
      });
      return json;
   }

   decompress(src: string): any {
      this.dict.forEach((value, index) => {
         src = src.split(String.fromCharCode(index + 1)).join(value);
      });
      return JSON.parse(src);
   }

   encode256(src: any): string {
      const string = this.compress(src);
      const binary = LZUTF8.compress(string);
      const encoded = LZUTF8.encodeStorageBinaryString(binary);
      return encoded;
   }

   decode256(src: string, saveSlot: number) {
      const binary = LZUTF8.decodeStorageBinaryString(src);
      const string: any = LZUTF8.decompress(binary);
      const data = this.decompress(string);
      const parsed = this.parse(data, new Character(saveSlot));
      return parsed;
   }

   parse(data: any, object: any): any {
      if (typeof data !== 'object' || data === null) {
         return data;
      }

      while (Array.isArray(data) && object.length < data.length) {
         object.pushNew();
      }

      Object.keys(data).forEach((key) => {
         if (key == 'ctor') return;
         object[key] = this.parse(data[key], object[key]);
      });
      return object;
   }
}
