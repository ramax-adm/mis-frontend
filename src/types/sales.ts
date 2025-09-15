import { MarketEnum } from "./sensatta";

export enum InvoicesNfTypesEnum {
  COM_LEITOR = "COM LEITOR",
  AVULSA = "AVULSA",
}

export type OrderLine = {
  id: string;
  billingDate?: Date;
  issueDate?: Date;
  companyCode?: string;
  companyName?: string;
  orderId?: string;
  market?: MarketEnum;
  situation?: string;
  clientCode?: string;
  clientName?: string;
  salesRepresentativeCode?: string;
  salesRepresentativeName?: string;
  category?: string;
  productLineCode?: string;
  productLineName?: string;
  productCode?: string;
  productName?: string;
  quantity?: number;
  weightInKg?: number;
  currency?: string;
  costValue?: number;
  discountPromotionValue?: number;
  saleUnitValue?: number;
  referenceTableUnitValue?: number;
  totalValue?: number;
  receivableTitleValue?: number;
  referenceTableId?: string;
  referenceTableDescription?: string;
  freightCompanyId?: string;
  freightCompanyName?: string;
  description?: string;
  receivableTitleId?: string;
  receivableTitleNumber?: string;
  receivableTitleObservation?: string;
  accountGroupCode?: string;
  accountGroupName?: string;
  accountCode?: string;
  accountName?: string;
  nfId?: string;
  nfNumber?: string;
  cfopCode?: string;
  cfopDescription?: string;
  createdAt: Date;
};
