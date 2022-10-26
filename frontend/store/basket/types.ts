export interface BasketPlywood {
  categoryId: number;
  widthPlywood: string;
  coatingDensity: string;
  formats: string;
  id: number;
  name: string;
  price: number;
}

export interface BasketState {
  entities: BasketPlywood[],
}
