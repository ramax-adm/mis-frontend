import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesDiscountByClientTable } from "../tables/sales-discount-by-client-table";
import { SalesDiscountByClientGraph } from "../graphs/sales-discount-by-client-graph";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { SalesTotals } from "../totals/sales-totals";
import { MarketEnum } from "@/types/sensatta";
import { StorageKeysEnum } from "@/constants/app/storage";
import { usePersistedFilters } from "@/hooks/use-persisted-filters";
import { useFilter } from "@/contexts/persisted-filters";

export function SalesDiscountByClientCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const { filters: companyCodes } = useFilter<string[]>(
    StorageKeysEnum.MONITORING_SALES_COMPANIES_FILTER
  );

  const { filters: market } = useFilter<string>(
    StorageKeysEnum.MONITORING_SALES_MARKET_FILTER
  );

  const { filters: priceConsideration } = useFilter<string>(
    StorageKeysEnum.MONITORING_SALES_PRICE_CONSIDERATION_FILTER
  );

  const { filters: clientCodes } = useFilter<string[]>(
    StorageKeysEnum.MONITORING_SALES_CLIENT_FILTER
  );

  const { filters: representativeCodes } = useFilter<string[]>(
    StorageKeysEnum.MONITORING_SALES_REPRESENTATIVE_FILTER
  );
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

  const salesData = sales?.salesByClient.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Desconto por Cliente'>
      <SalesTotals data={sales?.salesByClient.totals} />

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <SalesDiscountByClientTable
            data={salesData}
            isFetching={isFetching}
          />

          <SalesDiscountByClientGraph
            data={salesData}
            isFetching={isFetching}
          />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
