export interface User {
  username: string;
  role: Role;
  token: string;
}

export type Role = 'ADMIN' | 'KITCHEN' | 'STAFF';
