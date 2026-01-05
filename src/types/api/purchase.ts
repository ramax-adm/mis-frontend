/********************** RESUMED DATA ************************************/
export interface GetCattlePurchaseTotals {
  cattleQuantity: number;
  weightInArroba: number;
  weightInKg: number;
  freightValue: number;
  purchaseValue: number;
  commissionValue: number;
  finalValue: number;
  arrobaPrice: number;
  headPrice: number;
  kgPrice: number;
  count: number;
}
export type GetCattlePurchaseKpis = {
  headPrice: number;
  arrobaPrice: number;
  kgPrice: number;
  priceDeviation: number;
  freightPercentOverTotal: number;
  commissionPercentOverTotal: number;
  purchasesCount: number;
};

export interface GetCattlePurchaseResumedDataResponse {
  totals: GetCattlePurchaseTotals;
  kpis: GetCattlePurchaseKpis;
  cattlePurchaseByCompany: Record<
    string,
    {
      companyCode: string;
      companyName: string;
      cattleQuantity: number;
      totalValue: number;
      percent: number;
    }
  >;
  cattlePurchaseQuantityBySlaughterDate: Record<string, number>;
  cattlePurchaseByCattleClassification: Record<
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
      percent: number;
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
  company: string;
  cattleOwner: string;
  cattleOwnerCode: string;
  cattleOwnerName: string;
  companyCode: string;
  companyName: string;
  cattleAdvisor: string;
  cattleAdvisorCode: string;
  cattleAdvisorName: string;
  cattleQuantity: string;
  cattleClassification: string;
  cattleWeightInArroba: number;
  cattleWeightInKg: number;
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
  cattleWeightInKg: number;
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
  totals: GetCattlePurchaseTotals;
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
    weightInArroba: number;
    weightInKg: number;
    cattleQuantity: number;
    freightPrice: number;
    purchasePrice: number;
    commissionPrice: number;
    totalValue: number;
    arrobaPrice: number;
    headPrice: number;
    kgPrice: number;
    count: number;
  }
>;
export interface GetCattlePurchaseAggregatedAnalyticalDataResponse {
  totals: GetCattlePurchaseTotals;
  data: GetCattlePurchaseAggregatedAnalyticalDataItem;
}

/************************ XLSX ******************************/
export interface PostExportCattlePurchaseXlsxRequest {
  filters: {
    companyCodes: string;
    cattleOwnerName?: string;
    cattleAdvisorName?: string;
    cattleClassification?: string;
    startDate?: string | null;
    endDate?: string | null;
    purchaseCattleOrderId?: string;
  };
}
