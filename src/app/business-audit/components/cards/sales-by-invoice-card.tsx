import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { SalesByInvoiceTable } from "../tables/sales-by-invoice-table";
import { SalesTotals } from "../totals/sales-totals";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import {
  useQueryStates,
  parseAsString,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import { MarketEnum } from "@/types/sensatta";

export function SalesByInvoiceCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [sectionStates, setSectionStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    nfNumber: parseAsString.withDefault(""),
    salesByInvoiceModalOpen: parseAsBoolean.withDefault(false),
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

  const salesData = sales?.salesByInvoice.data ?? {};
  const haveSomeData = Object.values(salesData).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Vendas por Nota Fiscal'>
      <SalesTotals data={sales?.salesByInvoice.totals} />

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
