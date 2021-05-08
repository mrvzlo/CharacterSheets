import Character from "../character";

export default class SaveResult {
   locked: Boolean;
   character: Character;

   constructor(locked: Boolean, character: Character) {
      this.locked = locked;
      this.character = character;
   }
}
