import { CheckTypes } from "./enums/check-types";
import Attribute from "./attribute";
import Check from "./check";
import { compress, decompress } from 'compress-json'
//import LZString from 'lz-string/libs/lz-string.js';

export default class Character {
  name: String;
  level: number;
  inspiration: Boolean;
  speed: number;
  armor: number;
  healthBoneValue: number;
  healthBones: number;
  healthBonesMax: number;
  attributes: Attribute[];

  constructor() {
    this.name = "";
    this.level = 1;
    this.inspiration = false;
    this.attributes = [];
    this.speed = 30;
    this.armor = 10;
    this.healthBoneValue = 8;
    this.healthBones = 1;
    this.healthBonesMax = 1;
    const attributes = ["СИЛ", "ЛОВ", "ТЕЛ", "ИНТ", "МУД", "ХАР"];
    attributes.forEach((type) => this.attributes.push(new Attribute(type)));

    for (let i = 0; i < 6; i++)
      this.attributes[i].checks.push(new Check("Спасбросок", CheckTypes.Saving));

    this.attributes[0].checks.push(new Check("Атлетика", CheckTypes.Skill));
    this.attributes[1].checks.push(new Check("Акробатика", CheckTypes.Skill));
    this.attributes[1].checks.push(new Check("Ловкость рук", CheckTypes.Skill));
    this.attributes[1].checks.push(new Check("Скрытность", CheckTypes.Skill));
    this.attributes[3].checks.push(new Check("Анализ", CheckTypes.Skill));
    this.attributes[3].checks.push(new Check("История", CheckTypes.Skill));
    this.attributes[3].checks.push(new Check("Магия", CheckTypes.Skill));
    this.attributes[3].checks.push(new Check("Природа", CheckTypes.Skill));
    this.attributes[3].checks.push(new Check("Религия", CheckTypes.Skill));
    this.attributes[4].checks.push(new Check("Внимательность", CheckTypes.Skill));
    this.attributes[4].checks.push(new Check("Выживание", CheckTypes.Skill));
    this.attributes[4].checks.push(new Check("Медицина", CheckTypes.Skill));
    this.attributes[4].checks.push(new Check("Проницательность", CheckTypes.Skill));
    this.attributes[4].checks.push(new Check("Уход за животными", CheckTypes.Skill));
    this.attributes[5].checks.push(new Check("Выступление", CheckTypes.Skill));
    this.attributes[5].checks.push(new Check("Запугивание", CheckTypes.Skill));
    this.attributes[5].checks.push(new Check("Обман", CheckTypes.Skill));
    this.attributes[5].checks.push(new Check("Убеждение", CheckTypes.Skill));

    this.attributes[1].checks.push(new Check("Инициатива", CheckTypes.Static));
  }

  proficiency() {
    return Math.floor((this.level - 1) / 4) + 2;
  }

  export() {
    const compressed = compress(this);
    const string = JSON.stringify(compressed);
    return '' //LZString.compressToBase64(string);
  }

  import(encrypted: string) {
    const decoded = ''// LZString.decompressFromBase64(encrypted);
    console.log(decoded);
    const object = JSON.parse(decoded);
    return decompress(object);
  }
}
