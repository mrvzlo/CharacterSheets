import { Storage } from "@capacitor/storage";

export default class SaveData {
   value: string = "";
   name: string = "";
   datetime: Date = new Date();

   constructor(id: number) {
      this.getName("value" + id).then((res: any) => {
         this.value = res;
      });
      this.getName("name" + id).then((res: any) => {
         this.name = res;
      });
      this.getName("datetime" + id).then((res: any) => {
         this.datetime = res;
      });
   }

   getName = async (key: string) => {
      await Storage.get({ key: key });
   };

   setData(value: string, name: string, id: number) {
      this.value = value;
      this.name = name;
      this.datetime = new Date();
      this.setName("value" + id, this.value);
      this.setName("name" + id, this.name);
      this.setName("datetime" + id, this.datetime);
   }

   setName = async (key: string, value: any) => {
      await Storage.set({
         key: key,
         value: value,
      });
   };
}
