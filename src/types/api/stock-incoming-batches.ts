export interface GetStockInconingBatchesResumeResponse {
  totals: {
    weightInKg: number;
    totalPrice: number;
    expiredWeightInKg: number;
    byExpireRange: Record<string, number>;
    byCompany: Record<string, number>;
  };
  data: Record<
    string,
    {
      market: string;
      productLineCode: string;
      productLineName: string;
      productCode: string;
      productName: string;
      basePriceCar: number;
      totals: {
        weightInKg: number;
        totalPrice: number;
        expiredWeightInKg: number;
        byExpireRange: Record<string, number>;
        byCompany: Record<string, number>;
      };
    }
  >;
}

export interface GetStockInconingBatchesAnalyticalResponse {
  totals: {
    weightInKg: number;
    totalPrice: number;
    expiredWeightInKg: number;
    byExpireRange: Record<string, number>;
  };
  data: Record<
    string,
    {
      market: string;
      companyCode: string;
      companyName: string;
      productLineCode: string;
      productLineName: string;
      productCode: string;
      productName: string;
      basePriceCar: number;
      totals: {
        weightInKg: number;
        totalPrice: number;
        expiredWeightInKg: number;
        byExpireRange: Record<string, number>;
      };
    }
  >;
}
export interface GetStockInconingBatchesLastUpdatedAtResponse {
  updatedAt: Date;
  parsedUpdatedAt: string;
}
