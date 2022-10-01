import plywood1 from 'assets/slider/slide-1.png'
import plywood2 from 'assets/slider/slide-2.png'
import plywood3 from 'assets/slider/slide-3.png'

export const plywood = [
  {
    id: 1,
    image: plywood1,
    title: 'sdfsdf',
    description: 'sdfsdf',
  },
  {
    id: 2,
    image: plywood2,
    title: 'sdfsdf',
    description: 'sdfsdf',
  },
  {
    id: 3,
    image: plywood3,
    title: 'sdfsdf',
    description: 'sdfsdf',
  },
]

export enum ProductLinks {
  Plywood = '#plywood',
  Range = '#range',
  Service = '#service',
  Calculator = '#calculator',
  Production = '#production',
  Furniture = '#furniture',
  CabinetFurniture = '#cabinet',
  DesignerFurniture = '#designer',
  Delivery = '#delivery',
  House = '#house',
  Options = '#options',
}

export const plywoodLinks = [
  {
    link: ProductLinks.Plywood,
    title: 'О фанере',
  },
  {
    link: ProductLinks.Range,
    title: 'Ассортимент',
  },
  {
    link: ProductLinks.Calculator,
    title: 'Калькулятор',
  },
  {
    link: ProductLinks.Service,
    title: 'Сервис',
  },
  {
    link: ProductLinks.Production,
    title: 'Производство',
  },
]

export const furnitureLinks = [
  {
    link: ProductLinks.Furniture,
    title: 'О мебели',
  },
  {
    link: ProductLinks.CabinetFurniture,
    title: 'Корпусная мебель',
  },
  {
    link: ProductLinks.DesignerFurniture,
    title: 'Дизайнерская мебель',
  },
  {
    link: ProductLinks.Delivery,
    title: 'Доставка',
  },
]

export const houseLinks = [
  {
    link: ProductLinks.House,
    title: 'О Продукте',
  },
  {
    link: ProductLinks.Options,
    title: 'Корпусная мебель',
  },
]
