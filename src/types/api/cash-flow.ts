import {
  RawMaterialControls,
  Operation,
  MiControls,
  MeControls,
  MePrices,
  MiPrices,
  MiIncomes,
  MeIncomes,
  ProductionValuesResponse,
  ProjectCostByKgResponse,
  ProjectIncomesResponse,
  ProjectOperationClosureResponse,
  ProjectOutingsResponse,
  ProjectProductionResponse,
  ProjectDailyFlowResponse,
  ProjectionControls,
} from '../cash-flow'
import { BaseEntity } from '../globals'

export interface GetArrendTypesResponse {
  label: string
  value: string
}

export interface GetUserSimulationsRequest {
  date?: string
}

export interface UserSimulation extends BaseEntity {
  publicId: number
  requestDto: {
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
  results: {
    productionValues: ProductionValuesResponse
    productionProjection: ProjectProductionResponse
    entriesProjection: ProjectIncomesResponse
    outingsProjection: ProjectOutingsResponse
    operationClosureProjection: ProjectOperationClosureResponse
    costsByKgProjection: ProjectCostByKgResponse
    dailyFlowProjection: ProjectDailyFlowResponse
  }
}

export interface UserSimulationTotals {
  cbsMe: string
  cbsMi: string
  entradas: string
  saidas: string
  fechamento: string
}

export interface GetUserSimulationsResponse {
  data: UserSimulation[]
  totals: UserSimulationTotals
}

export interface PostSimulateDataRequest {
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

export interface PostSimulateDataResponse {
  parsedData: {
    productionValues: ProductionValuesResponse
    productionProjection: ProjectProductionResponse
    entriesProjection: ProjectIncomesResponse
    outingsProjection: ProjectOutingsResponse
    operationClosureProjection: ProjectOperationClosureResponse
    costsByKgProjection: ProjectCostByKgResponse
    dailyFlowProjection: ProjectDailyFlowResponse
  }
  originalData: {
    productionValues: ProductionValuesResponse
    productionProjection: ProjectProductionResponse
    entriesProjection: ProjectIncomesResponse
    outingsProjection: ProjectOutingsResponse
    operationClosureProjection: ProjectOperationClosureResponse
    costsByKgProjection: ProjectCostByKgResponse
    dailyFlowProjection: ProjectDailyFlowResponse
  }
}
