import CryptoJS from "crypto-js";

export function encrypt(data: string, key: string): string {
    const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
    return ciphertext;
}

export function decrypt(data: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}