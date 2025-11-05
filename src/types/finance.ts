export type AccountReceivableItem = {
  id: string;
  baseDate?: Date;
  sensattaId?: string;
  key?: string;
  companyCode?: string;
  companyName?: string;
  receivableNumber?: string;
  issueDate?: Date;
  dueDate?: Date;
  recognitionDate?: Date;
  lossRecognitionDate?: Date;
  status?: string;
  differenceInDays?: number;
  bucketSituation?: string;
  clientCode?: string;
  clientName?: string;
  salesRepresentativeCode?: string;
  salesRepresentativeName?: string;
  nfId?: string;
  nfNumber?: string;
  cfopCode?: string;
  cfopDescription?: string;
  accountingAccount?: string;
  accountingClassification?: string;
  accountingAccountName?: string;
  personType?: string;
  currency?: string;
  value?: number;
  openValue?: number;
  sensattaCreatedBy?: string;
  sensattaApprovedBy?: string;
  observation?: string;
  createdAt: Date;
};

export enum AccountReceivableStatusEnum {
  TODOS = "",
  VENCIDO = "VENCIDO",
  A_VENCER = "A VENCER",
}

export enum AccountReceivableVisualizationEnum {
  TODOS = "",
  VALOR_ABERTO = "valor-aberto",
}

export enum AccountReceivableBucketSituationEnum {
  A_VENCER_0_30 = "A_VENCER_0_30",
  A_VENCER_31_60 = "A_VENCER_31_60",
  A_VENCER_61_90 = "A_VENCER_61_90",
  A_VENCER_91_180 = "A_VENCER_91_180",
  A_VENCER_181_360 = "A_VENCER_181_360",
  A_VENCER_MAIOR_360 = "A_VENCER_MAIOR_360",
  VENCIDOS_0_30 = "VENCIDOS_0_30",
  VENCIDOS_31_60 = "VENCIDOS_31_60",
  VENCIDOS_61_90 = "VENCIDOS_61_90",
  VENCIDOS_91_180 = "VENCIDOS_91_180",
  VENCIDOS_181_360 = "VENCIDOS_181_360",
  VENCIDOS_MAIOR_360 = "VENCIDOS_MAIOR_360",
}
