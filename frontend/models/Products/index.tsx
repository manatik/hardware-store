import { Category } from '@models/Category'

export interface CalcItem {
  id: number;
  name: string;
  price: number;
}

export interface Photo {
  filename: string;
  path: string;
}

export interface PhotosModal {
    photos: Photo[];
    id: number;
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
  id: number;
  name: string;
  price: number;
  sorts: CalcItem[];
  surfaceTypes: CalcItem[];
  photos: PhotosModal[]
}

export interface PlywoodModal {
  error: boolean,
  success: boolean,
  message: string,
  products: PlywoodItem[]
}
