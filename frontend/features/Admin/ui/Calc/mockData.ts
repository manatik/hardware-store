interface Option {
  id: string,
  name: string
}

export const features: Option[] = [
  {
    name: 'Плотность покрытия',
    id: '1',
  },
  {
    name: 'Формат листа',
    id: '2',
  },
  {
    name: 'Сорт',
    id: '3',
  },
  {
    name: 'Толщина листа',
    id: '4',
  },
  {
    name: 'Вид фанеры',
    id: '5',
  },
  {
    name: 'Фото продукции',
    id: '6',
  },
]

export const furniture: Option[] = [
  {
    name: 'Цена',
    id: '1',
  },
  {
    name: 'Фото товара',
    id: '2',
  },
]

export const products: Option[] = [
  {
    name: 'Фанера',
    id: '1',
  },
  {
    name: 'Мебель',
    id: '2',
  },
]
