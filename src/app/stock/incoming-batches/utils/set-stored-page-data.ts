import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import { StockIncomingBatchesStoredData } from "../types/stock-incoming-batches-stored-data.type";
import { StorageKeysEnum } from "@/constants/app/storage";
import { assignIn, merge } from "lodash";

export const setIncomingBatchesStoredPageData = (
  override: Partial<StockIncomingBatchesStoredData>
) => {
  const previousStoredData = getFromLocalStorage(
    StorageKeysEnum.STOCK_INCOMING_BATCHES
  );

  const parsedPreviousStoredData = JSON.parse(previousStoredData) as
    | StockIncomingBatchesStoredData
    | undefined;

  const dataToStore = assignIn(parsedPreviousStoredData, override);

  console.log({ parsedPreviousStoredData, dataToStore });
  setToLocalStorage(
    StorageKeysEnum.STOCK_INCOMING_BATCHES,
    JSON.stringify(dataToStore)
  );
};
