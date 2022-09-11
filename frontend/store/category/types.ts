import { Category } from '@models/Category'

export interface CategoriesState {
  isLoading: boolean;
  isError: boolean;
  items: Category[] | null;
}
