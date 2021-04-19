import LZUTF8 from 'lzutf8/build/production/lzutf8';
import Character from './character';

export default class Encoder {
    encode(src: any): string {
        const string = JSON.stringify(src);
        return LZUTF8.encodeBase64(LZUTF8.encodeUTF8(string));
    }

    decode(src: string) {
        const string: any = LZUTF8.decodeUTF8(LZUTF8.decodeBase64(src));
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