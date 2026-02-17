import Cryptr from 'cryptr';

let cryptr: Cryptr | null = null;

const getCryptr = () => {
  if (!cryptr) {
    cryptr = new Cryptr(process.env.ENCRYPTION_KEY!);
  }
  return cryptr;
};

export const encrypt = (text: string) => getCryptr().encrypt(text);
export const decrypt = (hash: string) => getCryptr().decrypt(hash);