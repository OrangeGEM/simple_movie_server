import { createHash } from "crypto";

export function hashPassword(password: string): string {
  return createHash('sha256')
      .update(`${password}${process.env['PASSWORD_HASH_SALT']}`)
      .digest()
      .toString('hex');
}

export function comparePassword(password: string, hashedPassword): boolean {
  return hashPassword(password) === hashedPassword
}