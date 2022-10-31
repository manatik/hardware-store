export const GLOBAL_PREFIXES = {
  USER: 'user',
  ROLE: 'role',
  AUTH: 'auth',
  CATEGORY: 'category',
  EMAIL: 'email',

  ORDER: 'products/order',
  PLYWOOD: 'products/plywood',
  PLYWOOD_FORMATS: 'products/plywood-format',
  PLYWOOD_SURFACE: 'products/plywood-surface',
  PLYWOOD_SORT: 'products/plywood-sort',
  PLYWOOD_COATING_DENSITY: 'products/plywood-coating-density',
  PLYWOOD_TYPE: 'products/plywood-type',
  PLYWOOD_FEATURE: 'products/plywood-feature',
  PLYWOOD_WIDTH: 'products/plywood-width',
  PLYWOOD_PHOTOS: 'products/plywood-photos',

  FURNITURE: 'products/furniture',
  FURNITURE_FEATURE: 'products/furniture-feature',
  FURNITURE_PARAMETERS: 'products/furniture-parameters',
  FURNITURE_PHOTOS: 'products/furniture-photos',

  HOUSE: 'products/house',
  HOUSE_FEATURE: '',
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH: 'refresh',
  },
  EMAIL: {
    SEND: 'send',
  },
  USER: {
    ALL: 'all',
    INFO: 'info',
    CREATE: '',
    UPDATE: ':id',
    DELETE: ':id',
    ADD_ROLE: 'role-add',
    REMOVE_ROLE: 'role-remove',
  },
  ROLE: {
    CREATE: '',
    ALL: '',
    GET_BY_ID: ':id',
    UPDATE: ':id',
    DELETE: ':id',
  },
  CATEGORY: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    UPDATE: ':id',
  },

  ORDER: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    CREATE: '',
    DELETE: ':id',
  },

  FURNITURE: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    CREATE: '',
    ADD_PHOTOS: 'photos/:id',
    UPDATE: ':id',
    DELETE: ':id',
  },
  FURNITURE_CHARACTERS: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    CREATE: '',
    UPDATE: ':id',
    DELETE: ':id',
  },

  PLYWOOD: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    CREATE: '',
    ADD_PHOTOS: 'photos/:id',
    UPDATE: ':id',
    DELETE: ':id',
  },
  PLYWOOD_CHARACTERS: {
    GET_ALL: '',
    GET_BY_ID: ':id',
    CREATE: '',
    UPDATE: ':id',
    DELETE: ':id',
  },
};
