export interface GetStockBalanceLastUpdatedAtResponse {
  parsedUpdatedAt: string;
  parsedExternalUpdatedAt: string;
  updatedAt: Date;
  externalUpdatedAt: Date;
}

export interface GetStockBalanceAnalyticalTotals {
  weightInKg: number;
  quantity: number;
  reservedWeightInKg: number;
  reservedQuantity: number;
  availableWeightInKg: number;
  availableQuantity: number;
}
export interface GetStockBalanceAggregatedAnalyticalItem {
  productLineCode: string;
  productLineName: string;
  productCode: string;
  productName: string;
  weightInKg: number;
  quantity: number;
  reservedWeightInKg: number;
  reservedQuantity: number;
  availableWeightInKg: number;
  availableQuantity: number;
}

export interface GetStockBalanceAggregatedAnalyticalDataResponse {
  totals: GetStockBalanceAnalyticalTotals;
  items: {
    [k: string]: {
      total: GetStockBalanceAnalyticalTotals;
      data: GetStockBalanceAggregatedAnalyticalItem[];
    };
  };
}

export interface GetStockBalanceAnalyticalDataResponse {
  totals: GetStockBalanceAnalyticalTotals;
  items: {
    productLineCode: string;
    productLineName: string;
    productLine: string;
    productCode: string;
    productName: string;
    product: string;
    weightInKg: number;
    quantity: number;
    reservedWeightInKg: number;
    reservedQuantity: number;
    availableWeightInKg: number;
    availableQuantity: number;
  }[];
}
