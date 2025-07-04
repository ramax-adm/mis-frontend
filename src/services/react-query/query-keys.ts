// constante para mapear todas as chaves de queries

export const queryKeys = {
  APPLICATION: {
    WEBPAGES: "app-webpages",
  },
  CASH_FLOW: {
    GET_USER_SIMULATIONS: "user-simulations",
    GET_ARREND_TYPES: "arrend-types",
  },
  PURCHASE: {
    GET_LAST_UPDATED_AT: "purchase-last-updated-at",
    GET_CATTLE_PURCHASE_CATTLE_OWNER: "purchase-cattle-purchase-cattle-owner",
    GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION:
      "purchase-cattle-purchase-cattle-classification",
    GET_CATTLE_PURCHASE_CATTLE_ADVISOR:
      "purchase-cattle-purchase-cattle-advisor",
    GET_CATTLE_PURCHASE_ANALYTICAL_DATA: "purchase-cattle-purchase-analytical",
  },
  HUMAN_RESOURCES: {
    GET_DATES: "human-resources-hours-dates",
    GET_DEPARTMENTS: "human-resources-hours-departments",
    GET_EMPLOYEES: "human-resources-hours-employees",
    GET_RESUME_DATA: "human-resources-hours-resume-data",
    GET_ANALYTICAL_DATA: "human-resources-hours-analytical-data",
    GET_ANALYSES_DATA: "human-resources-hours-analyses-data",
    GET_LAST_UPDATED_AT: "human-resources-hours-last-updated-at",
  },
  SENSATTA: {
    GET_COMPANIES: "companies",
    GET_COMPANY: "company-",
    GET_FREIGHT_COMPANIES: "freight-companies",
    GET_PRODUCT: "products",
    GET_PRODUCT_LINES: "product-lines",
    GET_PRODUCT_CLASSIFICATION_TYPES: "product-classification-types",
  },
  STOCK: {
    GET_ALL: "get-all-stocks",
    GET_ANALYTICAL_ALL: "get-all-analytical-stocks",
    GET_LAST_UPDATED_AT: "stock-updated-at",
  },
  STOCK_BALANCE: {
    GET_ANALYTICAL: "stock-balance-analytical",
    GET_AGGREGATED_ANALYTICAL: "stock-balance-aggregated-analytical",
    GET_LAST_UPDATED_AT: "stock-balance-updated-at",
  },
  UPLOAD: {
    FIND_ALL: "find-all-upload-files",
    FIND_BY_TYPE: "find-by-type-upload-files-",
  },
  FREIGHTS: {
    GET_CATTLE_PURCHASE_FREIGHTS_ANALYTICAL:
      "get-all-analytical-cattle-purchase-freights",
    GET_CATTLE_PURCHASE_FREIGHTS_RESUME:
      "get-all-resume-cattle-purchase-freights",
    GET_CATTLE_PURCHASE_FREIGHTS_STATUSES:
      "get-cattle-purchase-freights-statuses",
    GET_LAST_UPDATED_AT: "freights-updated-at",
  },
  USERS: {
    FIND_ALL: "users",
    FIND_ONE: "user-",
  },
  UTILS: {
    GET_SYNCED_FILES: "synced-files",
    GET_SYNCED_FILE_ENTITIES: "synced-file-entities",
  },
};
