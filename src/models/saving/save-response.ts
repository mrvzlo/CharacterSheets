import Character from '../character';

export default class SaveResponse {
   constructor(public character: Character, public status: boolean) {}
}
