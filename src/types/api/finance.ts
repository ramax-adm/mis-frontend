import { AccountPayableItem, AccountReceivableItem } from "../finance";

export interface AccountsReceivableGetAnalyticalDataResponseDto {
  data: AccountReceivableItem[];
  totals: {
    quantity: number;
    value: number;
    openValue: number;
  };
}

export interface AccountReceivableResumeTotals {
  quantity: number;
  value: number;
  openValue: number;
}

export type AccountReceivableResumeAgg = {
  quantity: number;
  value: number;
  openValue: number;
  percent: number;
  totalPercent: number;
};

export type AccountReceivableOpenValueByClientAgg = {
  quantity: number;
  value: number;
  openValueToExpire: number;
  openValueExpired: number;
  percentage: number;
};

export type AccountReceivableLossByClientAgg = {
  quantity: number;
  value: number;
  percentage: number;
};

export interface AccountsReceivableGetResumeDataResponse {
  totals: AccountReceivableResumeTotals;
  listByStatus: Record<string, AccountReceivableItem[]>;
  listBySituation: Record<string, AccountReceivableItem[]>;
  listByCompany: Record<string, AccountReceivableItem[]>;
  listByClient: Record<string, AccountReceivableItem[]>;
  accountReceivableByStatus: Record<string, AccountReceivableResumeAgg>;
  accountReceivableByBucketSituation: Record<
    string,
    AccountReceivableResumeAgg
  >;
  accountReceivableByCompany: Record<string, AccountReceivableResumeAgg>;
  accountReceivableByClient: Record<string, AccountReceivableResumeAgg>;
  openValueByClient: Record<string, AccountReceivableOpenValueByClientAgg>;
  lossByClient: Record<string, AccountReceivableLossByClientAgg>;
}

export interface AccountsPayableGetAnalyticalDataResponseDto {
  data: AccountPayableItem[];
  totals: {
    quantity: number;
    value: number;
  };
}
