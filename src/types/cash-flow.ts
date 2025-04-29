// SIMULATION FORM INTERFACES
export interface RawMaterialControls {
  cbsMe: number
  cbsMi: number
  diasPagamento: number
  diasPagamentoFrete: number
  pDt: number
  pPa: number
  pTr: number
  pesoArroba: number
  precoArrobaMe: number
  precoArrobaMi: number
  precoFreteKg: number
}

export interface Operation {
  arredKg: number
  precoEmbalagem: number
  precoMod: number
  tipoArrend: string
  diasPagamentoProdutos: number
}

export interface MiControls {
  pComissoesMi: number
  pImpostosMi: number
  precoFreteMi: number
  vendasMiDias: number
}

export interface MeControls {
  vendasMeDias: number
  pAntecipacaoMe: number
  diasPosicao: number
  ptax: number
  precoFreteRodoviario: number
  precoPorto: number
  precoFreteInter: number
  precoFinanc: number
}

export interface MePrices {
  dt: {
    pAcem: number
    pGorduraExt: number
    pGorduraInt: number
    pMusculo: number
    pPaleta: number
    pPeito: number
  }
  pa: {
    pCostela: number
  }
  tr: {
    pBananinha: number
    pContraFile: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFileCostela: number
    pCorAlcatra: number
    pPicanha: number
    pLagarto: number
    pMusculoMole: number
    pMusculoDuro: number
    pPatinho: number
    pRecortes: number
    pRoubado: number
    pMaminha: number
    pFralda: number
  }
}

export interface MiPrices {
  dt: {
    pAcem: number
    pPaleta: number
    pCupim: number
    pMusculo: number
    pPeito: number
    pRecortes: number
  }
  pa: {
    pCostela: number
    pBifeVazio: number
  }
  tr: {
    pBananinha: number
    pCapaFile: number
    pContraFile: number
    pCorAlcatra: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFralda: number
    pLagarto: number
    pMaminha: number
    pMusculo: number
    pPatinho: number
    pPicanha: number
    pRecAlcatra: number
    pRecortes: number
    pGordura: number
  }
}

export interface MeIncomes {
  dt: {
    pAcem: number
    pPeito: number
    pGorduraExt: number
    pGorduraInt: number
    pMusculo: number
    pPaleta: number
  }
  pa: {
    pCostela: number
  }
  tr: {
    pBananinha: number
    pLagarto: number
    pContraFile: number
    pMusculoMole: number
    pCoxaoDuro: number
    pMusculoDuro: number
    pCoxaoMole: number
    pPatinho: number
    pFileMignon: number
    pRecortes: number
    pFileCostela: number
    pRoubado: number
    pCorAlcatra: number
    pMaminha: number
    pPicanha: number
    pFralda: number
  }
}

export interface MiIncomes {
  dt: {
    pAcem: number
    pCupim: number
    pMusculo: number
    pPaleta: number
    pPeito: number
    pRecortes: number
  }
  pa: {
    pBifeVazio: number
    pCostela: number
  }
  tr: {
    pBananinha: number
    pCapaFile: number
    pContraFile: number
    pCorAlcatra: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFralda: number
    pGordura: number
    pLagarto: number
    pMaminha: number
    pMusculo: number
    pPatinho: number
    pPicanha: number
    pRecAlcatra: number
    pRecortes: number
  }
}

// SIMULATION RESULTS
export interface ProductionValues {
  dt: {
    entradaDt: number
    pRendimentoDt: number
    kgRendimentoDt: number
  }
  pa: {
    entradaPa: number
    pRendimentoPa: number
    kgRendimentoPa: number
  }
  tr: {
    entradaTr: number
    pRendimentoTr: number
    kgRendimentoTr: number
  }
}

export interface ProductionValuesResponse {
  me: ProductionValues
  mi: ProductionValues
  totalByQuartering: ProductionValues
  total: {
    kgEntradaMi: number
    kgProduzidoMi: number
    pRendimentoMi: number
    kgEntradaMe: number
    kgProduzidoMe: number
    pRendimentoMe: number
    kgEntrada: number
    pRendimento: number
    kgProduzido: number
  }
}

export interface ProjectProduction {
  kgTotalEntrada: number
  kgProduzidoTotal: number
  pProduzido: number
}
export interface ProjectProductionResponse {
  total: {
    kgEntradaTotal: number
    kgProduzidoTotal: number
  }
  mi: ProjectProduction
  me: ProjectProduction
}

export interface ProjectIncomesResponse {
  totalIncomeEntriesMe: number
  totalIncomeEntriesMi: number
  totalIncome: number
}

export interface ProjectCattlePaymentOutings {
  valorTotalCompraCabecas: number
  valorTotalFrete: number
  me: {
    valorFreteBoiMe: number
    valorCompraCabecasMe: number
  }
  mi: {
    valorFreteBoiMi: number
    valorCompraCabecasMi: number
  }
}

export interface ProjectOperationPaymentOutings {
  arred: number
  embalagem: number
  mod: number
  me: {
    valorEmbalagemMe: number
    valorModMe: number
    arredMe: number
  }
  mi: { valorEmbalagemMi: number; valorModMi: number; arredMi: number }
}

export interface ProjectSallesPaymentOutings {
  me: {
    rodov: number
    porto: number
    marit: number
    financ: number
  }
  mi: {
    frete: number
    comissao: number
    imposto: number
  }
}
export interface ProjectOutingsResponse {
  compra: ProjectCattlePaymentOutings
  operacao: ProjectOperationPaymentOutings
  vendas: ProjectSallesPaymentOutings
  totalExpenses: number
}

export interface ProjectOperationClosureResponse {
  saidas: string
  entradas: string
  fechamento: string
}

export interface ProjectCostByKgResponse {
  total: CostsTotals
  costs: CostsProjected
  kpis: KpisProjected
}

export interface CostsProjected {
  // Tabela 1
  custoTotal: CostsTransposed[]
  custoMe: CostsTransposed[]
  custoMi: CostsTransposed[]

  // Tabela 2
  custoTotalAnimais: CostsTransposed[]
  custoMeAnimais: CostsTransposed[]
  custoMiAnimais: CostsTransposed[]

  // Tabela 3
  custoTotalArred: CostsTransposed[]
  custoMeArred: CostsTransposed[]
  custoMiArred: CostsTransposed[]
}

export interface KpisProjected {
  me: {
    custoKgFinalMe: string
    vendaKgMe: string
    margemBrutaMe: string
    margemLiquidaMe: string
  }
  mi: {
    custoKgFinalMi: string
    vendaKgMi: string
    margemBrutaMi: string
    margemLiquidaMi: string
  }
  total: {
    custoKgFinal: string
    vendaKg: string
    margemBruta: string
    margemLiquida: string
  }
}

export interface CostsTotals {
  totalCustoTotal: number
  totalCustoKgTotal: number
  totalCustoAnimaisTotal: number
  totalCustoKgAnimaisTotal: number
  totalCustoArrendTotal: number
  totalCustoKgArrendTotal: number

  totalCustoMe: number
  totalCustoKgMe: number
  totalCustoAnimaisMe: number
  totalCustoKgAnimaisMe: number
  totalCustoArrendMe: number
  totalCustoKgArrendMe: number

  totalCustoMi: number
  totalCustoKgMi: number
  totalCustoAnimaisMi: number
  totalCustoKgAnimaisMi: number
  totalCustoArrendMi: number
  totalCustoKgArrendMi: number
}

export interface CostsTransposed {
  label: string
  value: number
  costByKg: number
}

export interface ProjectDailyFlowResponse {
  breakEven: number | null
  breakEvenFinal: number | null
  dailyFlow: DailyFlowProjection[]
}

export interface DailyFlowProjection {
  dia: string
  compraBoi: string
  freteBoi: string
  arrend: string
  embalagem: string
  mod: string
  freteMi: string
  comissaoMi: string
  impostoMi: string
  freteRodMe: string
  portoMe: string
  maritMe: string
  financMe: string
  saidas: string
  saidasAcc: string
  recMe40: string
  recMe60: string
  recMe: string
  recMi: string
  recTotal: string
  recTotalAcc: string
  recTotalWithExpenses: string
  acc: string
}

export interface ProjectionControls {
  diasProjecao: number
}
