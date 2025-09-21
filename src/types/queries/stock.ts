import { MarketEnum } from "../sensatta";
import { StockMarket } from "../stock";

export interface UseGetAnalyticalAllStocksRequest {
  companyCode?: string;
}

export interface UseGetProductLinesRequest {
  market?: StockMarket | MarketEnum;
}
