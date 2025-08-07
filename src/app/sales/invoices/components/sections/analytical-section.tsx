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
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { forwardRef, useEffect } from "react";
import { AnalyticalInvoicesTable } from "../tables/analytical-invoices-table";
import { AnalyticalInvoicesTotals } from "../totals/analytical-invoices-totals";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";

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
    cfopCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    nfType: parseAsString.withDefault(""),
    nfNumber: parseAsString.withDefault(""),
    nfSituations: parseAsArrayOf(parseAsString, ",").withDefault([]),
  });

  const handleSelectClient = (value: string) =>
    setSectionStates({ clientCode: value });

  const handleSelectCfop = (value: string[]) =>
    setSectionStates({ cfopCodes: value });

  const handleNfNumber = (value: string | null) =>
    setSectionStates({ nfNumber: value });

  const handleNfSituation = (value: string[]) =>
    setSectionStates({ nfSituations: value });

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
  const { data: situations } = useGetNfSituationsInvoiceFilters({
    companyCode,
    endDate,
    startDate,
  });
  const { data: invoices, isFetching: isFetchingInvoices } =
    useGetAnalyticalInvoices({
      companyCode,
      endDate,
      startDate,
      cfopCodes: sectionStates.cfopCodes.join(","),
      clientCode: sectionStates.clientCode,
      nfNumber: sectionStates.nfNumber,
      nfSituations: sectionStates.nfSituations.join(","),
      nfType: sectionStates.nfType as InvoicesNfTypesEnum,
    });

  const handleSelectAndDisselectAllCfopCodes = () => {
    const cfopCodes = sectionStates.cfopCodes;
    if (!cfopCodes) return;

    const haveSomeSelectedProductLines = cfopCodes?.length > 0;
    if (haveSomeSelectedProductLines) {
      return setSectionStates({ cfopCodes: [] });
    }

    return setSectionStates({ cfopCodes: cfops?.map((i) => i.key) });
  };

  const handleSelectAndDisselectAllNfSituations = () => {
    const nfSituations = sectionStates.nfSituations;
    if (!nfSituations) return;

    const haveSomeSelectedProductLines = nfSituations?.length > 0;
    if (haveSomeSelectedProductLines) {
      return setSectionStates({ nfSituations: [] });
    }

    return setSectionStates({ nfSituations: situations?.map((i) => i.key) });
  };

  // use effect for pre-setting cfop codes
  useEffect(() => {
    if (!sectionStates.cfopCodes || sectionStates.cfopCodes?.length === 0) {
      if (cfops) {
        const allCfopCodes = cfops?.map((i) => i.key);
        setSectionStates({ cfopCodes: allCfopCodes });
      }
    }
  }, [cfops]);

  useEffect(() => {
    if (
      !sectionStates.nfSituations ||
      sectionStates.nfSituations?.length === 0
    ) {
      if (situations) {
        const allNfSituations = situations?.map((i) => i.key);
        setSectionStates({ nfSituations: allNfSituations });
      }
    }
  }, [situations]);

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
            Situação da NF
          </Typography>
          <MultipleSelectInputControlled
            label='Situação NF'
            size='small'
            value={sectionStates.nfSituations}
            onChange={handleNfSituation}
            options={
              situations?.map((item) => ({
                key: item.key,
                label: item.label,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleSelectAndDisselectAllNfSituations}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Typography fontSize={"12px"} fontWeight={700}>
            N° CFOP
          </Typography>
          <MultipleSelectInputControlled
            label='CFOP'
            size='small'
            value={sectionStates.cfopCodes}
            onChange={handleSelectCfop}
            options={
              cfops?.map((item) => ({
                key: item.key,
                label: item.label,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleSelectAndDisselectAllCfopCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
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
