export interface AuthModal {
  email: string;
  password: string;
}

export interface AuthResp {
  accessToken: string;
  error: boolean | string;
  success: boolean;
  message: string;
}
