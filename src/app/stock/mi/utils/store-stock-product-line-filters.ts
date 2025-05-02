import { STORAGE_KEYS } from '@/constants/app/storage'
import { SelectedProductLinesByCompany, StockSettings } from '@/types/stock'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage.utils'
import { safeParse, stringify } from '@/utils/string.utils'

export function storeStockProductLineFilters(value: SelectedProductLinesByCompany[]) {
  const previousStoredSettings = getFromLocalStorage(STORAGE_KEYS.STOCK_SETTINGS)
  const previousSettings = safeParse(previousStoredSettings) as StockSettings

  const updatedSettings: StockSettings = {
    ...previousSettings,
    productLineFilters: value,
  }

  setToLocalStorage(STORAGE_KEYS.STOCK_SETTINGS, stringify(updatedSettings))
}
