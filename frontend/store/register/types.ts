export interface RegisterState {
  isLoading: boolean;
  register: Register | RegisterError | null;
  isError: boolean;
}

interface Register {
  accessToken: string;
  error: boolean | string;
  success: boolean;
  message: string;
}

export type RegisterError = Omit<Register, 'accessToken'>
