import { getFromLocalStorage } from "@/utils/storage.utils";
import { StockIncomingBatchesStoredData } from "../types/stock-incoming-batches-stored-data.type";
import { StorageKeysEnum } from "@/constants/app/storage";
import { assignIn, merge } from "lodash";

export const getIncomingBatchesStoredPageData =
  (): StockIncomingBatchesStoredData => {
    const storedPageData = getFromLocalStorage(
      StorageKeysEnum.STOCK_INCOMING_BATCHES
    );
    const defaultData = {
      resumeSection: {
        filters: {
          productLineCodes: [],
        },
      },
    };

    if (storedPageData === "") {
      return defaultData;
    }

    const parsedStoredPageData = JSON.parse(storedPageData ?? "{}");

    const response = assignIn(defaultData, parsedStoredPageData);
    return response;
  };
