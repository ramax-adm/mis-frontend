/********************** RESUMED DATA ************************************/
export interface GetCattlePurchaseResumedTotalsItem {
  weightInArroba: number;
  cattleQuantity: number;
  freightPrice: number;
  purchasePrice: number;
  commissionPrice: number;
  totalValue: number;
}
export interface GetCattlePurchaseResumedDataResponse {
  totals: GetCattlePurchaseResumedTotalsItem;
  cattlePurchaseQuantityBySlaughterDate: Record<string, number>;
  cattlePurchaseByCattleAdvisor: Record<
    string,
    {
      cattleQuantity: number;
      freightPrice: number;
      purchasePrice: number;
      commissionPrice: number;
      totalValue: number;
      percent: number;
    }
  >;
  cattlePurchaseByCattleAdvisorList: {
    cattleAdvisorCode: string;
    cattleAdvisorName: string;
    cattleQuantity: number;
    freightPrice: number;
    purchasePrice: number;
    commissionPrice: number;
    totalValue: number;
    percent?: number;
  }[];
  cattlePurchaseByCattleOwner: Record<
    string,
    {
      cattleQuantity: number;
      freightPrice: number;
      purchasePrice: number;
      commissionPrice: number;
      totalValue: number;
      percent?: number;
    }
  >;
  cattlePurchaseByCattleOwnerList: {
    cattleOwnerCode: string;
    cattleOwnerName: string;
    cattleQuantity: number;
    freightPrice: number;
    purchasePrice: number;
    commissionPrice: number;
    totalValue: number;
    percent?: number;
  }[];
}

/********************** ANALITICAL DATA *********************************/
export interface GetCattlePurchaseAnalyticalParsedItem {
  slaughterDate: string;
  purchaseCattleOrderId: string;
  cattleOwnerCode: string;
  cattleOwnerName: string;
  companyCode: string;
  companyName: string;
  cattleAdvisorCode: string;
  cattleAdvisorName: string;
  cattleQuantity: string;
  cattleClassification: string;
  cattleWeightInArroba: string;
  paymentTerm: string;
  freightPrice: string;
  purchasePrice: string;
  commissionPrice: string;
  arrobaPrice: string;
  headPrice: string;
  kgPrice: string;
  totalValue: string;
}

export interface GetCattlePurchaseAnalyticalItem {
  slaughterDate: Date;
  purchaseCattleOrderId: string;
  cattleOwnerCode: string;
  cattleOwnerName: string;
  companyCode: string;
  companyName: string;
  cattleAdvisorCode: string;
  cattleAdvisorName: string;
  cattleQuantity: number;
  cattleClassification: string;
  cattleWeightInArroba: number;
  paymentTerm: number;
  freightPrice: number;
  purchasePrice: number;
  commissionPrice: number;
  totalValue: number;
}
export interface GetCattlePurchaseAnalyticalTotalsItem {
  cattleQuantity: string;
  weightInArroba: string;
  freightValue: string;
  purchaseValue: string;
  commissionValue: string;
  finalValue: string;
  arrobaPrice: string;
  headPrice: string;
  kgPrice: string;
}
export interface GetCattlePurchaseAnalyticalDataResponse {
  parsedData: GetCattlePurchaseAnalyticalParsedItem[];
  originalData: GetCattlePurchaseAnalyticalItem[];
  totals: GetCattlePurchaseAnalyticalTotalsItem;
}

export type GetCattlePurchaseAggregatedAnalyticalDataItem = Record<
  string,
  {
    slaughterDate: Date;
    cattleOwnerCode: string;
    cattleOwnerName: string;
    companyCode: string;
    companyName: string;
    cattleAdvisorCode: string;
    cattleAdvisorName: string;
    cattleQuantity: number;
    freightPrice: number;
    purchasePrice: number;
    commissionPrice: number;
    totalValue: number;
  }
>;
export interface GetCattlePurchaseAggregatedAnalyticalDataResponse {
  totals: GetCattlePurchaseAnalyticalTotalsItem;
  data: GetCattlePurchaseAggregatedAnalyticalDataItem;
}

/************************ XLSX ******************************/
export interface PostExportCattlePurchaseXlsxRequest {
  filters: {
    companyCode: string;
    cattleOwnerName?: string;
    cattleAdvisorName?: string;
    cattleClassification?: string;
    startDate?: Date | null;
    endDate?: Date | null;
  };
}
