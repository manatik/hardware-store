export interface OrderModal {
  email: string;
  phone: string;
  fio: string;
  price?: number;
  furnitures?: number[];
  houses?: number[];
  plywoods?: number[];
}

export interface EmailProductModal {
  name: string;
  price: number;
  count: number;
  color: string;
  format: string;
  widthPlywood: string;
  sorts: string;
}

export interface EmailModal {
  products: EmailProductModal[];
  fio: string;
  phone: string;
  email: string;
  message: string;
}
