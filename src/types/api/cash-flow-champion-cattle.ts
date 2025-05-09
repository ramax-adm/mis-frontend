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
