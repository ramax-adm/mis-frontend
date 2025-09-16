import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByProductGraph } from "../graphs/sales-by-product-graph";
import { SalesByProductTable } from "../tables/sales-by-product-table";
import { SalesByClientTable } from "../tables/sales-by-client-table";
import { SalesByClientGraph } from "../graphs/sales-by-client-graph";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { SalesTotals } from "../totals/sales-totals";
import { MarketEnum } from "@/types/sensatta";

export function SalesByClientCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [sectionStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    market: parseAsString.withDefault(""),
    priceConsideration: parseAsString.withDefault(
      OrderPriceConsiderationEnum.NONE
    ),
  });

  const {
    data: sales,
    isFetching,
    error,
  } = useGetBusinessAuditSalesData({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    market: sectionStates.market as MarketEnum,
    companyCodes: sectionStates.companyCodes.join(","),
    priceConsideration:
      sectionStates.priceConsideration as OrderPriceConsiderationEnum,
  });

  const salesData = sales?.salesByClient.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Vendas por Cliente'>
      <SalesTotals data={sales?.salesByClient.totals} />

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <SalesByClientTable data={salesData} isFetching={isFetching} />

          <SalesByClientGraph data={salesData} isFetching={isFetching} />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
