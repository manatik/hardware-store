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
    photos: Photo[];
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
  photos: PhotosModal[];
  currentColor?: string;
  widthPlywood?: string;
  format?: string;
  sort?: string;
  count?: number;
}

export interface PlywoodModal {
  error: boolean;
  success: boolean;
  message: string;
  products: PlywoodItem[];
}

export interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  value?: string;
  description?: string;
}

export interface FurnitureModal {
  error: boolean;
  success: boolean;
  message: string;
  products: any;
}

export interface FurnitureFeatureModal {
  error: boolean;
  success: boolean;
  message: string;
  data: FurnitureItem[];
}

export type FurniturePhotosModal = Omit<PhotosModal, 'color'>
