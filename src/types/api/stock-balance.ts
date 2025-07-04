export interface GetStockBalanceLastUpdatedAtResponse {
  parsedUpdatedAt: string;
  parsedExternalUpdatedAt: string;
  updatedAt: Date;
  externalUpdatedAt: Date;
}

export interface GetStockBalanceAggregatedAnalyticalTotals {
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
  total: {
    weightInKg: number;
    quantity: number;
    reservedWeightInKg: number;
    reservedQuantity: number;
    availableWeightInKg: number;
    availableQuantity: number;
  };
  items: {
    [k: string]: {
      total: GetStockBalanceAggregatedAnalyticalTotals;
      data: GetStockBalanceAggregatedAnalyticalItem[];
    };
  };
}

export interface GetStockBalanceAnalyticalDataResponse {
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
}
