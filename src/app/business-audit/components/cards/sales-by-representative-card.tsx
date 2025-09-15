import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByProductGraph } from "../graphs/sales-by-product-graph";
import { SalesByProductTable } from "../tables/sales-by-product-table";
import { SalesByClientTable } from "../tables/sales-by-client-table";
import { SalesByClientGraph } from "../graphs/sales-by-client-graph";
import { SalesByRepresentativeGraph } from "../graphs/sales-by-representative-graph";
import { SalesByRepresentativeTable } from "../tables/sales-by-representative-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { SalesTotals } from "../totals/sales-totals";
import { MarketEnum } from "@/types/sensatta";

export function SalesByRepresentativeCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [sectionStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    market: parseAsString.withDefault(MarketEnum.BOTH),
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

  const salesData = sales?.salesByRepresentative.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Vendas por Representante'>
      <SalesTotals data={sales?.salesByRepresentative.totals} />

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
          <Box sx={{ width: "50%" }}>
            <SalesByRepresentativeTable
              data={salesData}
              isFetching={isFetching}
            />
          </Box>

          <Box sx={{ width: "50%" }}>
            <SalesByRepresentativeGraph
              data={salesData}
              isFetching={isFetching}
            />
          </Box>
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
