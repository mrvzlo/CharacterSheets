import Character from '../character';

export default class SaveResponse {
   character: Character;
   status: boolean;

   constructor(character: Character, status: boolean) {
      this.character = character;
      this.status = status;
   }
}
