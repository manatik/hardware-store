import { Category } from '@models/Category'

export interface CalcItem {
  id: number;
  name: string;
  price: number;
}

export interface Photo {
  color: string;
  filename: string;
  path: string;
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
  photos: Photo[]
}

export interface PlywoodModal {
  error: boolean,
  success: boolean,
  message: string,
  products: PlywoodItem[]
}
