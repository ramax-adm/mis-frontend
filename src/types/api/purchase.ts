export interface GetCattlePurchaseAnalyticalParsedItem {
  slaughterDate: string
  purchaseCattleOrderId: string
  cattleOwnerCode: string
  cattleOwnerName: string
  companyCode: string
  companyName: string
  cattleAdvisorCode: string
  cattleAdvisorName: string
  cattleQuantity: string
  cattleClassification: string
  cattleWeightInArroba: string
  paymentTerm: string
  freightPrice: string
  purchasePrice: string
  commissionPrice: string
  totalValue: string
}
export interface GetCattlePurchaseAnalyticalItem {
  laughterDate: Date
  purchaseCattleOrderId: string
  cattleOwnerCode: string
  cattleOwnerName: string
  companyCode: string
  companyName: string
  cattleAdvisorCode: string
  cattleAdvisorName: string
  cattleQuantity: number
  cattleClassification: string
  cattleWeightInArroba: number
  paymentTerm: number
  freightPrice: number
  purchasePrice: number
  commissionPrice: number
  totalValue: number
}
export interface GetCattlePurchaseAnalyticalTotalsItem {
  weightInArroba: string
  freightValue: string
  purchaseValue: string
  commissionValue: string
  finalValue: string
}
export interface GetCattlePurchaseAnalyticalDataResponse {
  parsedData: GetCattlePurchaseAnalyticalParsedItem[]
  originalData: GetCattlePurchaseAnalyticalItem[]
  totals: GetCattlePurchaseAnalyticalTotalsItem
}

/************************ XLSX ******************************/
export interface PostExportCattlePurchaseXlsxRequest {
  filters: {
    companyCode: string
    cattleOwnerName?: string
    cattleAdvisorName?: string
    cattleClassification?: string
    startDate?: Date | null
    endDate?: Date | null
  }
}
