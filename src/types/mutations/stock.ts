export interface UseExportStockXlsxRequest {
  stockSelectedTab: 'resumed' | 'analytical'
  selectedCompany?: string
  selectedProductLineAcronyms: { companyCode: string; values: string[] }[]
}
