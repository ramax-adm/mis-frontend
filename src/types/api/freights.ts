/***************************** REQUEST ***********************************/
export interface GetAnalyticalCattlePurchaseFreightsRequest {
  startDate: Date;
  endDate: Date;
  companyCode: string;
  status?: string | null;
  freightCompany?: string | null;
}

export interface GetResumeCattlePurchaseFreightsRequest {
  startDate: Date;
  endDate: Date;
  companyCode: string;
}

/***************************** RESPONSE ***********************************/

export interface GetCattleFreightsStatusesResponse {
  label: string;
  value: string;
  key: string;
}

export interface GetFreightsLastUpdatedAtResponse {
  parsedUpdatedAt: string;
  updatedAt: Date;
}

export interface GetAnalyticalCattlePurchaseFreightsResponse {
  originalData: {
    slaughterDate: Date;
    companyName: string;
    purchaseCattleOrderId: string;
    status: string;
    freightCompanyName: string;
    supplierName: string;
    cattleAdvisorName: string;
    freightTransportPlate: string;
    freightTransportType: string;
    feedlotName: string;
    feedlotKmDistance: number;
    negotiatedKmDistance: number;
    cattleQuantity: number;
    referenceFreightTablePrice: number;
    negotiatedFreightPrice: number;
    difPrice: number;
    priceKm: number;
    priceKmCattleQuantity: number;
    entryNf: string;
    complementNf: string;
  }[];
  parsedData: {
    slaughterDate: string;
    companyName: string;
    purchaseCattleOrderId: string;
    status: string;
    freightCompanyName: string;
    supplierName: string;
    cattleAdvisorName: string;
    freightTransportPlate: string;
    freightTransportType: string;
    feedlotName: string;
    feedlotKmDistance: string;
    negotiatedKmDistance: string;
    cattleQuantity: string;
    referenceFreightTablePrice: string;
    negotiatedFreightPrice: string;
    difPrice: string;
    priceKm: string;
    priceKmCattleQuantity: string;
    entryNf: string;
    complementNf: string;
  }[];
  totals: {
    noFreights: {
      amount: number;
      cattleQuantity: number;
    };
    openFreights: {
      amount: number;
      cattleQuantity: number;
    };
    closedFreights: {
      amount: number;
      cattleQuantity: number;
      price: number;
      tablePrice: number;
      difPrice: number;
      maxFreightOutOfTable?: {
        slaughterDate: Date;
        companyName: string;
        purchaseCattleOrderId: string;
        status: string;
        freightCompanyName: string;
        supplierName: string;
        cattleAdvisorName: string;
        freightTransportPlate: string;
        freightTransportType: string;
        feedlotName: string;
        feedlotKmDistance: number;
        negotiatedKmDistance: number;
        cattleQuantity: number;
        referenceFreightTablePrice: number;
        negotiatedFreightPrice: number;
        difPrice: number;
        priceKm: number;
        priceKmCattleQuantity: number;
        entryNf: string;
        complementNf: string;
      };
      minFreightOutOfTable?: {
        slaughterDate: Date;
        companyName: string;
        purchaseCattleOrderId: string;
        status: string;
        freightCompanyName: string;
        supplierName: string;
        cattleAdvisorName: string;
        freightTransportPlate: string;
        freightTransportType: string;
        feedlotName: string;
        feedlotKmDistance: number;
        negotiatedKmDistance: number;
        cattleQuantity: number;
        referenceFreightTablePrice: number;
        negotiatedFreightPrice: number;
        difPrice: number;
        priceKm: number;
        priceKmCattleQuantity: number;
        entryNf: string;
        complementNf: string;
      };
    };
  };
}

export interface GetAnalyticalCattlePurchaseFreightsResponse {
  originalData: {
    slaughterDate: Date;
    companyName: string;
    purchaseCattleOrderId: string;
    status: string;
    freightCompanyName: string;
    supplierName: string;
    cattleAdvisorName: string;
    freightTransportPlate: string;
    freightTransportType: string;
    feedlotName: string;
    feedlotKmDistance: number;
    negotiatedKmDistance: number;
    cattleQuantity: number;
    referenceFreightTablePrice: number;
    negotiatedFreightPrice: number;
    difPrice: number;
    priceKm: number;
    priceKmCattleQuantity: number;
    entryNf: string;
    complementNf: string;
  }[];
}

/***********************   RESUMO  ********************** */
export interface ResumeFreightTotals {
  quantity: number;
  quantityActive: number;
  quantityClosed: number;
  quantityNoFreight: number;
  cattleQuantityActiveFreights: number;
  cattleQuantityClosedFreights: number;
  cattleQuantityNoFreights: number;
  negotiatedPrice: number;
  tablePrice: number;
  difPrice: number;
  maxOutTablePrice: number;
  minOutTablePrice: number;
}

export interface ResumeFreightStatus {
  quantityActive: number;
  percentActive: number;
  quantityClosed: number;
  percentClosed: number;
  quantityNoFreight: number;
  percentNoFreight: number;
}

export interface FreightOverPriceTableItem {
  date: string;
  purchaseCattleOrderId: string;
  freightCompany: string;
  cattleAdvisor: string;
  cattleQuantity: number;
  negotiatedPrice: number;
  tablePrice: number;
  difPrice: number;
}

export interface FreightByFreightCompanyItem {
  freightCompanyCode: string;
  freightCompany: string;
  cattleQuantity: number;
  negotiatedPrice: number;
  tablePrice: number;
  difPrice: number;
}

export interface FreightByCattleAdvisorItem {
  cattleAdvisorCode: string;
  cattleAdvisor: string;
  cattleQuantity: number;
  negotiatedPrice: number;
  tablePrice: number;
  difPrice: number;
}

export interface FreightByFreightTypeItem {
  freightType: string;
  cattleQuantity: number;
  negotiatedPrice: number;
  tablePrice: number;
  difPrice: number;
}

export interface GetResumeCattlePurchaseFreightsResponse {
  totals: ResumeFreightTotals;
  status: ResumeFreightStatus;
  quantityClosedByFreightCompany: Record<
    string,
    { quantity: number; percent: number }
  >;
  quantityActiveByFreightCompany: Record<
    string,
    { quantity: number; percent: number }
  >;
  day: Record<string, number>;
  priceByFreightCompany: Record<string, number>;
  freightsOverPriceTable: FreightOverPriceTableItem[];
  freightsByFreightCompany: FreightByFreightCompanyItem[];
  freightsByCattleAdvisor: FreightByCattleAdvisorItem[];
  freightsByFreightType: FreightByFreightTypeItem[];
}

/************************ XLSX ******************************/
export interface PostExportCattlePurchaseFreightsXlsxRequest {
  filters: {
    companyCode: string;
    startDate: Date;
    endDate: Date;
    status?: string;
    freightCompany?: string;
  };
}
