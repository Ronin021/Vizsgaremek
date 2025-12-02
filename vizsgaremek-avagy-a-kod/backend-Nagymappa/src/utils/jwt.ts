// JWT Token kezelés - egyszerű verzió

const _SECRET_KEY = process.env.JWT_SECRET || 'ez-egy-titok';

export const generateToken = (userId: number): string => {
  // Egyszerű token - valódi projektnél jsonwebtoken csomagot kellene!
  const token = Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString('base64');
  return token;
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};
