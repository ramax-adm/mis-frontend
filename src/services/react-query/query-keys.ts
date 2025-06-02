// constante para mapear todas as chaves de queries

export const queryKeys = {
  CASH_FLOW: {
    GET_USER_SIMULATIONS: 'user-simulations',
    GET_ARREND_TYPES: 'arrend-types',
  },
  SENSATTA: {
    GET_COMPANIES: `companies`,
    GET_PRODUCT: `products`,
    GET_PRODUCT_LINES: `product-lines`,
    GET_PRODUCT_CLASSIFICATION_TYPES: 'product-classification-types',
  },
  STOCK: {
    GET_ALL: 'get-all-stocks',
    GET_ANALYTICAL_ALL: 'get-all-analytical-stocks',
    GET_LAST_UPDATED_AT: 'stock-updated-at',
  },
  UPLOAD: {
    FIND_ALL: 'find-all-upload-files',
    FIND_BY_TYPE: 'find-by-type-upload-files-',
  },
  FREIGHTS: {
    GET_CATTLE_PURCHASE_FREIGHTS_ANALYTICAL: 'get-all-analytical-cattle-purchase-freights',
    GET_LAST_UPDATED_AT: 'freights-updated-at',
  },
  USERS: {
    FIND_ALL: 'users',
  },
}
