import { StorageKeysEnum } from "@/constants/app/storage";
import { SelectedProductLinesByCompany, StockSettings } from "@/types/stock";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import { safeParse, stringify } from "@/utils/string.utils";

export function storeStockProductLineFilters(
  value: SelectedProductLinesByCompany[]
) {
  const previousStoredSettings = getFromLocalStorage(
    StorageKeysEnum.STOCK_SETTINGS
  );
  const previousSettings = safeParse(previousStoredSettings) as StockSettings;

  const updatedSettings: StockSettings = {
    ...previousSettings,
    productLineFilters: value,
  };

  setToLocalStorage(StorageKeysEnum.STOCK_SETTINGS, stringify(updatedSettings));
}
