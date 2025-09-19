import { Alert, Box } from "@mui/material";
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

export function SalesByInvoiceCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [sectionStates, setSectionStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    nfId: parseAsString.withDefault(""),
    salesByInvoiceModalOpen: parseAsBoolean.withDefault(false),
    market: parseAsString.withDefault(MarketEnum.MI),
    priceConsideration: parseAsString.withDefault(
      OrderPriceConsiderationEnum.NONE
    ),
    clientCode: parseAsString.withDefault(""),
    salesRepresentativeCode: parseAsString.withDefault(""),
  });

  const queryFilters = {
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    market: sectionStates.market as MarketEnum,
    companyCodes: sectionStates.companyCodes.join(","),
    priceConsideration:
      sectionStates.priceConsideration as OrderPriceConsiderationEnum,
    clientCode: sectionStates.clientCode,
    salesRepresentativeCode: sectionStates.salesRepresentativeCode,
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
        <SalesTotals data={sales?.salesByInvoice.totals} />
        <ControlledSelect
          size='small'
          sx={{ maxWidth: "250px" }}
          id='clientCode'
          label='Cliente'
          name='clientCode'
          value={sectionStates.clientCode}
          onChange={(value) => setSectionStates({ clientCode: value })}
          options={clients}
        />
        <ControlledSelect
          size='small'
          sx={{ maxWidth: "250px" }}
          id='salesRepresentativeCode'
          label='Representante'
          name='salesRepresentativeCode'
          value={sectionStates.salesRepresentativeCode}
          onChange={(value) =>
            setSectionStates({ salesRepresentativeCode: value })
          }
          options={representatives}
        />
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
