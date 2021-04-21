import LZUTF8 from 'lzutf8/build/production/lzutf8';
import Character from './character';

export default class Encoder {
    dict: string[];

    constructor() {
        this.dict = [];
        this.dict.push('"knowledge":');
        this.dict.push(',"type":');
        this.dict.push('"value":');
        this.dict.push(',"checks":');
        this.dict.push('},{');
        this.dict.push('health');
    }

    encode(src: any): string {
        let string = JSON.stringify(src);
        this.dict.forEach((value, index) => {
            string = string.replaceAll(value, String.fromCharCode(index + 1));
        });
        console.log(string.length);
        const encoded = LZUTF8.encodeBase64(LZUTF8.encodeUTF8(string));
        console.log(encoded.length);
        return encoded;
    }

    decode(src: string) {
        let string: any = LZUTF8.decodeUTF8(LZUTF8.decodeBase64(src));
        this.dict.forEach((value, index) => {
            string = string.replaceAll(String.fromCharCode(index + 1), value);
        });
        const data = JSON.parse(string);
        return this.parse(data, new Character());
    }

    parse(data: any, object: any): any {
        if (typeof data !== 'object' || data === null)
            return data;

        Object.keys(object).forEach(key =>
            object[key] = this.parse(data[key], object[key]));
        return object;
    }
}