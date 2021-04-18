import CheckTypes from "./enums/check-types";
import Attribute from "./attribute";
import Check from "./check";
import { compress, decompress } from 'compress-json'
import LZString  from 'lz-string/libs/lz-string.js';

export default class Character {
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
    var attributes = ["СИЛ", "ЛОВ", "ТЕЛ", "ИНТ", "МУД", "ХАР"];
    attributes.forEach((type) => this.attributes.push(new Attribute(type)));

    var checktype = new CheckTypes();
    for (var i = 0; i < 6; i++)
      this.attributes[i].checks.push(new Check("Спасбросок", checktype.Saving));

    this.attributes[0].checks.push(new Check("Атлетика", checktype.Skill));
    this.attributes[1].checks.push(new Check("Акробатика", checktype.Skill));
    this.attributes[1].checks.push(new Check("Ловкость рук", checktype.Skill));
    this.attributes[1].checks.push(new Check("Скрытность", checktype.Skill));
    this.attributes[3].checks.push(new Check("Анализ", checktype.Skill));
    this.attributes[3].checks.push(new Check("История", checktype.Skill));
    this.attributes[3].checks.push(new Check("Магия", checktype.Skill));
    this.attributes[3].checks.push(new Check("Природа", checktype.Skill));
    this.attributes[3].checks.push(new Check("Религия", checktype.Skill));
    this.attributes[4].checks.push(new Check("Внимательность", checktype.Skill));
    this.attributes[4].checks.push(new Check("Выживание", checktype.Skill));
    this.attributes[4].checks.push(new Check("Медицина", checktype.Skill));
    this.attributes[4].checks.push(new Check("Проницательность", checktype.Skill));
    this.attributes[4].checks.push(new Check("Уход за животными", checktype.Skill));
    this.attributes[5].checks.push(new Check("Выступление", checktype.Skill));
    this.attributes[5].checks.push(new Check("Запугивание", checktype.Skill));
    this.attributes[5].checks.push(new Check("Обман", checktype.Skill));
    this.attributes[5].checks.push(new Check("Убеждение", checktype.Skill));

    this.attributes[1].checks.push(new Check("Инициатива", checktype.Static));
  }

  proficiency() {
    return Math.floor((this.level - 1) / 4) + 2;
  }

  export() {
    var compressed = compress(this);
    var string = JSON.stringify(compressed);
    return LZString.compressToBase64(string);
  }

  import(encrypted) {
    var decoded = LZString.decompressFromBase64(encrypted);
    console.log(decoded);
    var object = JSON.parse(decoded);
    return decompress(object);
  }

  decrypt(obj, src) {
    src = src.slice(1, -1);
    var values = [];
    console.log(src);
  }
}
