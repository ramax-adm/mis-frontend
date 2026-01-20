import { ListItemCustom } from "@/components/ListItemCustom";
import {
  useGetBusinessAuditOrdersLinesData,
  useGetOneBusinessAuditReturnOccurrence,
} from "@/services/react-query/queries/business-audit";
import { Box, Divider, Grid, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";
import { DisplayItem } from "@/components/Info/display-item";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { formatToDate } from "@/utils/formatToDate";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { useGetOrderLine } from "@/services/react-query/queries/sales";
import { ReturnOccurrencesByItemDetailsTable } from "../tables/return-occurrences-by-item-details-table";

interface ReturnOccurrenceDetailsModalProps {
  onClose: () => void;
  occurrenceNumber: string;
}
export function ReturnOccurrenceDetailsModal({
  onClose,
  occurrenceNumber,
}: ReturnOccurrenceDetailsModalProps) {
  const { data: returnOccurrencesData = [], isFetching } =
    useGetOneBusinessAuditReturnOccurrence({
      occurrenceNumber,
    });

  const formatedBillingDate = returnOccurrencesData?.[0]?.invoiceDate
    ? formatToDate(returnOccurrencesData?.[0]?.invoiceDate)
    : "";
  const formatedReturnDate = returnOccurrencesData?.[0]?.date
    ? formatToDate(returnOccurrencesData?.[0]?.date)
    : "";

  const {
    totalNfQtd,
    totalReturnQtd,
    totalNfValue,
    totalReturnValue,
    totalNfWeightInKg,
    totalReturnWeightInKg,
  } = returnOccurrencesData.reduce(
    (acc, i) => {
      acc.totalNfQtd += i.invoiceQuantity ?? 0;
      acc.totalReturnQtd += i.returnQuantity ?? 0;
      acc.totalNfValue += i.invoiceValue ?? 0;
      acc.totalReturnValue += i.returnValue ?? 0;
      acc.totalNfWeightInKg += i.invoiceWeightInKg ?? 0;
      acc.totalReturnWeightInKg += i.returnWeightInKg ?? 0;

      return acc;
    },
    {
      totalNfQtd: 0,
      totalReturnQtd: 0,
      totalNfValue: 0,
      totalReturnValue: 0,
      totalNfWeightInKg: 0,
      totalReturnWeightInKg: 0,
    }
  );

  const totalDiscount = totalNfValue - totalReturnValue;
  const percentValue = totalNfValue > 0 ? totalDiscount / totalNfValue : 0;

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
            title='N° B.O'
            content={returnOccurrencesData?.[0].occurrenceNumber}
          />
        </Grid>
        <Grid item>
          <DisplayItem title='Data Fat' content={formatedBillingDate} />
        </Grid>
        <Grid item>
          <DisplayItem title='Data Dev.' content={formatedReturnDate} />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Tipo Dev.'
            content={`${returnOccurrencesData?.[0].returnType} `}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Empresa'
            content={`${returnOccurrencesData?.[0].companyCode} - ${returnOccurrencesData?.[0].companyName}`}
          />
        </Grid>

        <Grid item>
          <DisplayItem
            title='Qtd. fat.'
            content={toLocaleString(totalNfQtd ?? 0)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Qtd. dev.'
            content={toLocaleString(totalReturnQtd ?? 0)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='KG Fat.'
            content={toLocaleString(totalNfWeightInKg ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='KG Dev.'
            content={toLocaleString(totalReturnWeightInKg ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Valor $ Fat.'
            content={toLocaleString(totalNfValue ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem
            title='Valor $ Dev.'
            content={toLocaleString(totalReturnValue ?? 0, 2)}
          />
        </Grid>
        {/* <Grid item>
          <DisplayItem
            title='Dif $'
            content={toLocaleString(totalDiscount ?? 0, 2)}
          />
        </Grid>
        <Grid item>
          <DisplayItem title='Dif %' content={toPercent(percentValue)} />
        </Grid> */}
      </Grid>
      <Divider />
      <Grid container>
        <Grid item xs={4}>
          <DisplayItem
            title='Cliente'
            content={`${returnOccurrencesData?.[0].clientCode} - ${returnOccurrencesData?.[0].clientName}`}
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Representante'
            content={`${returnOccurrencesData?.[0].salesRepresentativeCode} - ${returnOccurrencesData?.[0].salesRepresentativeName}`}
          />
        </Grid>
      </Grid>
      <Divider />

      <ReturnOccurrencesByItemDetailsTable
        data={returnOccurrencesData}
        isFetching={isFetching}
      />
    </Box>
  );
}
