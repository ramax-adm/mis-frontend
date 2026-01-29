export enum OrderPriceConsiderationEnum {
  NONE = "none",
  OVER_TABLE_PRICE = "over_table_price",
  UNDER_TABLE_PRICE = "under_table_price",
}

export enum ReturnOccurrenceReturnTypeEnum {
  NONE = "",
  PARTIAL = "partial",
  FULL = "full",
}

export interface ReturnOccurrence {
  id: string;
  date?: Date;
  occurrenceNumber?: string;
  occurrenceCause?: string;
  returnType?: string;
  observation?: string;
  invoiceDate?: Date;
  reInvoicingDate?: Date;
  companyCode?: string;
  companyName?: string;
  productCode?: string;
  productName?: string;
  clientCode?: string;
  clientName?: string;
  salesRepresentativeCode?: string;
  salesRepresentativeName?: string;
  invoiceNf?: string;
  invoiceWeightInKg?: number;
  invoiceQuantity?: number;
  invoiceUnitValue?: number;
  invoiceValue?: number;
  returnNf?: string;
  returnWeightInKg?: number;
  returnQuantity?: number;
  returnUnitValue?: number;
  returnValue?: number;
  reInvoicingNf?: string;
  reInvoicingWeightInKg?: number;
  reInvoicingQuantity?: number;
  reInvoicingUnitValue?: number;
  reInvoicingValue?: number;
  createdAt: Date;
}

export interface ReinvoicingHistoryItem {
  companyCode: string;
  companyName: string;
  date: Date;
  nfNumber: string;
  category: string;
  clientCode: string;
  clientName: string;
  salesRepresentativeCode: string;
  salesRepresentativeName: string;
  productCode: string;
  productName: string;
  weightInKg: number;
  saleUnitPrice: number;
  tableUnitPrice: number;
  invoicingValue: number;
  tableValue: number;
  reInvoicingDate: Date;
  reInvoicingNfNumber: string;
  reInvoicingNfSituation: string;
  reInvoicingCategory: string;
  reInvoicingProductCode: string;
  reInvoicingProductName: string;
  reInvoicingClientCode: string;
  reInvoicingClientName: string;
  reInvoicingWeightInKg: number;
  reInvoicingUnitPrice: number;
  reInvoicingTableUnitPrice: number;
  reInvoicingValue: number;
  reInvoicingTableValue: number;
  reInvoicingDif: number;
  difDays: number;
  difWeightInKg: number;
  difWeightInKgProportional: number;
  difSaleUnitPrice: number;
  difValue: number;
  difValuePercent: number;

  occurrenceNumber: string;
  occurrenceCause: string;
  occurrenceNf: string;
  occurrenceNfProductId: string;
  returnWeightInKg: number;
  returnValue: number;
  reinvoicingSequence: number;
  returnType: string;
  observation: string;

  invoicingValueProportional: number;
  testFinalValue: number;

  aggDateReinvoicing: Date;
  aggProductReinvoicing: string;
  aggWeightInKgReinvoicing: number;
}
