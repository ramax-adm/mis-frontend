import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByProductGraph } from "../graphs/sales-by-product-graph";
import { SalesByProductTable } from "../tables/sales-by-product-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { SalesTotals } from "../totals/sales-totals";
import { MarketEnum } from "@/types/sensatta";
import { StorageKeysEnum } from "@/constants/app/storage";
import { usePersistedFilters } from "@/hooks/use-persisted-filters";
import { useFilter } from "@/contexts/persisted-filters";

export function SalesByProductCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
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
  const {
    data: sales,
    isFetching,
    error,
  } = useGetBusinessAuditSalesData({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    market: market as MarketEnum,
    companyCodes: companyCodes.join(","),
    priceConsideration: priceConsideration as OrderPriceConsiderationEnum,
    clientCodes: clientCodes.join(","),
    salesRepresentativeCodes: representativeCodes.join(","),
  });

  const salesData = sales?.salesByProduct.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Vendas por Produto'>
      <SalesTotals data={sales?.salesByProduct.totals} />

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <SalesByProductTable data={salesData} isFetching={isFetching} />

          <SalesByProductGraph data={salesData} isFetching={isFetching} />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
