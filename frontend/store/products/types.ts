import { FurnitureItem, Photo, PlywoodItem } from '@models/Products'

export interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  plywood: PlywoodItem[] | null;
  furniture: FurnitureItem[] | null;
  furnitureFeature: FurnitureItem[] | null;
  furniturePhotos: Photo[] | null;
}
