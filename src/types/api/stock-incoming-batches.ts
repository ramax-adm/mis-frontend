export interface GetStockInconingBatchesResumeResponse {
  totals: {
    weightInKg: number;
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
      totals: {
        weightInKg: number;
        expiredWeightInKg: number;
        byExpireRange: Record<string, number>;
        byCompany: Record<string, number>;
      };
    }
  >;
}
