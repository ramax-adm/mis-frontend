import { InvoicesNfTypesEnum } from "../sales";

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
