import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Jelszó hashelése bcryptjs-sel
 * @param password - A kódolandó jelszó
 * @returns A hash-elt jelszó
 */
export const hashPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(SALT_ROUNDS);
  return bcryptjs.hashSync(password, salt);
};

/**
 * Jelszó összehasonlítása a hash-elt verzióval
 * @param password - Az eredeti jelszó
 * @param hash - A hash-elt jelszó
 * @returns true ha egyezik, false ha nem
 */
export const comparePassword = (password: string, hash: string): boolean => {
  return bcryptjs.compareSync(password, hash);
};
