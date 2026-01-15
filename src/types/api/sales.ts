import { ReturnOccurrence } from "../business-audit";
import { InvoicesNfTypesEnum, OrderLine } from "../sales";
import { MarketEnum } from "../sensatta";

export interface GetSalesInvoicesUpdatedAtResponse {
  parsedUpdatedAt: string;
  updatedAt: Date;
}

export type GetInvoicesItem = {
  id: string;
  date: Date;
  nfSituation: string;
  nfType: string;
  nfDocumentType: string;
  clientTypeCode: string;
  clientTypeName: string;
  companyCode: string;
  companyName: string;
  cfopCode: string;
  cfopDescription: string;
  nfNumber: string;
  requestId: string; // sequencial pedido
  clientCode: string;
  clientName: string;
  productCode: string;
  productName: string;
  boxAmount: number;
  weightInKg: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
};

export type GetOrdersTotals = {
  count: number;
  quantity: number;
  weightInKg: number;
  totalValue: number;
  tableValue: number;
  difValue: number;
};

export type GetOrdersItem = {
  billingDate: Date;
  issueDate: Date;
  companyCode: string;
  companyName: string;
  orderId: string;
  market: MarketEnum;
  situation: string;
  clientCode: string;
  clientName: string;
  salesRepresentativeCode: string;
  salesRepresentativeName: string;
  nfId: string;
  nfNumber: string;
  weightInKg: number;
  saleUnitValue: number;
  referenceTableUnitValue: number;
  totalValue: number;
  tableValue: number;
  difValue: number;
};

export interface GetAnalyticalInvoicesResponse {
  totals: {
    quantity: number;
    productQuantity: number;
    boxAmount: number;
    weightInKg: number;
    unitPrice: number;
    totalPrice: number;
  };
  data: GetInvoicesItem[];
}

export interface GetAnalyticalOrdersResponse {
  totals: GetOrdersTotals;
  data: Record<string, GetOrdersItem>;
}

export interface GetAnalyticalReturnOccurrencesResponse {
  totals: {
    count: number;
    fatValue: number;
    returnValue: number;
    returnWeightInKg: number;
    returnQuantity: number;
  };
  data: ReturnOccurrence[];
}

export interface PostExportSalesInvoicesXlsxRequest {
  filters: {
    companyCodes: string;
    startDate?: string;
    endDate?: string;
    clientCode?: string;
    cfopCodes?: string;
    nfType?: InvoicesNfTypesEnum;
    nfNumber?: string;
    nfSituation?: string;
  };
}
