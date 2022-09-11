import * as Yup from 'yup'

export const PlywoodSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Введите название'),
  article: Yup.string()
    .trim()
    .required('Введите артикул'),
  price: Yup.string()
    .trim()
    .required('Укажите цену'),
  width: Yup.string()
    .trim()
    .required('Укажите толщину'),
  class: Yup.string()
    .trim()
    .required('Укажите класс эмиссии'),
  densityPlywood: Yup.string()
    .trim()
    .required('Укажите плотность фанеры'),
  glue: Yup.string()
    .trim()
    .required('Укажите категорию клея'),
  membraneType: Yup.string()
    .trim()
    .required('Укажите тип пленки'),
  densityMembrane: Yup.string()
    .trim()
    .required('Укажите плотность пленки'),
  guaranteePeriod: Yup.string()
    .trim()
    .required('Укажите гарантийный срок'),
  humidity: Yup.string()
    .trim()
    .required('Укажите влажность фанеры'),
  wearResistance: Yup.string()
    .trim()
    .required('Укажите износостойкость'),
})
