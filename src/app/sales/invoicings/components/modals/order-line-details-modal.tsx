import { ListItemCustom } from "@/components/ListItemCustom";
import { useGetBusinessAuditOrdersLinesData } from "@/services/react-query/queries/business-audit";
import { Box, Divider, Grid, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";
import { DisplayItem } from "@/components/Info/display-item";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { formatToDate } from "@/utils/formatToDate";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { useGetOrderLine } from "@/services/react-query/queries/sales";
import { OrderLinesDetailsTable } from "../tables/order-line-table";

interface OrderLinesDetailsModalProps {
  onClose: () => void;
  orderId: string;
}
export function OrderLinesDetailsModal({
  onClose,
  orderId,
}: OrderLinesDetailsModalProps) {
  const { data: orderLinesData = [], isFetching } = useGetOrderLine({
    orderId,
  });

  const formatedBillingDate = orderLinesData?.[0]?.billingDate
    ? formatToDate(orderLinesData?.[0]?.billingDate)
    : "";

  const {
    totalNfValue,
    totalQtd,
    totalTableValue,
    totalWeightInKg,
    totalDiscount,
  } = orderLinesData.reduce(
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
          <DisplayItem
            title='N° Pedido'
            content={orderLinesData?.[0].orderId}
          />
        </Grid>
        <Grid item>
          <DisplayItem title='Data' content={formatedBillingDate} />
        </Grid>
        <Grid item>
          <DisplayItem title='NF' content={orderLinesData?.[0].nfNumber} />
        </Grid>

        <Grid item>
          <DisplayItem
            title='Empresa'
            content={`${orderLinesData?.[0].companyCode} - ${orderLinesData?.[0].companyName}`}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Qtd. itens'
            content={toLocaleString(totalQtd ?? 0)}
          />
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
            title='Categoria'
            content={orderLinesData?.[0].category}
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Cliente'
            content={`${orderLinesData?.[0].clientCode} - ${orderLinesData?.[0].clientName}`}
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Representante'
            content={`${orderLinesData?.[0].salesRepresentativeCode} - ${orderLinesData?.[0].salesRepresentativeName}`}
          />
        </Grid>
      </Grid>
      <Divider />

      <OrderLinesDetailsTable data={orderLinesData} isFetching={isFetching} />
    </Box>
  );
}
