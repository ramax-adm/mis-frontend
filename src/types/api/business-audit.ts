type GetBusinessAuditResumeDataAggregated = Record<
  string,
  {
    quantity: number;
    productQuantity: number;
    weightInKg: number;
    totalPrice: number;
  }
>;

type GetBusinessAuditStockDataAggregated = Record<
  string,
  {
    dueDate: Date;
    companyCode: string;
    productCode: string;
    productName: string;
    totalWeightInKg: number;
    daysToExpires: number;
  }
>;
export interface GetBusinessAuditResumeDataResponse {
  invoicesWithSamePrice: {
    date: Date;
    nfNumber: string;
    companyCode: string;
    companyName: string;
    clientCode: string;
    clientName: string;
    totalPrice: number;
  }[];
  invoicesWithSamePriceTotals: {
    quantity: number;
  };

  manuallyEnteredInvoicesTotals: {
    quantity: number;
    productQuantity: number;
    weightInKg: number;
    totalPrice: number;
  };
  manuallyEnteredInvoicesByCompany: GetBusinessAuditResumeDataAggregated;
  manuallyEnteredInvoicesByClient: GetBusinessAuditResumeDataAggregated;
  openCattlePurchaseFreightsTotals: {
    quantity: number;
  };
  openCattlePurchaseFreights: {
    slaughterDate: Date;
    freightClosingDate?: Date;
    purchaseCattleOrderId: string;
    companyCode: string;
    companyName: string;
    freightCompanyCode: string;
    freightCompanyName: string;
    supplierCode: string;
    supplierName: string;
    cattleAdvisorCode: string;
    cattleAdvisorName: string;
    feedlotId: string;
    feedlotName: string;
    feedlotKmDistance: number;
    negotiatedKmDistance: number;
    cattleQuantity: number;
    referenceFreightTablePrice: number;
    negotiatedFreightPrice: number;
    freightTransportPlate: string;
    freightTransportType: string;
  }[];
  cattlePurchaseFreightsDuplicated: {
    date: Date;
    companyCode: string;
    purchaseCattleOrderId: string;
    freightTransportPlate: string;
    cattleQuantity: number;
  }[];

  cattlePurchaseFreightsOverTablePrice: {
    date: Date;
    companyCode: string;
    purchaseCattleOrderId: string;
    referenceFreightTablePrice: number;
    negotiatedFreightPrice: number;
  }[];

  cattlePurchaseFreightsDuplicatedTotals: {
    quantity: number;
  };

  cattlePurchaseFreightsOverTablePriceTotals: {
    quantity: number;
    referenceFreightTablePrice: number;
    negotiatedFreightPrice: number;
  };

  toExpiresStock: GetBusinessAuditStockDataAggregated;
  toExpiresStockTotals: {
    totalWeightInKg: number;
    daysToExpires: number;
  };
}
