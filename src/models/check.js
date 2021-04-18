import CheckTypes from "./enums/check-types";

export default class Check {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.knowledge = 0;
  }

  get(proficiency, value) {
    return value + proficiency * this.knowledge;
  }

  inc() {
    this.knowledge = (this.knowledge + 1) % 3;
  }

  level() {
    if (this.type === new CheckTypes().Static)
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
