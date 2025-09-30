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
