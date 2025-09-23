import { Alert, Box, Typography } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByInvoiceTable } from "../tables/sales-by-invoice-table";
import { SalesTotals } from "../totals/sales-totals";
import {
  useGetBusinessAuditSalesClientFilters,
  useGetBusinessAuditSalesData,
  useGetBusinessAuditSalesRepresentativeFilters,
} from "@/services/react-query/queries/business-audit";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import {
  useQueryStates,
  parseAsString,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import { MarketEnum } from "@/types/sensatta";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { StorageKeysEnum } from "@/constants/app/storage";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";
import { usePersistedFilters } from "@/hooks/use-persisted-filters";
import { useFilter } from "@/contexts/persisted-filters";

/**
 * Nesta pagina em especial, usamos o persisted filters, que se comunica
 * com o local storage, por conta da quantidade de filtros em client e representative > 2000. (dessa forma o URL state nao funciona)
 *
 * Dai o padrão adotado aqui é o PERSISTED FILTERS
 */

export function SalesByInvoiceCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [, setSectionStates] = useQueryStates({
    nfId: parseAsString.withDefault(""),
    salesByInvoiceModalOpen: parseAsBoolean.withDefault(false),
  });

  const { filters: companyCodes, setFilters: setCompanyCodes } = useFilter<
    string[]
  >(StorageKeysEnum.MONITORING_SALES_COMPANIES_FILTER);

  const { filters: market, setFilters: setMarket } = useFilter<string>(
    StorageKeysEnum.MONITORING_SALES_MARKET_FILTER
  );

  const { filters: priceConsideration, setFilters: setPriceConsideration } =
    useFilter<string>(
      StorageKeysEnum.MONITORING_SALES_PRICE_CONSIDERATION_FILTER
    );

  const { filters: clientCodes, setFilters: setClientCodes } = useFilter<
    string[]
  >(StorageKeysEnum.MONITORING_SALES_CLIENT_FILTER);

  const { filters: representativeCodes, setFilters: setRepresentativeCodes } =
    useFilter<string[]>(StorageKeysEnum.MONITORING_SALES_REPRESENTATIVE_FILTER);

  const queryFilters = {
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    market: market as MarketEnum,
    companyCodes: companyCodes.join(","),
    priceConsideration: priceConsideration as OrderPriceConsiderationEnum,
    clientCodes: clientCodes.join(","),
    salesRepresentativeCodes: representativeCodes.join(","),
  };

  const handleToogleClientCodes = () => {
    if (!clientCodes) return;

    const haveSomeSelectedClientCodes = clientCodes?.length > 0;
    if (haveSomeSelectedClientCodes) {
      return setClientCodes([]);
    }

    return setClientCodes(clients?.map((i) => i.value) ?? []);
  };

  const handleToogleRepresentativeCodes = () => {
    if (!representativeCodes) return;

    const haveSomeSelectedRepresentatives = representativeCodes?.length > 0;
    if (haveSomeSelectedRepresentatives) {
      return setRepresentativeCodes([]);
    }

    return setRepresentativeCodes(representatives?.map((i) => i.value) ?? []);
  };
  const {
    data: sales,
    isFetching,
    error,
  } = useGetBusinessAuditSalesData(queryFilters);

  const { data: clients } = useGetBusinessAuditSalesClientFilters(queryFilters);
  const { data: representatives } =
    useGetBusinessAuditSalesRepresentativeFilters(queryFilters);

  const salesData = sales?.salesByInvoice.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Vendas por Nota Fiscal'>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 1,
        }}
      >
        <Box sx={{ width: "450px" }}>
          <SalesTotals data={sales?.salesByInvoice.totals} />
        </Box>
        <Box sx={{ width: "250px" }}>
          <MultipleSelectInputControlled
            size='small'
            label='Cliente'
            value={clientCodes}
            onChange={(value) => setClientCodes(value)}
            options={
              clients?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
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
            onClick={handleToogleClientCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Box>
        <Box sx={{ width: "250px" }}>
          <MultipleSelectInputControlled
            size='small'
            label='Representante'
            value={representativeCodes}
            onChange={(value) => setRepresentativeCodes(value)}
            options={
              representatives?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
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
            onClick={handleToogleRepresentativeCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Box>
      </Box>

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <SalesByInvoiceTable
          data={salesData}
          isFetching={isFetching}
          setSectionStates={setSectionStates}
        />
      )}
    </BusinessAuditCustomizedCard>
  );
}
