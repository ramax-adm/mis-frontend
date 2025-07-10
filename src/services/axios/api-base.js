import api from "./api";

const apiLocal = "";

export const urls = {
  APPLICATION: {
    GET_WEBPAGES: `${apiLocal}/api/application/webpages`,
  },
  AUTH: {
    DO_LOGIN: `${apiLocal}/api/auth/login`,
    POST_FORGOT_PASSWORD: `${apiLocal}/api/user/forgot-password`,
    POST_RESET_PASSWORD: `${apiLocal}/api/user/change-password`,
    POST_CHECK_TOKEN: `${apiLocal}/api/user/check-password-token`,
  },
  CASH_FLOW: {
    GET_USER_SIMULATIONS: `${apiLocal}/api/cash-flow`,
    GET_ARREND_TYPES: `${apiLocal}/api/cash-flow/arrend-types`,
    POST_SIMULATE_CASH_FLOW: `${apiLocal}/api/cash-flow/simulate`,
    POST_SAVE_USER_SIMULATION: `${apiLocal}/api/cash-flow`,
    DELETE_USER_SIMULATION: `${apiLocal}/api/cash-flow`,
    DELETE_MANY_USER_SIMULATIONS: `${apiLocal}/api/cash-flow`,
    EXPORT_XLSX: `${apiLocal}/api/cash-flow/export-xlsx`,
  },
  CASH_FLOW_CHAMPION_CATTLE: {
    POST_SIMULATE_CASH_FLOW_CHAMPION_CATTLE: `${apiLocal}/api/cash-flow/simulate/champion-cattle`,
    EXPORT_XLSX: `${apiLocal}/api/cash-flow/export-xlsx/champion-cattle`,
  },
  FREIGHTS: {
    GET_LAST_UPDATED_AT: `${apiLocal}/api/freights/last-update`,
    GET_ANALYTICAL_CATTLE_PURCHASE_FREIGHTS: `${apiLocal}/api/freights/cattle-purchase-freights/analytical`,
    GET_RESUME_CATTLE_PURCHASE_FREIGHTS: `${apiLocal}/api/freights/cattle-purchase-freights/resume`,
    GET_CATTLE_PURCHASE_FREIGHTS_STATUSES: `${apiLocal}/api/freights/cattle-purchase-freights/statuses`,
    POST_EXPORT_XLSX: `${apiLocal}/api/freights/cattle-purchase-freights/export-xlsx`,
  },
  HUMAN_RESOURCES: {
    GET_DATES: `${apiLocal}/api/human-resources-hours/dates`,
    GET_DEPARTMENTS: `${apiLocal}/api/human-resources-hours/departments`,
    GET_EMPLOYEES: `${apiLocal}/api/human-resources-hours/employees`,
    GET_RESUME_DATA: `${apiLocal}/api/human-resources-hours/resume`,
    GET_ANALYTICAL_DATA: `${apiLocal}/api/human-resources-hours/analytical`,
    GET_ANALYSES_DATA: `${apiLocal}/api/human-resources-hours/analyses`,
    GET_LAST_UPDATED_AT: `${apiLocal}/api/human-resources-hours/last-update`,
    POST_EXPORT_XLSX: `${apiLocal}/api/human-resources-hours/export-xlsx`,
  },
  PURCHASE: {
    GET_LAST_UPDATED_AT: `${apiLocal}/api/purchase/last-update`,
    GET_CATTLE_PURCHASE_CATTLE_OWNER: `${apiLocal}/api/purchase/cattle-purchase/cattle-owner`,
    GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION: `${apiLocal}/api/purchase/cattle-purchase/cattle-classification`,
    GET_CATTLE_PURCHASE_CATTLE_ADVISOR: `${apiLocal}/api/purchase/cattle-purchase/cattle-advisor`,
    GET_CATTLE_PURCHASE_RESUMED_DATA: `${apiLocal}/api/purchase/cattle-purchase/resumed`,
    GET_CATTLE_PURCHASE_ANALYTICAL_DATA: `${apiLocal}/api/purchase/cattle-purchase/analytical`,
    GET_CATTLE_PURCHASE_AGGREGATED_ANALYTICAL_DATA: `${apiLocal}/api/purchase/cattle-purchase/analytical/aggregated`,
    POST_EXPORT_XLSX: `${apiLocal}/api/purchase/cattle-purchase/export-xlsx`,
  },
  STOCK: {
    GET_ALL: `${apiLocal}/api/stock`,
    GET_LAST_UPDATED_AT: `${apiLocal}/api/stock/last-update`,
    GET_STOCK_BY_COMPANY: `${apiLocal}/api/stock`,
    GET_TO_EXPIRES_BY_COMPANY: `${apiLocal}/api/stock/:id/to-expires`,

    // ANALITICO
    GET_ALL_ANALITICAL: `${apiLocal}/api/stock/analytical`,
    POST_EXPORT_XLSX: `${apiLocal}/api/stock/export-xlsx`,
  },
  STOCK_BALANCE: {
    GET_LAST_UPDATED_AT: `${apiLocal}/api/stock-balance/last-update`,
    GET_ANALYTICAL_DATA: `${apiLocal}/api/stock-balance/analytical`,
    GET_AGGREGATED_ANALYTICAL_DATA: `${apiLocal}/api/stock-balance/analytical/aggregated`,
    POST_EXPORT_XLSX: `${apiLocal}/api/stock-balance/export-xlsx`,
  },
  SENSATTA: {
    GET_COMPANIES: `${apiLocal}/api/sensatta/company`,
    GET_FREIGHT_COMPANIES: `${apiLocal}/api/sensatta/freight-companies`,
    GET_PRODUCTS: `${apiLocal}/api/sensatta/product`,
    GET_PRODUCTS_LINES: `${apiLocal}/api/sensatta/product-line`,
    GET_PRODUCT_CLASSIFICATION_TYPES: `${apiLocal}/api/sensatta/product/classification-types`,
    POST_SYNC_STOCK: `${apiLocal}/api/sensatta/stock/sync`,
    POST_SYNC_STOCK_BALANCE: `${apiLocal}/api/sensatta/stock-balance/sync`,
    POST_SYNC_FREIGHTS: `${apiLocal}/api/sensatta/freights/sync`,
    POST_SYNC_PURCHASE: `${apiLocal}/api/sensatta/purchase/sync`,
  },
  USER: {
    GET_USERS: `${apiLocal}/api/user`,
    GET_USER: `${apiLocal}/api/user`,
    GET_PROFILE: `${apiLocal}/api/user/profile`,
    POST_USER: `${apiLocal}/api/user`,
    POST_ADD_USER_COMPANY: `${apiLocal}/api/user/add-user-company`,
    POST_ADD_USER_APP_WEBPAGE: `${apiLocal}/api/user/add-user-app-webpage`,
    DELETE_USER_APP_WEBPAGE: `${apiLocal}/api/user/user-app-webpage`,
    DELETE_USER_COMPANY: `${apiLocal}/api/user/user-company`,
    PATCH_USER: `${apiLocal}/api/user/:id`,
  },
  UPLOAD: {
    FIND_ALL: `${apiLocal}/api/upload`,
    FIND_BY_NAME: `${apiLocal}/api/upload`,
    POST_UPLOAD: `${apiLocal}/api/upload`,
  },
  UTILS: {
    GET_UFS: `${apiLocal}/api/utils/ufs`,
    GET_CITIES_BY_UF:
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{{uf}}/municipios?orderBy=nome",
    GET_SYNCED_FILES: `${apiLocal}/api/utils/synced-files`,
    GET_SYNCED_FILE_SIGNED_URL: `${apiLocal}/api/utils/synced-files/:id/signed-url`,
    GET_SYNCED_FILE_ENTITIESL: `${apiLocal}/api/utils/synced-files/entity`,
  },
};

export const GetFetch = async (url, params) => {
  const JWT = localStorage.getItem("token");
  api.defaults.headers.authorization = `Bearer ${JWT}`;
  const data = await api.get(url, params);
  return data;
};

export const GetFetchUnauthenticated = async (url, params) => {
  const data = await api.get(url, params);
  return data;
};

export const PostFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem("token");
  api.defaults.headers.authorization = `Bearer ${JWT}`;

  const data = await api.post(url, params, ...rest);
  return data;
};

export const PutFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem("token");
  api.defaults.headers.authorization = `Bearer ${JWT}`;

  const data = await api.put(url, params, ...rest);
  return data;
};

export const PatchFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem("token");
  api.defaults.headers.authorization = `Bearer ${JWT}`;

  const data = await api.patch(url, params, ...rest);
  return data;
};

export const DeleteFetch = async (url, params) => {
  const JWT = localStorage.getItem("token");
  api.defaults.headers.authorization = `Bearer ${JWT}`;

  const data = await api.delete(url, params);
  return data;
};
