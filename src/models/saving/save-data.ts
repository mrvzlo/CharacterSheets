import { Filesystem, Directory, Encoding, ReadFileResult } from "@capacitor/filesystem";

export default class SaveData {
   id: number;
   name: string = "";
   datetime: Date = new Date();

   constructor(id: number) {
      this.id = id;
      this.getData()
         .then((res: string) => {
            const splitted = res.split("\n");
            this.name = splitted[0];
            this.datetime = new Date(splitted[1]);
         })
         .catch(() => {});
   }

   getEncoded = async () => {
      const result = await this.getData();
      const splitted = result.split("\n");
      return !splitted ? null : splitted[2];
   };

   getData = async () => {
      const result = await Filesystem.readFile({
         path: this.fileName(),
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
      return result.data;
   };

   setData(value: string, name: string) {
      this.name = name;
      this.datetime = new Date();
      this.saveData(value);
   }

   saveData = async (value: string) => {
      await Filesystem.writeFile({
         path: this.fileName(),
         data: `${this.name}\n${this.datetime}\n${value}`,
         directory: Directory.Data,
         encoding: Encoding.UTF8,
      });
   };

   fileName() {
      return `SaveSlot${this.id}.txt`;
   }
}
