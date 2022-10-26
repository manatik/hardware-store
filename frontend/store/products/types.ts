import { PlywoodItem } from '@models/Products'

export interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  plywood: PlywoodItem[] | null;
  house: any;
}
