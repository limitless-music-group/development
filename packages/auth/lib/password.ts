import { compare, hash } from 'bcryptjs';

export async function saltAndHashPassword(password: string): Promise<string> {
  return await hash(password, 12);
};

export async function verifyPassword({
  password, 
  hash
}: {
  password: string
  hash: string
}): Promise<boolean> {
  return await compare(password, hash)
}