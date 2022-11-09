import { Category } from '@models/Category'

export interface CalcItem {
  id: string;
  name: string;
  price: number;
}

export interface Photo {
  filename: string;
  path: string;
}

export interface PhotosModal {
    data: Photo[];
    id: string;
    name: string;
    color: string;
}

export interface PlywoodItem {
  article: string;
  available: string;
  category: Category;
  categoryId: number;
  coatingDensity: CalcItem[];
  description: string;
  features: CalcItem[];
  formats: CalcItem[];
  id: string;
  name: string;
  price: number;
  sorts: CalcItem[];
  surfaceTypes: CalcItem[];
  photos: FurniturePhotosModal[];
  position: number,
  color?: string;
  widthPlywood?: string;
  format?: string;
  sort?: string;
  count?: number;
}

export interface PlywoodItemData {
  error: boolean;
  success: boolean;
  message: string;
  product: PlywoodItem;
}

export interface PlywoodModal {
  error: boolean;
  success: boolean;
  message: string;
  products: PlywoodItem[];
}

export interface FurnitureItemModal {
  id: string;
  category: Category;
  categoryId: number;
  position: number,
  features?: FurnitureFeatureItem[];
  photos: FurniturePhotosModal[];
  name: string;
  article: string;
  available: string;
  price?: number;
  description: string;
  width: number;
  height: number;
  depth: number;
  parameters?: FurnitureParamItem[];
}

export interface FurnitureParamItem {
  id: string;
  name: string;
  description: string;
  value: string;
}

export interface FurnitureItemData {
  error: boolean;
  success: boolean;
  message: string;
  product: FurnitureItemModal;
}

export interface FurnitureModal {
  error: boolean;
  success: boolean;
  message: string;
  products: FurnitureItemModal[];
}

export interface FurnitureFeatureItem {
  id: string;
  name: string;
  price: number;
  value?: string;
  description?: string;
}

export interface FurnitureFeatureModal {
  error: boolean;
  success: boolean;
  message: string;
  data: FurnitureFeatureItem[];
}

export interface FurniturePhotosModal {
  photos: Photo[];
  id: string;
  name: string;
  color: string;
}
