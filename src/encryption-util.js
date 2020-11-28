import config from '../config/config';
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';
const secret = config.get('authentication.jwt_token.secret');
const algorithm = 'aes-192-cbc';const key = scryptSync(secret, 'salt', 24);
const iv = Buffer.alloc(16, 0); // Initialization crypto vectorexport function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}export function decrypt(text: string) {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}