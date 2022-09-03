import { UserData } from '@models/Users'

export interface AppState {
  globalError: any;
  userInfo: UserData | null;
  isLoading: boolean;
  isError: boolean;
}
