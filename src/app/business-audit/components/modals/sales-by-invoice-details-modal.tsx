import { ListItemCustom } from "@/components/ListItemCustom";
import { useGetBusinessAuditOrdersLinesData } from "@/services/react-query/queries/business-audit";
import { Box, Grid, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";
import { LoaderIcon } from "../customized/loader-icon";
import { SalesByInvoiceDetailsTable } from "../tables/sales-by-invoice-details-table";
import { DisplayItem } from "@/components/Info/display-item";
import { toLocaleString } from "@/utils/string.utils";

interface SalesByInvoiceDetailsModalProps {
  onClose: () => void;
  startDate: string;
  endDate: string;
  nfId: string;
}
export function SalesByInvoiceDetailsModal({
  onClose,
  nfId,
  startDate,
  endDate,
}: SalesByInvoiceDetailsModalProps) {
  const { data: ordersData, isFetching } = useGetBusinessAuditOrdersLinesData({
    nfId,
    startDate,
    endDate,
  });

  const totalQtd = ordersData?.reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );

  const totalWeightInKg = ordersData?.reduce(
    (acc, item) => acc + (item.weightInKg ?? 0),
    0
  );

  const totalNfValue = ordersData?.reduce(
    (acc, item) => acc + (item.totalValue ?? 0),
    0
  );

  const totalTableValue = ordersData?.reduce(
    (acc, item) =>
      acc + (item.referenceTableUnitValue || 0) * (item.weightInKg || 0),
    0
  );

  const totalDiscount = (totalNfValue ?? 0) - (totalTableValue ?? 0);

  if (isFetching) {
    return (
      <Box sx={{ height: "300px", display: "grid", placeItems: "center" }}>
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container gap={2} marginBottom={1}>
        <Grid item xs={3} md={1}>
          <DisplayItem title='NF' content={ordersData?.[0].nfNumber} />
        </Grid>
        <Grid item xs={3} md={1}>
          <DisplayItem
            title='Situação NF'
            content={ordersData?.[0].situation}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <DisplayItem title='Qtd.' content={toLocaleString(totalQtd ?? 0)} />
        </Grid>
        <Grid item xs={3} md={1}>
          <DisplayItem
            title='Valor $'
            content={toLocaleString(totalNfValue ?? 0, 2)}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <DisplayItem
            title='Tabela $'
            content={toLocaleString(totalTableValue ?? 0, 2)}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <DisplayItem
            title='Dif $'
            content={toLocaleString(totalDiscount, 2)}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <DisplayItem
            title='CFOP'
            content={`${ordersData?.[0].cfopCode} - ${ordersData?.[0].cfopDescription}`}
          />
        </Grid>
      </Grid>
      <SalesByInvoiceDetailsTable data={ordersData} isFetching={isFetching} />
    </Box>
  );
}
