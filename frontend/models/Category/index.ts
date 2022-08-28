export interface Category {
  id: string;
  name: string;
  article: string;
}

export interface Categories {
  categories: Category[];
  error: boolean;
  message: string;
  success: boolean;
}
