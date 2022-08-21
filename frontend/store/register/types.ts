export interface RegisterState {
  isLoading: boolean;
  register: Register | null;
  registerError: any;
  isError: boolean;
}

interface Register {
  accessToken: string;
  error: boolean | string;
  success: boolean;
}
