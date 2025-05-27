import {
  MeControls,
  MeIncomes,
  MePrices,
  MiControls,
  MiIncomes,
  MiPrices,
  Operation,
  ProjectionControls,
  RawMaterialControls,
} from '../cash-flow-champion-cattle'

export interface PostSimulateCashFlowChampionCattleRequest {
  projecao: ProjectionControls
  matPrima: RawMaterialControls
  operacao: Operation
  mi: MiControls
  me: MeControls
  rendimentosMi: MiIncomes
  rendimentosMe: MeIncomes
  precosMe: MePrices
  precosMi: MiPrices
}

export interface PostExportXlsxRequest {
  id?: string
  values?: {
    projecao?: ProjectionControls
    matPrima?: RawMaterialControls
    operacao?: Operation
    mi?: MiControls
    me?: MeControls
    rendimentosMi?: MiIncomes
    rendimentosMe?: MeIncomes
    precosMe?: MePrices
    precosMi?: MiPrices
  }
}

export interface SimulateCashFlowChampionCattleItem {
  productName: string
  productQuarter: string
  productMarket: string
  incomeMe: string
  incomeMi: string
  productPriceMe: string
  productPriceMi: string
  productPercentMe: string
  productPercentMi: string

  // TODO: Transformar em DTOs separados | PRODUCAO
  meProduction: string
  miProduction: string
  production: string

  // TODO: Transformar em DTOs separados | RECEITAS
  miTotalInbound: string
  miTotalInboundKg: string
  meTotalInbound: string
  meTotalInboundKg: string
  totalInbound: string

  // TODO: Transformar em DTOs separados | CUSTOS
  meBuyCosts: string
  miBuyCosts: string
  totalBuyCosts: string
  meOperationCosts: string
  miOperationCosts: string
  totalOperationCosts: string
  totalMeSalles: string
  totalMiSalles: string
  meTotalCosts: string
  miTotalCosts: string
  totalCosts: string

  // TODO: Transformar em DTOs separados | FECHAMENTO
  finalResultMe: string
  finalResultMeKg: string
  finalResultMi: string
  finalResultMiKg: string
}

export interface SimulateCashFlowChampionCattleTotals {
  entries: {
    totalEntriesInKg: string
    totalDtEntriesInKg: string
    totalPaEntriesInKg: string
    totalTrEntriesInKg: string
  }
}
export interface PostSimulateCashFlowChampionCattleResponse {
  day: {
    miProducts: SimulateCashFlowChampionCattleItem[]
    meProducts: SimulateCashFlowChampionCattleItem[]
    bothMarketProducts: SimulateCashFlowChampionCattleItem[]
  }
  projected: {
    miProducts: SimulateCashFlowChampionCattleItem[]
    meProducts: SimulateCashFlowChampionCattleItem[]
    bothMarketProducts: SimulateCashFlowChampionCattleItem[]
  }
  totals: SimulateCashFlowChampionCattleTotals
}
