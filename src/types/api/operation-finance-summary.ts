type GetOperationFinanceSummaryProduction = Record<
  string,
  {
    quantity: number;
    weightInKg: number;
    valueByKg: number;
    value: number;
  }
>;

export interface GetOperationFinanceSummaryResponse {
  // Produção valorizada
  productionByProductFamily: GetOperationFinanceSummaryProduction;
  productionByMarket: GetOperationFinanceSummaryProduction;
  productionCattleCategory: GetOperationFinanceSummaryProduction;
  productionByQuarter: GetOperationFinanceSummaryProduction;

  totals: {
    productionWeightInKg: number;
    incomeValue: number;
    meProductionWeightInKg: number;
    meIncomeValue: number;
    miProductionWeightInKg: number;
    miIncomeValue: number;

    cattlePurchaseBuyCost: number;
    modCost: number;
    embalagemCost: number;

    // ME
    meFinanceExpenses: number;
    meHarborExpenses: number;
    meShipFreightCost: number;
    meRoadFreightCost: number;

    // MI
    miRoadFreightCost: number;
    miCommissionValue: number;
    miTaxValue: number;

    // Custos categorizados
    totalBuyCosts: number;
    totalOperationCosts: number;
    totalLogisticsCosts: number;
    totalCommercialCosts: number;

    totalIncome: number;
    finalResult: number;
  };
}
