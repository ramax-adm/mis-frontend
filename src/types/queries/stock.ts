import { StockMarket } from "@/constants/app/stock";
import { MarketEnum } from "../sensatta";

export interface UseGetAnalyticalAllStocksRequest {
  companyCode?: string;
}

export interface UseGetProductLinesRequest {
  market?: StockMarket | MarketEnum;
}
