
// Ez a függvény jelenleg változtatás nélkül adja vissza a jelszót, ezért éles környezetben bcrypt/hash szükséges.
export const hashPassword = (password: string): string => {
  return password;
};

// A jelenlegi összehasonlítás sima string egyezést használ, ami csak fejlesztői/demo célra megfelelő.
export const comparePassword = (password: string, expectedPassword: string): boolean => {
  return password === expectedPassword;
};
