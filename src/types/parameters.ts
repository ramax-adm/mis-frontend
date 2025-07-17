import { UnitTypesEnum } from "./globals";
import { MarketEnum } from "./sensatta";
import { User } from "./user";

export type ParameterSalesDeduction = {
  id: string;
  name: string;
  value: number;
  market: MarketEnum;
  companyCode: string;
  unit: UnitTypesEnum;
  paramSaleDeductionProductLines: any[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdById: string;
  updatedById?: string;
  deletedById?: string;
  createdBy?: User;
  updatedBy?: User;
  deletedBy?: User;
};
