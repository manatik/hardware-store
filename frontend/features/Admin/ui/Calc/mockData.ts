interface Option {
  id: number,
  name: string
}

export enum FeaturesEnum {
  COATING_DENSITY,
  FORMATS,
  SORT,
  WIDTH_PLYWOOD,
  TYPE,
  PHOTOS_PLYWOOD
}

export enum FurnitureEnum {
  PRICE,
  PHOTOS_FURNITURE,
  PARAMS_FURNITURE,
}

export enum ProductsEnum {
  PLYWOOD,
  FURNITURE
}

export const features: Option[] = [
  {
    name: 'Плотность покрытия',
    id: FeaturesEnum.COATING_DENSITY,
  },
  {
    name: 'Формат листа',
    id: FeaturesEnum.FORMATS,
  },
  {
    name: 'Сорт',
    id: FeaturesEnum.SORT,
  },
  {
    name: 'Толщина листа',
    id: FeaturesEnum.WIDTH_PLYWOOD,
  },
  {
    name: 'Вид фанеры',
    id: FeaturesEnum.TYPE,
  },
  {
    name: 'Фото продукции',
    id: FeaturesEnum.PHOTOS_PLYWOOD,
  },
]

export const furniture: Option[] = [
  {
    name: 'Цена',
    id: FurnitureEnum.PRICE,
  },
  {
    name: 'Фото товара',
    id: FurnitureEnum.PHOTOS_FURNITURE,
  },
  {
    name: 'Доп. значение',
    id: FurnitureEnum.PARAMS_FURNITURE,
  },
]

export const products: Option[] = [
  {
    name: 'Фанера',
    id: ProductsEnum.PLYWOOD,
  },
  {
    name: 'Мебель',
    id: ProductsEnum.FURNITURE,
  },
]
