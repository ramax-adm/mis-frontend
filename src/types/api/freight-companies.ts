export interface GetFreightCompaniesResponseItem {
  sensattaCode: string;
  name: string;
  cnpj: string;
  stateSubscription: string;
  city: string;
  uf: string;
  rnrtcCode: string;
  resultStatus: string;
  verifiedAt: Date;
}

export interface GetFreightCompanyAnttConsultationResponse {
  freightCompany: {
    sensattaCode: string;
    name: string;
    cnpj: string;
    rnrtcCode: string;
    rnrtcStatus: string;
    registeredAt: Date;
    location: string;
    resultStatus: string;
    resultDescription: string;
    resultObservation: string;
    verifiedAt: Date;
  };
  kpis: {
    quantityStatusOk: number;
    quantityStatusError: number;
    statusByDay: Record<string, string>;
  };
}
