export default class Attribute {
  constructor(name) {
    this.name = name;
    this.value = 10;
    this.checks = [];
  }

  bonus() {
    return Math.floor(this.value / 2) - 5;
  }

  getChecks(type) {
    return this.checks.filter(function(x) {
      return x.type === type;
    });
  }
}
