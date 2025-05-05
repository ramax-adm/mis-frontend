import { StockMarket } from '@/constants/app/stock'

export interface UseGetAnalyticalAllStocksRequest {
  companyCode?: string
}

export interface UseGetProductLinesRequest {
  market?: StockMarket
}
