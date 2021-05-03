import { CheckType } from "../data-layer/checks/check-type";

export default class Check {
   type: CheckType;
   knowledge: number = 0;

   constructor(type: CheckType) {
      this.type = type;
   }

   get(proficiency: number, value: number) {
      return value + proficiency * this.knowledge;
   }

   inc() {
      this.knowledge = (this.knowledge + 1) % 3;
   }

   get level(): string {
      switch (this.knowledge) {
         case 0:
            return "far fa-circle";
         case 1:
            return "fas fa-dot-circle";
         case 2:
            return "fas fa-circle";
      }

      return "";
   }

   get name(): string {
      switch (this.type) {
         case CheckType.Saving:
            return "Спасбросок";
         case CheckType.Acrobatics:
            return "Акробатика";
         case CheckType.AnimalHandling:
            return "Уход за животными";
         case CheckType.Arcana:
            return "Магия";
         case CheckType.Athletics:
            return "Атлетика";
         case CheckType.Deception:
            return "Обман";
         case CheckType.History:
            return "История";
         case CheckType.Insight:
            return "Проницательность";
         case CheckType.Intimidation:
            return "Запугивание";
         case CheckType.Investigation:
            return "Анализ";
         case CheckType.Medicine:
            return "Медицина";
         case CheckType.Nature:
            return "Природа";
         case CheckType.Perception:
            return "Внимательность";
         case CheckType.Performance:
            return "Выступление";
         case CheckType.Persuasion:
            return "Убеждение";
         case CheckType.SleightOfHand:
            return "Ловкость рук";
         case CheckType.Stealth:
            return "Скрытность";
         case CheckType.Survival:
            return "Выживание";
         case CheckType.Religion:
            return "Религия";
      }

      return "";
   }
}
