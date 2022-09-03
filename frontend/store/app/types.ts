import { UserData } from '@models/Users'

export interface AppState {
  globalError: any;
  userInfo: UserData;
  isLoading: boolean;
  isError: boolean;
}
