import { ReturnOccurrenceReturnTypeEnum } from "@/types/business-audit";

export const RETURN_TYPE_OPTIONS = [
  {
    label: "Todos",
    key: ReturnOccurrenceReturnTypeEnum.NONE,
    value: ReturnOccurrenceReturnTypeEnum.NONE,
  },
  {
    label: "Integral",
    key: ReturnOccurrenceReturnTypeEnum.FULL,
    value: ReturnOccurrenceReturnTypeEnum.FULL,
  },
  {
    label: "Parcial",
    key: ReturnOccurrenceReturnTypeEnum.PARTIAL,
    value: ReturnOccurrenceReturnTypeEnum.PARTIAL,
  },
];
