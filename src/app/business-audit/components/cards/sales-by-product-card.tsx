import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByProductGraph } from "../graphs/sales-by-product-graph";
import { SalesByProductTable } from "../tables/sales-by-product-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { useQueryStates, parseAsString } from "nuqs";
import { OrderPriceConsiderationEnum } from "@/types/sales";
import { SalesTotals } from "../totals/sales-totals";

export function SalesByProductCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [sectionStates] = useQueryStates({
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
    priceConsideration:
      sectionStates.priceConsideration as OrderPriceConsiderationEnum,
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
        <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
          <Box sx={{ width: "50%" }}>
            <SalesByProductTable data={salesData} isFetching={isFetching} />
          </Box>

          <Box sx={{ width: "50%" }}>
            <SalesByProductGraph data={salesData} isFetching={isFetching} />
          </Box>
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
