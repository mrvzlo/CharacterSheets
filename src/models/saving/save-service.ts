import { AppConfig } from '@/app-config';
import Character from '../character';
import Encoder from '../encoder';
import SaveData from './save-data';
import SaveResponse from './save-response';
import { readAsText } from 'promise-file-reader';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { Capacitor } from '@capacitor/core';

export default class SaveService {
   encoder = new Encoder();

   async getAll(): Promise<SaveData[]> {
      const list = [];
      for (let i = 0; i < AppConfig.saveSlots; i++) {
         list.push(new SaveData(i));
         await list[i].fillFields();
      }
      return list;
   }

   async loadBySaveSlot(id: number): Promise<SaveResponse> {
      const data = await this.getSaveData(id);
      return this.load(data, id);
   }

   private load(input: string, saveSlot: number): SaveResponse {
      try {
         const character = this.encoder.decode256(input, saveSlot);
         return new SaveResponse(character, true);
      } catch {
         return new SaveResponse(new Character(saveSlot), false);
      }
   }

   async makeSave(character: Character): Promise<void> {
      const encoded = this.encoder.encode256(character);
      await new SaveData(character.saveSlot).saveToData(encoded, character.name);
   }

   deleteSave(id: number) {
      new SaveData(id).delete();
   }

   async export(id: number, name: string): Promise<void> {
      const data = await this.getSaveData(id);
      const isWeb = Capacitor.getPlatform() === 'web';
      isWeb ? this.webExport(data, name) : this.androidExport(data, name);
   }

   private webExport(data: string, name: string) {
      const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
      const fs = require('file-saver');
      fs.saveAs(blob, `${name}.save`);
   }

   private androidExport(data: string, name: string) {
      const base64Data = btoa(unescape(encodeURIComponent(data)));
      FileSharer.share({
         filename: name + '.save',
         base64Data: base64Data,
         contentType: 'text/plain',
      });
   }

   async import(id: number, file: File): Promise<SaveResponse> {
      const result = await readAsText(file);
      const importResult = this.load(result, id);
      if (!importResult.status) return importResult;
      importResult.character.saveSlot = id;
      await this.makeSave(importResult.character);
      return importResult;
   }

   async getSaveData(id: number): Promise<string> {
      return await new SaveData(id).getEncoded();
   }
}
