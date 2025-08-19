import { ProductLine } from "@/types/api/sensatta";
import {
  GetAllStocksResponse,
  GetAnalyticalAllStocksResponse,
} from "@/types/api/stock";
import { SetStateAction, useEffect } from "react";
import { getFromLocalStorage } from "@/utils/storage.utils";
import { StorageKeysEnum } from "@/constants/app/storage";
import { safeParse } from "@/utils/string.utils";
import { SelectedProductLinesByCompany, StockSettings } from "@/types/stock";

interface UseSetSelectedProductLinesInitialStateRequest {
  data?: GetAllStocksResponse[] | GetAnalyticalAllStocksResponse;
  productLines?: ProductLine[];
  setSelectedProductLinesByCompany: (
    value: SetStateAction<SelectedProductLinesByCompany[]>
  ) => void;
}

export const useSetSelectedProductLinesInitialState = ({
  data,
  productLines,
  setSelectedProductLinesByCompany,
}: UseSetSelectedProductLinesInitialStateRequest) => {
  return useEffect(() => {
    if (!data || !productLines) return;

    const storedSettings = getFromLocalStorage(StorageKeysEnum.STOCK_SETTINGS);
    if (!storedSettings || storedSettings.length === 0) {
      return;
    }

    const parsedSettings = safeParse(storedSettings) as Partial<StockSettings>;
    const filters = parsedSettings?.meProductLineFilters;

    if (filters) {
      return setSelectedProductLinesByCompany(filters);
    }
  }, [data, productLines]);
};
