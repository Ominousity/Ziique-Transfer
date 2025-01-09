import forge from "node-forge";

// Function to generate a random IV
function generateIV() {
    return forge.random.getBytesSync(16); // 16 bytes for AES
}

// Function to convert file data to ByteStringBuffer
function convertDataToBuffer(data: string | forge.util.ByteStringBuffer | ArrayBuffer | forge.util.ArrayBufferView) {
    return forge.util.createBuffer(data, 'utf8');
}

export function encrypt(data: string, key: string | forge.util.ByteStringBuffer) {
    const iv = generateIV();
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: iv });
    cipher.update(convertDataToBuffer(data));
    cipher.finish();
    const encrypted = cipher.output;

    // Combine IV and ciphertext
    const ivHex = forge.util.bytesToHex(iv);
    const encryptedHex = forge.util.bytesToHex(encrypted.data);
    console.log("IV (hex):", ivHex);
    console.log("Encrypted Data (hex):", encryptedHex);
    return ivHex + encryptedHex;
}

export function decrypt(data: string, key: string | forge.util.ByteStringBuffer) {
    const ivHex = data.substring(0, 32); // First 32 characters are the IV
    const encryptedHex = data.substring(32); // Remaining characters are the ciphertext

    console.log("Extracted IV (hex):", ivHex);
    console.log("Extracted Encrypted Data (hex):", encryptedHex);

    const iv = forge.util.hexToBytes(ivHex);
    const encryptedBytes = forge.util.hexToBytes(encryptedHex);

    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(encryptedBytes));
    decipher.finish();
    const decrypted = decipher.output;

    const originalData = forge.util.decodeUtf8(decrypted.data);
    console.log("Decrypted Data:", originalData);
    return originalData;
}