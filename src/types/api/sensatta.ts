export interface GetProductClassificationTypesResponse {
  label: string;
  key: string;
}

export interface Company {
  id: string;
  sensattaCode: string;
  city: string;
  uf: string;
  name: string;
  fantasyName: string;
  isConsideredOnStock: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  sensattaId: string;
  sensattaCode: string;
  name: string;
  productLineId: string;
  unitCode: string;
  classificationType: string;
  createdAt: Date;
}

export interface ProductLine {
  id: string;
  sensattaId: string; // sequencial linha
  sensattaCode: string; // codigo linha
  name: string; // descricao
  acronym: string; // sigla
  isConsideredOnStock: boolean;
  market: string;
  createdAt: Date;
}
