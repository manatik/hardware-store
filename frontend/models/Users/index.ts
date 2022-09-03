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

export interface UserInfo {
  error: boolean;
  message: string;
  success: boolean;
  user: {
    id: number;
    email: string;
    password: string;
    createdAt: string | null;
    deleted: string | null;
    updatedAt: string | null;
  };
}
