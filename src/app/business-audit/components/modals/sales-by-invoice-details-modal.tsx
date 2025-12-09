import { ListItemCustom } from "@/components/ListItemCustom";
import { useGetBusinessAuditOrdersLinesData } from "@/services/react-query/queries/business-audit";
import { Box, Divider, Grid, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";
import { LoaderIcon } from "../customized/loader-icon";
import { SalesByInvoiceDetailsTable } from "../tables/sales-by-invoice-details-table";
import { DisplayItem } from "@/components/Info/display-item";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { formatToDate } from "@/utils/formatToDate";

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
  const { data: ordersData = [], isFetching } =
    useGetBusinessAuditOrdersLinesData({
      nfId,
      startDate,
      endDate,
    });

  const formatedBillingDate = ordersData?.[0]?.billingDate
    ? formatToDate(ordersData?.[0]?.billingDate)
    : "";

  const {
    totalNfValue,
    totalQtd,
    totalTableValue,
    totalWeightInKg,
    totalDiscount,
  } = ordersData.reduce(
    (acc, i) => {
      acc.totalQtd += i.quantity ?? 0;
      acc.totalWeightInKg += i.weightInKg ?? 0;
      acc.totalNfValue += i.totalValue ?? 0;
      acc.totalTableValue +=
        (i.referenceTableUnitValue || 0) * (i.weightInKg || 0);
      acc.totalDiscount = acc.totalNfValue - acc.totalTableValue;

      return acc;
    },
    {
      totalQtd: 0,
      totalWeightInKg: 0,
      totalNfValue: 0,
      totalTableValue: 0,
      totalDiscount: 0,
    }
  );

  const percentValue = totalDiscount / (totalTableValue ?? 1);

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
        gap: 1,
      }}
    >
      <Grid container gap={3}>
        <Grid item>
          <DisplayItem title='NF' content={ordersData?.[0].nfNumber} />
        </Grid>
        <Grid item>
          <DisplayItem title='Data' content={formatedBillingDate} />
        </Grid>
        <Grid item>
          <DisplayItem title='N° Pedido' content={ordersData?.[0].orderId} />
        </Grid>
        <Grid item>
          <DisplayItem title='Categoria' content={ordersData?.[0].category} />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Empresa'
            content={`${ordersData?.[0].companyCode} - ${ordersData?.[0].companyName}`}
          />
        </Grid>
        <Grid item>
          <DisplayItem title='Qtd.' content={toLocaleString(totalQtd ?? 0)} />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Peso KG'
            content={toLocaleString(totalWeightInKg ?? 0)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Valor $'
            content={toLocaleString(totalNfValue ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Tabela $'
            content={toLocaleString(totalTableValue ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Dif $'
            content={toLocaleString(totalDiscount ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem title='Dif %' content={toPercent(percentValue)} />
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={4}>
          <DisplayItem
            title='Cliente'
            content={`${ordersData?.[0].clientCode} - ${ordersData?.[0].clientName}`}
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Representante'
            content={`${ordersData?.[0].salesRepresentativeCode} - ${ordersData?.[0].salesRepresentativeName}`}
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='CFOP'
            content={`${ordersData?.[0].cfopCode} - ${ordersData?.[0].cfopDescription}`}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={4}>
          <DisplayItem title='Cidade' content={`${ordersData?.[0].city} `} />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem title='UF' content={`${ordersData?.[0].uf} `} />
        </Grid>
      </Grid>
      <Divider />

      <SalesByInvoiceDetailsTable data={ordersData} isFetching={isFetching} />
    </Box>
  );
}
