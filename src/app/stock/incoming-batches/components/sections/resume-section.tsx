import { Grid, Typography } from "@mui/material";
import { StockIncomingBatchesResumeTable } from "../tables/resume-stock-table";
import {
  useGetStockIncomingBatchesProductLinesFilters,
  useGetStockIncomingBatchesResumedData,
} from "@/services/react-query/queries/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";
import { StockIncomingBatchesByCompanyTotals } from "../totals/by-company-totals";
import { StockIncomingBatchesByExpireTotals } from "../totals/by-expire-totals";
import { StockIncomingBatchesTotals } from "../totals/stock-totals";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useEffect } from "react";
import { getIncomingBatchesStoredPageData } from "../../utils/get-stored-page-data";
import { setIncomingBatchesStoredPageData } from "../../utils/set-stored-page-data";

const MARKET_OPTIONS = [
  {
    label: "Ambos",
    key: "",
    value: "",
  },
  {
    label: "ME",
    key: MarketEnum.ME,
    value: MarketEnum.ME,
  },
  {
    label: "MI",
    key: MarketEnum.MI,
    value: MarketEnum.MI,
  },
];

export function StockIncomingBatchesResumeSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    market: parseAsString.withDefault(""),
    productLineCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
  });
  const { data: incomingBatches, isFetching } =
    useGetStockIncomingBatchesResumedData({
      market: sectionStates.market as MarketEnum,
      productLineCodes: sectionStates.productLineCodes
        .map((i) => i.split("-")[0])
        .join(","),
    });

  const { data: productLines } = useGetStockIncomingBatchesProductLinesFilters({
    market: sectionStates.market as MarketEnum,
  });

  const handleSelectMarket = (value: string) =>
    setSectionStates({ market: value });

  const handleSelectProductLines = (values: string[]) => {
    setIncomingBatchesStoredPageData({
      resumeSection: {
        filters: {
          productLineCodes: values,
        },
      },
    });

    setSectionStates({ productLineCodes: values });
  };

  const handleSelectAndDisselectAllProductLines = () => {
    if (!productLines) return;

    const haveSomeSelectedProductLines =
      sectionStates.productLineCodes.length > 0;

    let updatedData: string[] = [];
    if (haveSomeSelectedProductLines) {
      updatedData = [];
    } else {
      updatedData = productLines.map((i) => i.key);
    }

    setIncomingBatchesStoredPageData({
      resumeSection: {
        filters: {
          productLineCodes: updatedData,
        },
      },
    });
    return setSectionStates({
      productLineCodes: updatedData,
    });
  };

  useEffect(() => {
    const storedPageData = getIncomingBatchesStoredPageData();
    setSectionStates({
      productLineCodes: storedPageData.resumeSection.filters.productLineCodes,
    });
  }, []);

  return (
    <>
      <Grid container spacing={1} marginTop={0.5}>
        <Grid item xs={12} sm={2}>
          <Typography fontSize={"12px"} fontWeight={700}>
            Linha de Produto
          </Typography>
          <MultipleSelectInputControlled
            label='Linha'
            size='small'
            value={sectionStates.productLineCodes}
            onChange={handleSelectProductLines}
            options={
              productLines?.map((item) => ({
                key: item.key,
                label: item.label,
                value: item.value,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleSelectAndDisselectAllProductLines}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <RadioInputControlled
            row
            name='market'
            label='Mercado'
            emptyMessage='Sem Opções'
            value={sectionStates.market}
            onChange={
              handleSelectMarket as (value: string | number | Date) => void
            }
            options={MARKET_OPTIONS}
          />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <StockIncomingBatchesTotals data={incomingBatches?.totals} />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <StockIncomingBatchesByCompanyTotals data={incomingBatches?.totals} />
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <StockIncomingBatchesByExpireTotals data={incomingBatches?.totals} />
        </Grid>
      </Grid>
      <Grid container marginTop={1}>
        <Grid xs={12}>
          <StockIncomingBatchesResumeTable
            data={incomingBatches?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
