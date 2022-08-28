export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Users {
  users: User[];
  error: boolean;
  message: string;
  success: boolean;
}
