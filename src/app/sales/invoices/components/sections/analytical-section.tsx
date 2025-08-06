import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import {
  useGetAnalyticalInvoices,
  useGetCfopsInvoiceFilters,
  useGetClientsInvoiceFilters,
  useGetNfSituationsInvoiceFilters,
} from "@/services/react-query/queries/sales";
import { InvoicesNfTypesEnum } from "@/types/sales";
import { Grid, Typography } from "@mui/material";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { forwardRef } from "react";
import { AnalyticalInvoicesTable } from "../tables/analytical-invoices-table";
import { AnalyticalInvoicesTotals } from "../totals/analytical-invoices-totals";

const NF_TYPES = [
  {
    label: "Todas",
    key: "",
    value: "",
  },
  {
    label: "Com Leitor",
    key: InvoicesNfTypesEnum.COM_LEITOR,
    value: InvoicesNfTypesEnum.COM_LEITOR,
  },
  {
    label: "Avulsa",
    key: InvoicesNfTypesEnum.AVULSA,
    value: InvoicesNfTypesEnum.AVULSA,
  },
];

export interface InvoicesAnalyticalSectionRef {}

interface InvoicesAnalyticalSectionProps {
  companyCode: string;
  startDate: string;
  endDate: string;
}
export const InvoicesAnalyticalSection = forwardRef<
  InvoicesAnalyticalSectionRef,
  InvoicesAnalyticalSectionProps
>(({ companyCode, startDate, endDate }, ref) => {
  const [sectionStates, setSectionStates] = useQueryStates({
    clientCode: parseAsString.withDefault(""),
    cfopCode: parseAsString.withDefault(""),
    nfType: parseAsString.withDefault(""),
    nfNumber: parseAsString.withDefault(""),
    nfSituation: parseAsString.withDefault(""),
  });

  const handleSelectClient = (value: string) =>
    setSectionStates({ clientCode: value });

  const handleSelectCfop = (value: string) =>
    setSectionStates({ cfopCode: value });

  const handleNfNumber = (value: string | null) =>
    setSectionStates({ nfNumber: value });

  const handleNfSituation = (value: string) =>
    setSectionStates({ nfSituation: value });

  const handleNfType = (value: string) => setSectionStates({ nfType: value });

  // buscar clientes
  const { data: cfops } = useGetCfopsInvoiceFilters({
    companyCode,
    endDate,
    startDate,
  });
  const { data: clients } = useGetClientsInvoiceFilters({
    companyCode,
    endDate,
    startDate,
  });
  const { data: nfSituations } = useGetNfSituationsInvoiceFilters({
    companyCode,
    endDate,
    startDate,
  });
  const { data: invoices, isFetching: isFetchingInvoices } =
    useGetAnalyticalInvoices({
      companyCode,
      endDate,
      startDate,
      cfopCode: sectionStates.cfopCode,
      clientCode: sectionStates.clientCode,
      nfNumber: sectionStates.nfNumber,
      nfSituation: sectionStates.nfSituation,
      nfType: sectionStates.nfType as InvoicesNfTypesEnum,
    });

  return (
    <>
      {isFetchingInvoices && <LoadingOverlay />}
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={6} sm={2}>
          {/**fontSize: "12px",
          color: "#000",
          fontWeight: 700, */}
          <Typography fontSize={"12px"} fontWeight={700}>
            Cliente
          </Typography>
          <ControlledSelect
            id='clientCode'
            label='Cliente'
            name='clientCode'
            size='small'
            value={sectionStates.clientCode}
            onChange={handleSelectClient}
            options={clients}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <Typography fontSize={"12px"} fontWeight={700}>
            N° CFOP
          </Typography>
          <ControlledSelect
            id='cfopCode'
            label='CFOP'
            name='cfopCode'
            size='small'
            value={sectionStates.cfopCode}
            onChange={handleSelectCfop}
            options={cfops}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography fontSize={"12px"} fontWeight={700}>
            Situação da NF
          </Typography>
          <ControlledSelect
            id='nfSituationCode'
            label='Situação NF'
            name='nfSituationCode'
            size='small'
            value={sectionStates.nfSituation}
            onChange={handleNfSituation}
            options={nfSituations}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <Typography fontSize={"12px"} fontWeight={700}>
            N° NF
          </Typography>
          <TextInputControlled
            label='N° NF'
            size='small'
            value={sectionStates.nfNumber}
            setValue={handleNfNumber}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <RadioInputControlled
            emptyMessage='Sem opções'
            label='Tipo NF'
            name='nfType'
            value={sectionStates.nfType}
            onChange={handleNfType as (value: string | number | Date) => void}
            options={NF_TYPES}
          />
        </Grid>
      </Grid>

      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <AnalyticalInvoicesTotals data={invoices?.totals} />
        </Grid>
      </Grid>
      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <AnalyticalInvoicesTable data={invoices?.data} />
        </Grid>
      </Grid>
    </>
  );
});
InvoicesAnalyticalSection.displayName = "InvoicesAnalyticalSection";
