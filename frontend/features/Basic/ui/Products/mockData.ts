import plywoodSUUUKKAAA from 'assets/products/plywoood-ska.webp'
import plywood2 from 'assets/slider/slide-8.webp'
import plywood3 from 'assets/slider/slide-9.webp'
import card from 'assets/service/card-1.webp'
import card2 from 'assets/service/card-2.webp'
import card3 from 'assets/service/card-3.webp'
import card4 from 'assets/service/card-4.webp'
import card5 from 'assets/service/card-5.webp'
import card6 from 'assets/service/card-6.webp'
import card7 from 'assets/service/card-7.webp'
import card8 from 'assets/service/card-8.webp'
import card9 from 'assets/service/card-9.webp'
import image1 from 'assets/products/plywood/production1.webp'
import image2 from 'assets/products/plywood/production2.webp'
import image3 from 'assets/products/plywood/production3.webp'

export const plywood = [
  {
    id: 1,
    image: plywoodSUUUKKAAA,
    title: 'plywood',
    description: 'sdfsdf',
    height: 550,
    width: 1240,
  },
  {
    id: 2,
    image: plywood2,
    title: 'sdfsdf',
    description: 'sdfsdf',
    height: 550,
    width: 1240,
  },
  {
    id: 3,
    image: plywood3,
    title: 'sdfsdf',
    description: 'sdfsdf',
    height: 550,
    width: 1240,
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
  Plan = '#plan',
  Options = '#options',
  OneHouseDefault = '#one',
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
    link: ProductLinks.Plan,
    title: 'Варианты планировок',
  },
  {
    link: ProductLinks.House,
    title: 'О Продукте',
  },
  {
    link: ProductLinks.Options,
    title: 'Варианты комплектации',
  },
]

export const houseVariantsLinks = [
  {
    noLink: true,
    link: '#one',
    title: '25 м2',
  },
  {
    noLink: true,
    link: '#two',
    title: '40 м2',
  },
  {
    noLink: true,
    link: '#three',
    title: '60 м2',
  },
  {
    noLink: true,
    link: '#four',
    title: '90 м2',
  },
  {
    noLink: true,
    link: '#five',
    title: '125 м2',
  },
]

export const serviceSlide = [
  {
    image: card,
    number: '01',
    title: 'Фрезерование',
  },
  {
    image: card2,
    number: '02',
    title: 'Сверление отверстий',
  },
  {
    image: card3,
    number: '03',
    title: 'Пропилы любой ширины и&nbsp;глубины',
  },
  {
    image: card4,
    number: '04',
    title: '«Шип-паз» любого профиля',
  },
  {
    image: card5,
    number: '05',
    title: 'Снятие фаски с&nbsp;различным радиусом закругления',
  },
  {
    image: card6,
    number: '06',
    title: 'Распил в&nbsp;нужный формат',
  },
  {
    image: card7,
    number: '07',
    title: 'Нанесение пластика (HPL/CPL покрытие)',
  },
  {
    image: card8,
    number: '08',
    title: 'Покраска материала',
  },
  {
    image: card9,
    number: '09',
    title: 'Разработка готовых решений',
  },
]

export const productsSlider = [
  {
    image: image1,
    number: '01',
  },
  {
    image: image2,
    number: '02',
  },
  {
    image: image3,
    number: '03',
  },
]
