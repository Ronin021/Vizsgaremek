// User Model
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  // is_admin indicates if the user is an administrator (can be used for role-based access)
  is_admin?: boolean;
}
