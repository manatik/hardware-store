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

export interface UserInfo extends UserData{
  error: boolean;
  message: string;
  success: boolean;
  statusCode: number
}

export interface UserData {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string | null;
  deleted: string | null;
  updatedAt: string | null;
}
