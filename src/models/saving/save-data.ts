export default class SaveData {
   value: string;
   name: string;
   datetime: Date;

   constructor(id: number) {
      switch (id) {
         case 1:
            this.value = localStorage.save1;
            this.name = localStorage.save1Name;
            this.datetime = localStorage.save1Date;
            return;
         case 2:
            this.value = localStorage.save2;
            this.name = localStorage.save2Name;
            this.datetime = localStorage.save2Date;
            return;
         case 3:
            this.value = localStorage.save3;
            this.name = localStorage.save3Name;
            this.datetime = localStorage.save3Date;
            return;
         default:
            this.value = localStorage.autoSave;
            this.name = localStorage.autoSaveName;
            this.datetime = localStorage.autoSaveDate;
            return;
      }
   }

   setData(value: string, name: string, id: number) {
      this.value = value;
      this.name = name;
      this.datetime = new Date();
      switch (id) {
         case 1:
            localStorage.save1 = this.value;
            localStorage.save1Name = this.name;
            localStorage.save1Date = this.datetime;
            return;
         case 2:
            localStorage.save2 = this.value;
            localStorage.save2Name = this.name;
            localStorage.save2Date = this.datetime;
            return;
         case 3:
            localStorage.save3 = this.value;
            localStorage.save3Name = this.name;
            localStorage.save3Date = this.datetime;
            return;
         default:
            localStorage.autoSave = this.value;
            localStorage.autoSaveName = this.name;
            localStorage.autoSaveDate = this.datetime;
            return;
      }
   }
}
