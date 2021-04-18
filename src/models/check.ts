import { CheckTypes } from "./enums/check-types";

export default class Check {
  name: string;
  type: CheckTypes;
  knowledge: number = 0;

  constructor(name: string, type: CheckTypes) {
    this.name = name;
    this.type = type;
  }

  get(proficiency: number, value: number) {
    return value + proficiency * this.knowledge;
  }

  inc() {
    this.knowledge = (this.knowledge + 1) % 3;
  }

  level() {
    if (this.type === CheckTypes.Static)
      return "fas fa-circle";

    switch (this.knowledge) {
      case 0:
        return "far fa-circle";
      case 1:
        return "fas fa-dot-circle";
      case 2:
        return "fas fa-circle";
    }
  }
}
