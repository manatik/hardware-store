import { LinkData, LinkTarget } from '@utils/link'

export const adminLinks = [
  LinkData('Главная', '/', LinkTarget.self),
  // LinkData('Категории', '/admin-control/categories', LinkTarget.self),
  LinkData('Продукция', '/admin-control/products', LinkTarget.self),
  LinkData('Хар. товаров', '/admin-control/calc', LinkTarget.self),
  LinkData('Заказы', '/admin-control/orders', LinkTarget.self),
  LinkData('Пользователи', '/admin-control/users', LinkTarget.self),
]
