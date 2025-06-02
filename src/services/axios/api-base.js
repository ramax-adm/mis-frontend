import api from './api'

const apiLocal = ''

export const urls = {
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
    GET_ANALYTICAL_CATTLE_PURCHASE_FREIGHTS: `${apiLocal}/api/freights/cattle-purchase-freights/analytical`,
    GET_LAST_UPDATED_AT: `${apiLocal}/api/freights/last-update`,
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
  SENSATTA: {
    GET_COMPANIES: `${apiLocal}/api/sensatta/company`,
    GET_PRODUCTS: `${apiLocal}/api/sensatta/product`,
    GET_PRODUCTS_LINES: `${apiLocal}/api/sensatta/product-line`,
    GET_PRODUCT_CLASSIFICATION_TYPES: `${apiLocal}/api/sensatta/product/classification-types`,
    POST_SYNC_STOCK: `${apiLocal}/api/sensatta/stock/sync`,
    POST_SYNC_FREIGHTS: `${apiLocal}/api/sensatta/freights/sync`,
  },
  USER: {
    GET_USERS: `${apiLocal}/api/user`,
    GET_PROFILE: `${apiLocal}/api/user/profile`,
    POST_USER: `${apiLocal}/api/user`,
    PATCH_USER: `${apiLocal}/api/user/:id`,
  },
  UPLOAD: {
    FIND_ALL: `${apiLocal}/api/upload`,
    FIND_BY_NAME: `${apiLocal}/api/upload`,
  },
  UTILS: {
    GET_UFS: `${apiLocal}/api/utils/ufs`,
    GET_CITIES_BY_UF:
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{{uf}}/municipios?orderBy=nome',
  },
}

export const GetFetch = async (url, params) => {
  const JWT = localStorage.getItem('token')
  api.defaults.headers.authorization = `Bearer ${JWT}`
  const data = await api.get(url, params)
  return data
}

export const GetFetchUnauthenticated = async (url, params) => {
  const data = await api.get(url, params)
  return data
}

export const PostFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem('token')
  api.defaults.headers.authorization = `Bearer ${JWT}`

  const data = await api.post(url, params, ...rest)
  return data
}

export const PutFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem('token')
  api.defaults.headers.authorization = `Bearer ${JWT}`

  const data = await api.put(url, params, ...rest)
  return data
}

export const PatchFetch = async (url, params, ...rest) => {
  const JWT = localStorage.getItem('token')
  api.defaults.headers.authorization = `Bearer ${JWT}`

  const data = await api.patch(url, params, ...rest)
  return data
}

export const DeleteFetch = async (url, params) => {
  const JWT = localStorage.getItem('token')
  api.defaults.headers.authorization = `Bearer ${JWT}`

  const data = await api.delete(url, params)
  return data
}
