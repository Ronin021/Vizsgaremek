// SQL Helper - ha szükséges egyéb SQL műveletre

export const buildInsertQuery = (table: string, fields: string[], values: any[]): string => {
  const placeholders = values.map(() => '?').join(', ');
  return `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders})`;
};

export const buildUpdateQuery = (table: string, fields: string[], _id: number): string => {
  const updates = fields.map(field => `${field} = ?`).join(', ');
  return `UPDATE ${table} SET ${updates} WHERE id = ?`;
};
