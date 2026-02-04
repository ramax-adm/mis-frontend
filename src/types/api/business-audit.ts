import { ReinvoicingHistoryItem, ReturnOccurrence } from "../business-audit";
import { OrderLine } from "../sales";
import { MarketEnum } from "../sensatta";

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

export type GetOrderLineItem = OrderLine & {
  city: string;
  uf: string;
  tableValue: number;
  invoicingValue: number;
  dif: number;
  difPercent: number;
  additionPercent: number;
  discountPercent: number;
};

export type GetBusinessAuditSalesDataTotals = {
  invoiceQuantity: number;
  count: number;
  totalKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  totalDiffPercent: number;
  totalAdditionValue: number;
  totalDiscountValue: number;
};

export type GetBusinessAuditSalesInvoiceAgg = {
  companyCode?: string;
  companyName?: string;
  date?: Date;
  nfNumber?: string;
  orderNumber?: string;
  orderCategory?: string;
  cfopCode?: string;
  cfopDescription?: string;
  clientCode?: string;
  clientName?: string;
  representativeCode?: string;
  representativeName?: string;
  city?: string;
  uf?: string;
  paymentTerm?: string;
  market?: MarketEnum;
  currency?: string;
  salesCount: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  totalDiffPercent: number;
  additionPercent: number;
  additionValue: number;
  discountPercent: number;
  discountValue: number;
  percentValue: number;
  totalKg: number;
};
export type GetBusinessAuditSalesInvoiceTotals = {
  weightInKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
};

export type GetBusinessAuditSalesProductAgg = {
  productCode?: string;
  productName?: string;
  salesCount: number;
  totalKg: number;
  totalFatValue: number;
  totalTableValue: number;
  totalDiff: number;
  totalDiffPercent: number;
  additionPercent: number;
  additionValue: number;
  discountPercent: number;
  discountValue: number;
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
  totalDiffPercent: number;
  additionPercent: number;
  additionValue: number;
  discountPercent: number;
  discountValue: number;
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
  totalDiffPercent: number;
  additionPercent: number;
  additionValue: number;
  discountPercent: number;
  discountValue: number;
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

export type GetBusinessAuditReturnOccurrenceAgg = {
  occurrenceNumber: string;
  date: Date;
  invoiceDate: Date;
  occurrenceCause: string;
  returnType: string;
  companyCode: string;
  companyName: string;
  invoiceNfNumber: string;
  returnNfNumber: string;
  clientCode: string;
  clientName: string;
  salesRepresentativeCode: string;
  salesRepresentativeName: string;
  returnQuantity: number;
  invoiceQuantity: number;
  returnWeightInKg: number;
  invoiceWeightInKg: number;
  returnValue: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByCompanyAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByCauseAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
  percentValue: number;
};

export type GetBusinessAuditReturnOccurrenceByRepresentativeAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByClientAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByProductAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByDayAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
};

export type GetBusinessAuditReturnOccurrenceByTypeAgg = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
  percentValue: number;
};

export type BusinessAuditReturnOccurrencesDataTotals = {
  count: number;
  quantity: number;
  weightInKg: number;
  value: number;
  invoiceValue: number;
  totalSalesFatValue: number;
  percentFatValue: number;
};

export interface GetBusinessAuditReturnOccurrencesDataResponse {
  occurrencesByCompany?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByCompanyAgg>;
  };
  occurrencesByCause?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByCauseAgg>;
  };
  occurrencesByRepresentative?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByRepresentativeAgg>;
  };
  occurrencesByClient?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByClientAgg>;
  };
  occurrencesByProduct?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByProductAgg>;
  };
  occurrencesByDay?: {
    totals: BusinessAuditReturnOccurrencesDataTotals;
    data: Record<string, GetBusinessAuditReturnOccurrenceByDayAgg>;
  };
  occurrencesByType?: Record<string, GetBusinessAuditReturnOccurrenceByTypeAgg>;
  occurrences: {
    data: Record<string, GetBusinessAuditReturnOccurrenceAgg>;
    totals: BusinessAuditReturnOccurrencesDataTotals;
  };
}

export interface GetBusinessAuditInvoiceTraceabilityDataResponse {
  salesByInvoice: {
    totals: GetBusinessAuditSalesInvoiceTotals;
    data: Record<string, GetBusinessAuditSalesInvoiceAgg>;
  };
  reInvoicings: {
    totals: GetBusinessAuditSalesInvoiceTotals;
    data: Record<string, GetBusinessAuditSalesInvoiceAgg>;
  };
  reinvoicingsTraceability: ReinvoicingHistoryItem[];
  salesByCompany: {
    totals: {
      quantity: number;
      quantityPercent: number;
      invoiceValue: number;
      referenceTableValue: number;
      difValue: number;
      difPercent: number;
    };
    data: Record<
      string,
      {
        companyCode: string;
        companyName: string;
        quantity: number;
        quantityPercent: number;
        invoiceValue: number;
        referenceTableValue: number;
        difValue: number;
        difPercent: number;
      }
    >;
  };
  kpis: {
    invoiceQuantity: number;
    initialFatValue: number;
    initialTableValue: number;
    initialDifValue: number;
    returnOccurrencesValue: number;
    reInvoicingsValue: number;
    finalFatValue: number;
  };
  reInvoicingsTotals: {
    reInvoicingQuantity: number;
    reInvoicingQuantityPercent: number;
    invoicesValue: number;
    tableValue: number;
    tableDifValue: number;
    invoicesProportionalValue: number;
    reInvoicingsValue: number;
    finalValue: number;
    difValue: number;
    difPercent: number;
  };
  totals: {
    quantityNf: number;
    finalValue: number;
    initialDifValue: number;
    initialDifPercent: number;
    reInvoicingDifValue: number;
    reInvoicingDifPercent: number;
    totalDifValue: number;
    totalDifPercent: number;
  };
}
