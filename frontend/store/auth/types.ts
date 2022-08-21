export interface AuthState {
  isLoading: boolean;
  auth: Auth | null;
  authError: any;
  isError: boolean;
}

interface Auth {
  accessToken: string;
  error: boolean | string;
  success: boolean;
}
