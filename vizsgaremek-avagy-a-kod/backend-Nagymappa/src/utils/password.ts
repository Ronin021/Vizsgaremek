// Password hash - egyszerű verzió
// Éles kódban bcrypt-et kellene használni!

export const hashPassword = (password: string): string => {
  // Ez csak egy dummy, valódi projektnél bcrypt vagy argon2!
  return Buffer.from(password).toString('base64');
};

export const comparePassword = (password: string, hash: string): boolean => {
  const hashed = Buffer.from(password).toString('base64');
  return hashed === hash;
};
