import {
  FurnitureFeatureItem, FurnitureItemModal, Photo, PlywoodItem,
} from '@models/Products'

export interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  plywood: PlywoodItem[] | null;
  furniture: any | null;
  furnitureFeature: FurnitureFeatureItem[] | null;
  furnitureParams: FurnitureFeatureItem[] | null;
  furniturePhotos: Photo[] | null;
  plywoodItem: PlywoodItem | null;
  furnitureItem: FurnitureItemModal | null;
}
