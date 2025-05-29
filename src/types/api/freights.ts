export interface GetFreightsLastUpdatedAtResponse {
  parsedUpdatedAt: string
  updatedAt: Date
}

export interface GetAnalyticalCattlePurchaseFreightsRequest {
  startDate: Date
  endDate: Date
  companyCode: string
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
    feedlotName: string
    negotiatedKmDistance: number
    nfCattleQuantity: number
    referenceFreightTablePrice: number
    negotiatedFreightPrice: number
    priceKm: number
    priceKmCattleQuantity: number
  }[]
  parsedData: {
    slaughterDate: string
    companyName: string
    purchaseCattleOrderId: string
    status: string
    freightCompanyName: string
    supplierName: string
    cattleAdvisorName: string
    feedlotName: string
    negotiatedKmDistance: string
    nfCattleQuantity: string
    referenceFreightTablePrice: string
    negotiatedFreightPrice: string
    priceKm: string
    priceKmCattleQuantity: string
  }[]
  totals: {
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
