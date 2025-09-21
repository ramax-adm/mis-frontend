import { MarketEnum } from "../sensatta";
import { StockMarket } from "../stock";

export interface GetAllStocksResponse {
  companyCode: string;
  companyName: string;
  stockData: GetStockByCompanyResponse[];
  toExpiresData: GetToExpiresByCompanyResponse[];
}

export interface GetStockByCompanyResponse {
  companyName: string;
  productLineAcronym: string;
  productLineName: string;
  productCode: string;
  productName: string;
  productClassification: string;
  boxAmount: string;
  quantity: string;
  totalWeightInKg: string;
  basePriceCar: string;
  basePriceTruck: string;
  totalPrice: string;
}

export interface GetAnalyticalStockByCompanyResponse {
  companyName: string;
  productLineAcronym: string;
  productLineName: string;
  productCode: string;
  productName: string;
  productClassification: string;
  boxAmount: string;
  quantity: string;
  totalWeightInKg: string;
  basePriceCar: string;
  basePriceTruck: string;
  totalPrice: string;

  // Truck
  priceSPTruck: string;
  priceRJTruck: string;
  pricePRTruck: string;
  priceSCTruck: string;
  priceMGTruck: string;
  priceBATruck: string;
  pricePETruck: string;
  pricePBTruck: string;
  priceRNTruck: string;
  priceGOTruck: string;
  priceDFTruck: string;
  priceFOTruck: string;
  priceRSTruck: string;
  priceMATruck: string;
  priceMTTruck: string;
  priceMSTruck: string;
  pricePATruck: string;
  priceESTruck: string;
  priceTOTruck: string;

  // Car
  priceSPCar: string;
  priceRJCar: string;
  pricePRCar: string;
  priceSCCar: string;
  priceMGCar: string;
  priceBACar: string;
  pricePECar: string;
  pricePBCar: string;
  priceRNCar: string;
  priceGOCar: string;
  priceDFCar: string;
  priceFOCar: string;
  priceRSCar: string;
  priceMACar: string;
  priceMTCar: string;
  priceMSCar: string;
  pricePACar: string;
  priceESCar: string;
  priceTOCar: string;
}

export interface GetToExpiresByCompanyResponse {
  dueDate: string;
  companyName: string;
  productLineAcronym: string;
  productLineName: string;
  productCode: string;
  productName: string;
  productClassification: string;
  boxAmount: string;
  quantity: string;
  totalWeightInKg: string;
  daysToExpires: number;
}

export interface GetAnalyticalToExpiresByCompanyResponse {
  dueDate: string;
  companyName: string;
  productLineAcronym: string;
  productLineCode: string;
  productLineName: string;
  productCode: string;
  productName: string;
  productClassification: string;
  boxAmount: string;
  quantity: string;
  totalWeightInKg: string;
  basePriceCar: string;
  basePriceTruck: string;
  totalPrice: string;
  daysToExpires: number;
}

export interface GetStockLastUpdatedAtResponse {
  parsedUpdatedAt: string;
  parsedExternalUpdatedAt: string;
  updatedAt: Date;
  externalUpdatedAt: Date;
}

export interface GetAnalyticalAllStocksResponse {
  companyCode: string;
  companyName: string;
  stockData: GetAnalyticalStockByCompanyResponse[];
  toExpiresData: GetAnalyticalToExpiresByCompanyResponse[];
}

export interface GetAnalyticalAllStocksRequest {
  companyCode?: string;
}

export interface GetProductLinesRequest {
  market?: StockMarket | MarketEnum;
}

export interface PostExportStockXlsxRequest {
  exportType: "resumed" | "analytical";

  filters: {
    companyCode?: string;
    productLineAcronyms: { companyCode: string; values: string[] }[];
  };
}
