import CryptoJS from "crypto-js";

export function encrypt(data: string, key: string): string {
    const fileData = CryptoJS.enc.Utf8.parse(data);
    let secSpec = CryptoJS.enc.Utf8.parse(key);
    let ivSpec = CryptoJS.enc.Utf8.parse(key);

    secSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));
    ivSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));

    const encrypted = CryptoJS.AES.encrypt(fileData, secSpec, {iv: ivSpec}).toString();
    return encrypted;
}

export function decrypt(data: string, key: string): string {
    let secSpec = CryptoJS.enc.Utf8.parse(key);
    let ivSpec = CryptoJS.enc.Utf8.parse(key);

    secSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));
    ivSpec = CryptoJS.lib.WordArray.create(secSpec.words.slice(0, 16/4));

    const bytes = CryptoJS.AES.decrypt(data, secSpec, {iv: ivSpec});
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}