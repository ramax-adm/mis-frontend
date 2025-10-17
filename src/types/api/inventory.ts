export type InventoryAnalyticalDataDto = {
  inventoryId: string;
  warehouseCode: string;
  productCode: string;
  productName: string;
  boxNumber: string;
  weightInKg: number;
  events: Record<string, string>;
};

export type InventoryAnalyticalTotalsDto = {
  count: number;
  totalWeight: number;
};

export interface InventoryGetAnalitycalDataResponse {
  data: InventoryAnalyticalDataDto[];
  totals: InventoryAnalyticalTotalsDto;
}

export type InventoryResumeDataDto = {
  inventoryId: string;
  warehouseCode: string;
  productCode: string;
  productName: string;
  inventoryQuantity: number;
  inventoryWeightInKg: number;
  stockQuantity: number;
  stockWeightInKg: number;
  blockedQuantity: number;
  blockedWeightInKg: number;
  cancelatedQuantity: number;
  cancelatedWeightInKg: number;
  dispatchedQuantity: number;
  dispatchedWeightInKg: number;
  quantityDif: number;
  weightInKgDif: number;
};

export type InventoryResumeTotalsDto = {
  count: number;
  inventoryQuantity: number;
  inventoryWeightInKg: number;
  stockQuantity: number;
  stockWeightInKg: number;
  blockedQuantity: number;
  blockedWeightInKg: number;
  cancelatedQuantity: number;
  cancelatedWeightInKg: number;
  dispatchedQuantity: number;
  dispatchedWeightInKg: number;
  quantityDif: number;
  weightInKgDif: number;
};

export interface InventoryGetResumeDataResponse {
  data: InventoryResumeDataDto[];
  totals: InventoryResumeTotalsDto;
}
