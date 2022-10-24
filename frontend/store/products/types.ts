import { Plywood } from '@models/Products'

export interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  plywood: Plywood[] | null;
  house: any;
}
