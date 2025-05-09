import {
  RawMaterialControls,
  Operation,
  MiControls,
  MeControls,
  MePrices,
  MiPrices,
  MeIncomes,
  MiIncomes,
  ProjectionControls,
} from '../cash-flow-champion-cattle'

export interface UseSimulateCashFlowRequest {
  projecaoValores: ProjectionControls
  matPrimaValores: RawMaterialControls
  operacaoValores: Operation
  miValores: MiControls
  meValores: MeControls
  rendimentosMe: MeIncomes
  rendimentosMi: MiIncomes
  precosMe: MePrices
  precosMi: MiPrices
}

export interface UseSaveUserSimulationRequest {
  projecaoValores?: ProjectionControls
  matPrimaValores?: RawMaterialControls
  operacaoValores?: Operation
  miValores?: MiControls
  meValores?: MeControls
  rendimentosMe?: MeIncomes
  rendimentosMi?: MiIncomes
  precosMe?: MePrices
  precosMi?: MiPrices
}

export interface UseExportCashFlowSimulationRequest {
  projecaoValores: ProjectionControls
  matPrimaValores: RawMaterialControls
  operacaoValores: Operation
  miValores: MiControls
  meValores: MeControls
  rendimentosMe: MeIncomes
  rendimentosMi: MiIncomes
  precosMe: MePrices
  precosMi: MiPrices
}
