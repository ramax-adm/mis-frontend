export type SelectedProductLinesByCompany = { companyCode: string; values: string[] }

export type StockSettings = {
  productLineFilters: SelectedProductLinesByCompany[]
}
