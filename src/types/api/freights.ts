export interface GetCattleFreightsStatusesResponse {
  label: string
  value: string
  key: string
}

export interface GetFreightsLastUpdatedAtResponse {
  parsedUpdatedAt: string
  updatedAt: Date
}

export interface GetAnalyticalCattlePurchaseFreightsRequest {
  startDate: Date
  endDate: Date
  companyCode: string
  status?: string | null
  freightCompany?: string | null
}

export interface GetAnalyticalCattlePurchaseFreightsResponse {
  originalData: {
    slaughterDate: Date
    companyName: string
    purchaseCattleOrderId: string
    status: string
    freightCompanyName: string
    supplierName: string
    cattleAdvisorName: string
    freightTransportPlate: string
    freightTransportType: string
    feedlotName: string
    feedlotKmDistance: number
    negotiatedKmDistance: number
    cattleQuantity: number
    referenceFreightTablePrice: number
    negotiatedFreightPrice: number
    priceKm: number
    priceKmCattleQuantity: number
    entryNf: string
    complementNf: string
  }[]
  parsedData: {
    slaughterDate: string
    companyName: string
    purchaseCattleOrderId: string
    status: string
    freightCompanyName: string
    supplierName: string
    cattleAdvisorName: string
    freightTransportPlate: string
    freightTransportType: string
    feedlotName: string
    feedlotKmDistance: string
    negotiatedKmDistance: string
    cattleQuantity: string
    referenceFreightTablePrice: string
    negotiatedFreightPrice: string
    priceKm: string
    priceKmCattleQuantity: string
    entryNf: string
    complementNf: string
  }[]
  totals: {
    noFreights: {
      amount: number
      cattleQuantity: number
    }
    openFreights: {
      amount: number
      cattleQuantity: number
    }
    closedFreights: {
      amount: number
      cattleQuantity: number
      price: number
    }
  }
}

export interface PostExportCattlePurchaseFreightsXlsxRequest {
  filters: {
    companyCode: string
    startDate: Date
    endDate: Date
    status?: string
    freightCompany?: string
  }
}
