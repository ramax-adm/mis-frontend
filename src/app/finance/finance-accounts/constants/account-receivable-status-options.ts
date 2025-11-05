import { AccountReceivableStatusEnum } from "@/types/finance";

export const ACCOUNT_RECEIVABLE_STATUS_OPTIONS = [
  {
    label: "Todos",
    value: AccountReceivableStatusEnum.TODOS,
    key: AccountReceivableStatusEnum.TODOS,
  },
  {
    label: "A Vencer",
    value: AccountReceivableStatusEnum.A_VENCER,
    key: AccountReceivableStatusEnum.A_VENCER,
  },
  {
    label: "Vencido",
    value: AccountReceivableStatusEnum.VENCIDO,
    key: AccountReceivableStatusEnum.VENCIDO,
  },
];
