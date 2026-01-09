import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const EXPIRATION_TIME = '7d';

interface TokenPayload {
  userId: number;
  email?: string;
  iat?: number;
}

/**
 * JWT token generálása
 * @param userId - A felhasználó ID-ja
 * @param email - A felhasználó email-je (opcionális)
 * @returns Az aláírt token
 */
export const generateToken = (userId: number, email?: string): string => {
  const payload: TokenPayload = {
    userId,
    email,
  };
  
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

/**
 * JWT token ellenőrzése és dekódolása
 * @param token - Az ellenőrizendő token
 * @returns A dekódolt payload vagy null ha hibás
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

/**
 * JWT token dekódolása anélkül, hogy ellenőrizné
 * @param token - Az ellenőrizendő token
 * @returns A dekódolt payload vagy null ha hibás
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
};
