import { AccountReceivableItem } from "../finance";

export interface AccountsReceivableGetAnalyticalDataResponseDto {
  data: AccountReceivableItem[];
  totals: {
    quantity: number;
    value: number;
    openValue: number;
  };
}
