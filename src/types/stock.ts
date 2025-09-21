export type SelectedProductLinesByCompany = {
  companyCode: string;
  values: string[];
};

export type StockSettings = {
  productLineFilters: SelectedProductLinesByCompany[];
  meProductLineFilters: SelectedProductLinesByCompany[];
};

export enum StockMarket {
  ME = "external",
  MI = "internal",
}
