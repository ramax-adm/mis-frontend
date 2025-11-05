import {
  AccountReceivableStatusEnum,
  AccountReceivableVisualizationEnum,
} from "@/types/finance";

export const ACCOUNT_RECEIVABLE_VISUALIZATION_OPTIONS = [
  {
    label: "Todos",
    value: AccountReceivableVisualizationEnum.TODOS,
    key: AccountReceivableVisualizationEnum.TODOS,
  },
  {
    label: "Valor em aberto",
    value: AccountReceivableVisualizationEnum.VALOR_ABERTO,
    key: AccountReceivableVisualizationEnum.VALOR_ABERTO,
  },
];
