import { Filesystem, Directory, Encoding, ReadFileResult } from '@capacitor/filesystem';

export default class SaveData {
   id: number;
   empty: boolean;
   name: string = '';
   datetime: Date = new Date();

   constructor(id: number) {
      this.id = id;
      this.empty = true;
   }

   async fillFields(): Promise<void> {
      const result = await this.getSave();
      if (!result) return;
      const splitted = result.data.split('\n');
      this.name = splitted[0];
      this.datetime = new Date(splitted[1]);
      this.empty = false;
   }

   async getEncoded(): Promise<string> {
      const result = await await this.getSave();
      if (!result) return '';
      const splitted = result.data.split('\n');
      return !splitted ? '' : splitted[2];
   }

   private async getSave(): Promise<ReadFileResult | null> {
      if (!(await this.check(this.fileName()))) {
         return null;
      }
      const result = await Filesystem.readFile({
         path: this.fileName(),
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
      return result;
   }

   private async check(name: string): Promise<boolean> {
      const dir = await Filesystem.readdir({
         path: '',
         directory: Directory.Data,
      });
      return dir.files.filter((x) => x === name).length > 0;
   }

   setData(value: string, name: string) {
      this.name = name;
      this.datetime = new Date();
      this.save(value);
   }

   private async save(value: string) {
      await Filesystem.writeFile({
         path: this.fileName(),
         data: `${this.name}\n${this.datetime}\n${value}`,
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
   }

   async delete() {
      await Filesystem.deleteFile({
         path: this.fileName(),
         directory: Directory.Data,
      });
      this.empty = true;
   }

   fileName() {
      return `SaveSlot${this.id}.txt`;
   }
}
