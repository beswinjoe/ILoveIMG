/**
 * Cryptography Utilities for End-to-End Encrypted File Transfer
 * Uses the Web Crypto API for zero-knowledge client-side encryption.
 */

// Generate a random 256-bit AES-GCM key for encrypting the file
export async function generateFileKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // Extractable so we can export it to Base64
    ["encrypt", "decrypt"]
  );
}

// Export CryptoKey to Base64 string
export async function exportKeyToBase64(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  return bufferToBase64(exported);
}

// Import Base64 string to CryptoKey
export async function importKeyFromBase64(base64: string): Promise<CryptoKey> {
  const buffer = base64ToBuffer(base64);
  return await window.crypto.subtle.importKey(
    "raw",
    buffer,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt a file buffer
export async function encryptFile(buffer: ArrayBuffer, key: CryptoKey): Promise<{ encrypted: ArrayBuffer, iv: Uint8Array }> {
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    buffer
  );
  return { encrypted, iv };
}

// Decrypt a file buffer
export async function decryptFile(encryptedBuffer: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
  return await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encryptedBuffer
  );
}

// ------------------------------------------------------------------
// PASSWORD PROTECTION UTILS (KEK - Key Encryption Key)
// ------------------------------------------------------------------

// Derive a KEK from a password using PBKDF2
export async function deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt the FileKey using the KEK
export async function encryptFileKeyWithKEK(fileKeyBase64: string, KEK: CryptoKey): Promise<{ encryptedKeyBase64: string, keyIvBase64: string }> {
  const enc = new TextEncoder();
  const encodedKey = enc.encode(fileKeyBase64);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    KEK,
    encodedKey
  );
  
  return {
    encryptedKeyBase64: bufferToBase64(encrypted),
    keyIvBase64: bufferToBase64(iv)
  };
}

// Decrypt the FileKey using the KEK
export async function decryptFileKeyWithKEK(encryptedKeyBase64: string, keyIvBase64: string, KEK: CryptoKey): Promise<string> {
  const encryptedBuffer = base64ToBuffer(encryptedKeyBase64);
  const iv = base64ToBuffer(keyIvBase64);
  
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    KEK,
    encryptedBuffer
  );
  
  const dec = new TextDecoder();
  return dec.decode(decrypted);
}

// Compute SHA-256 hash of password for initial backend validation (non-cryptographic KEK check)
export async function hashPasswordForBackend(password: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', enc.encode(password));
  return bufferToHex(hashBuffer);
}

// ------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------

export function bufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToBuffer(base64: string): ArrayBuffer {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function bufferToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
