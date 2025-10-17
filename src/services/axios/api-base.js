import { StorageKeysEnum } from "@/constants/app/storage";
import { normalizeError, setRequestBearerToken } from "@/utils/api.utils";
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
  BUSINESS_AUDIT: {
    POST_EXPORT_XLSX: `${apiLocal}/api/business-audit/export-xlsx/:type`,
    GET_CONSIDERED_CFOPS: `${apiLocal}/api/business-audit/constants/considered-cfops`,
    GET_CONSIDERED_NF_SITUATIONS: `${apiLocal}/api/business-audit/constants/nf-situations`,

    // overview
    OVERVIEW: {
      GET_BUSINESS_AUDIT_OVERVIEW: `${apiLocal}/api/business-audit/overview`,
    },

    // sales
    SALES: {
      GET_BUSINESS_AUDIT_SALES: `${apiLocal}/api/business-audit/sales`,
      GET_BUSINESS_AUDIT_ORDERS_LINES_DATA: `${apiLocal}/api/business-audit/sales/data/orders-lines`,
      GET_SALES_CLIENTS_FILTERS: `${apiLocal}/api/business-audit/sales/filters/clients`,
      GET_SALES_REPRESENTATIVE_FILTERS: `${apiLocal}/api/business-audit/sales/filters/sales-representatives`,
    },

    // return occurrences
    RETURN_OCCURRENCES: {
      GET_BUSINESS_AUDIT_RETURN_OCCURRENCES: `${apiLocal}/api/business-audit/return-occurrences`,
      GET_RETURN_OCCURRENCES_CAUSES_FILTERS: `${apiLocal}/api/business-audit/return-occurrences/filters/causes`,
      GET_RETURN_OCCURRENCES_CLIENTS_FILTERS: `${apiLocal}/api/business-audit/return-occurrences/filters/clients`,
      GET_RETURN_OCCURRENCES_REPRESENTATIVE_FILTERS: `${apiLocal}/api/business-audit/return-occurrences/filters/sales-representatives`,
    },
  },
  BUSINESS_SUMMARY: {
    GET_OPERATION_FINANCE_SUMMARY: `${apiLocal}/business-summary/operation-finance/summary`,
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

    FREIGHT_COMPANIES: {
      GET_FIND_ALL: `${apiLocal}/api/freights/freight-companies`,
      GET_FIND_ONE: `${apiLocal}/api/freights/freight-companies/:id`,
      GET_FREIGHT_COMPANIES_FILTERS: `${apiLocal}/api/freights/freight-companies/filters/freight-company`,
    },
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
  INTRANET: {
    GET_FIND_DOCUMENTS: `${apiLocal}/api/intranet/document`,
    GET_FIND_ONE_DOCUMENT: `${apiLocal}/api/intranet/document/:id`,
    GET_FIND_DOCUMENTS_VERSIONS: `${apiLocal}/api/intranet/document/versions`,
    GET_FIND_ONE_DOCUMENT_VERSION: `${apiLocal}/api/intranet/document/versions/:id`,
    GET_USER_DOCUMENTS: `${apiLocal}/api/intranet/document/get-user-documents`,
    GET_ACCEPTED_DOCUMENTS: `${apiLocal}/api/intranet/document/get-accepted-documents`,
    GET_PENDING_ACCEPTANCE_DOCUMENTS: `${apiLocal}/api/intranet/document/get-pending-acceptance-documents`,
    POST_ADD_DOCUMENT: `${apiLocal}/api/intranet/document`,
    POST_ADD_DOCUMENT_VERSION: `${apiLocal}/api/intranet/document/version`,
    POST_EXPORT_XLSX: `${apiLocal}/api/intranet/document/export-xlsx`,
    PATCH_UPDATE_DOCUMENT: `${apiLocal}/api/intranet/document/:id`,
    DELETE_DOCUMENT_VERSION: `${apiLocal}/api/intranet/document/version/:id`,
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
  PARAMETER: {
    GET_SALES_DEDUCTIONS_PARAMETERS: `${apiLocal}/api/params/sales-deduction`,
  },
  SALES: {
    INVOICES: {
      GET_LAST_UPDATED_AT: `${apiLocal}/api/sales/invoice/last-update`,
      GET_CFOPS_FILTERS: `${apiLocal}/api/sales/invoice/filters/cfops`,
      GET_CLIENTS_FILTERS: `${apiLocal}/api/sales/invoice/filters/clients`,
      GET_NF_SITUATIONS_FILTERS: `${apiLocal}/api/sales/invoice/filters/nf-situations`,
      GET_ANALYTICAL_INVOICES: `${apiLocal}/api/sales/invoice/analytical`,
      POST_SYNC_INVOICES: `${apiLocal}/api/sales/invoice/sync`,
      POST_EXPORT_XLSX: `${apiLocal}/api/sales/invoice/export-xlsx`,
    },
  },
  STOCK: {
    GET_LAST_UPDATED_AT: `${apiLocal}/api/stock/last-update`,

    GET_ALL: `${apiLocal}/api/stock`,

    GET_STOCK_BY_COMPANY: `${apiLocal}/api/stock`,
    GET_TO_EXPIRES_BY_COMPANY: `${apiLocal}/api/stock/:id/to-expires`,

    // ANALITICO
    GET_ALL_ANALITICAL: `${apiLocal}/api/stock/analytical`,
    POST_EXPORT_XLSX: `${apiLocal}/api/stock/export-xlsx`,

    INCOMING_BATCHES: {
      GET_LAST_UPDATED_AT: `${apiLocal}/api/stock/incoming-batches/last-update`,
      GET_PRODUCT_LINES_FILTERS: `${apiLocal}/api/stock/incoming-batches/filters/product-lines`,
      GET_RESUME_DATA: `${apiLocal}/api/stock/incoming-batches/resume`,
      GET_ANALYTICAL_DATA: `${apiLocal}/api/stock/incoming-batches/analytical`,
      POST_EXPORT_XLSX: `${apiLocal}/api/stock/incoming-batches/export-xlsx`,
    },
    STOCK_BALANCE: {
      GET_LAST_UPDATED_AT: `${apiLocal}/api/stock-balance/last-update`,
      GET_ANALYTICAL_DATA: `${apiLocal}/api/stock-balance/analytical`,
      GET_AGGREGATED_ANALYTICAL_DATA: `${apiLocal}/api/stock-balance/analytical/aggregated`,
      POST_EXPORT_XLSX: `${apiLocal}/api/stock-balance/export-xlsx`,
    },
    INVENTORY: {
      GET_LAST_UPDATED_AT: `${apiLocal}/api/stock/inventory/last-update`,
      GET_RESUME_DATA: `${apiLocal}/api/stock/inventory/resume`,
      GET_ANALYTICAL_DATA: `${apiLocal}/api/stock/inventory/analytical`,

      GET_INVENTORY_FILTERS: `${apiLocal}/api/stock/inventory/filters/inventories`,
    },
  },
  SENSATTA: {
    GET_COMPANIES: `${apiLocal}/api/sensatta/company`,
    GET_FREIGHT_COMPANIES: `${apiLocal}/api/sensatta/freight-companies`,
    GET_MARKETS: `${apiLocal}/api/sensatta/market`,
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
    GET_DEPARTMENTS_FILTERS: `${apiLocal}/api/user/filters/departments`,
    POST_USER: `${apiLocal}/api/user`,
    POST_ADD_USER_APP_WEBPAGE: `${apiLocal}/api/user/add-user-app-webpage`,
    DELETE_USER_APP_WEBPAGE: `${apiLocal}/api/user/user-app-webpage`,
    PATCH_USER: `${apiLocal}/api/user/:id`,

    USER_COMPANIES: {
      POST_ADD_USER_COMPANY: `${apiLocal}/api/user/user-company`,
      GET_FIND_BY_USER: `${apiLocal}/api/user/user-company/by-user`,
      DELETE_USER_COMPANY: `${apiLocal}/api/user/user-company/:id`,
    },

    USER_DOCUMENT_ACCEPTANCE: {
      POST_CONFIRM_DOCUMENT_VERSION_ACCEPTANCE: `${apiLocal}/api/user/user-intranet-document-acceptance`,
    },
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
    GET_UNIT_TYPES: `${apiLocal}/api/utils/unit-types`,
  },
};

export const GetFetch = async (url, params) => {
  try {
    setRequestBearerToken(api);
    return await api.get(url, params);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const GetFetchUnauthenticated = async (url, params) => {
  const data = await api.get(url, params);
  return data;
};

export const PostFetch = async (url, params, ...rest) => {
  try {
    setRequestBearerToken(api);
    return await api.post(url, params, ...rest);
  } catch (err) {
    throw normalizeError(err);
  }
};

export const PutFetch = async (url, params, ...rest) => {
  try {
    setRequestBearerToken(api);
    return await api.put(url, params, ...rest);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const PatchFetch = async (url, params, ...rest) => {
  try {
    setRequestBearerToken(api);
    return await api.patch(url, params, ...rest);
  } catch (error) {
    throw normalizeError(error);
  }
};

export const DeleteFetch = async (url, params) => {
  try {
    setRequestBearerToken(api);
    return await api.delete(url, params);
  } catch (err) {
    throw normalizeError(err);
  }
};
