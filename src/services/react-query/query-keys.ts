// constante para mapear todas as chaves de queries

export const queryKeys = {
  CASH_FLOW: {
    GET_USER_SIMULATIONS: 'user-simulations',
    GET_ARREND_TYPES: 'arrend-types',
  },
  HUMAN_RESOURCES: {
    GET_DATES: 'human-resources-hours-dates',
    GET_DEPARTMENTS: 'human-resources-hours-departments',
    GET_EMPLOYEES: 'human-resources-hours-employees',
    GET_RESUME_DATA: 'human-resources-hours-resume-data',
    GET_LAST_UPDATED_AT: 'human-resources-hours-resume-data',
  },
  SENSATTA: {
    GET_COMPANIES: 'companies',
    GET_FREIGHT_COMPANIES: 'freight-companies',
    GET_PRODUCT: 'products',
    GET_PRODUCT_LINES: 'product-lines',
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
    GET_CATTLE_PURCHASE_FREIGHTS_RESUME: 'get-all-resume-cattle-purchase-freights',
    GET_CATTLE_PURCHASE_FREIGHTS_STATUSES: 'get-cattle-purchase-freights-statuses',
    GET_LAST_UPDATED_AT: 'freights-updated-at',
  },
  USERS: {
    FIND_ALL: 'users',
  },
}
