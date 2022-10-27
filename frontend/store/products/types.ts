import { FurnitureFeatureItem, Photo, PlywoodItem } from '@models/Products'

export interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  plywood: PlywoodItem[] | null;
  furniture: any | null;
  furnitureFeature: FurnitureFeatureItem[] | null;
  furniturePhotos: Photo[] | null;
}
