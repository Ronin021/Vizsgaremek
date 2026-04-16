/**
 * Helyi dátum lekérése
 * Magyarország időzónája: CEST 
 * @returns YYYY-MM-DD formátumú dátum
 */
export const getLocalDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Dátum validálása (YYYY-MM-DD formátum)
 */
export const isValidDateFormat = (dateString: string): boolean => {
  if (!dateString) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
