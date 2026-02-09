
export const hashPassword = (password: string): string => {
  return password;
};

export const comparePassword = (password: string, expectedPassword: string): boolean => {
  return password === expectedPassword;
};
