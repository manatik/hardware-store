export interface AuthState {
  isLoading: boolean;
  auth: Auth | null;
  isError: boolean;
}

interface Auth {
  accessToken: string;
  error: boolean | string;
  success: boolean;
  message: string;
}
