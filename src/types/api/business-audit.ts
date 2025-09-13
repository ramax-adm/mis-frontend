type GetBusinessAuditOverviewDataAggregated = Record<
  string,
  {
    companyCode: string;
    companyName: string;
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

export interface GetBusinessAuditOverviewDataResponse {
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
  manuallyEnteredInvoicesByCompany: GetBusinessAuditOverviewDataAggregated;
  manuallyEnteredInvoicesByClient: GetBusinessAuditOverviewDataAggregated;
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
    totalExpiredStockWeightInKg: number; // estoque vencido
    totalFifoExpiresStockWeightInKg: number; // estoque de 0-15 dias, vira fifo
    totalAlertExpiresStockWeightInKg: number; // estoque de 15 a 30 dias
  };
}

export type GetBusinessAuditSalesDataTotals = {
  count: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
};

export type GetBusinessAuditSalesInvoiceAgg = {
  companyCode?: string;
  companyName?: string;
  date?: Date;
  nfNumber?: string;
  orderNumber?: string;
  clientCode?: string;
  clientName?: string;
  representativeCode?: string;
  representativeName?: string;
  paymentTerm?: string;
  salesCount: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  totalKg: number;
};

export type GetBusinessAuditSalesProductAgg = {
  productCode?: string;
  productName?: string;
  salesCount: number;
  totalKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  percentValue: number;
};

export type GetBusinessAuditSalesClientAgg = {
  clientCode?: string;
  clientName?: string;
  salesCount: number;
  totalKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  percentValue: number;
};

export type GetBusinessAuditSalesRepresentativeAgg = {
  salesRepresentativeCode: string;
  salesRepresentativeName: string;
  salesCount: number;
  totalKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  percentValue: number;
};

export interface GetBusinessAuditSalesDataResponse {
  salesByInvoice: {
    totals: GetBusinessAuditSalesDataTotals;
    data: Record<string, GetBusinessAuditSalesInvoiceAgg>; // Map<string, InvoiceAgg>
  };
  salesByProduct: {
    totals: GetBusinessAuditSalesDataTotals;
    data: Record<string, GetBusinessAuditSalesProductAgg>; // Map<string, ProductAgg>
  };
  salesByClient: {
    totals: GetBusinessAuditSalesDataTotals;
    data: Record<string, GetBusinessAuditSalesClientAgg>; // Map<string, ClientAgg>
  };
  salesByRepresentative: {
    totals: GetBusinessAuditSalesDataTotals;
    data: Record<string, GetBusinessAuditSalesRepresentativeAgg>; // Map<string, SalesRepresentativeAgg>
  };
}
