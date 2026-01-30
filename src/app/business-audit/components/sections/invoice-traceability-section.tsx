import { Grid, Typography } from "@mui/material";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { InvoiceTraceabilityKpisTotals } from "../totals/invoice-traceability-kpis-totals";
import {
  useGetBusinessAuditInvoiceTraceabilityData,
  useGetBusinessAuditSalesClientFilters,
  useGetBusinessAuditSalesRepresentativeFilters,
} from "@/services/react-query/queries/business-audit";
import { useAllFilters } from "@/contexts/persisted-filters";
import { StorageKeysEnum } from "@/constants/app/storage";
import { InvoiceTraceabilityReInvoicingsTotals } from "../totals/invoice-traceability-re-invoicings-totals";
import { InvoiceTraceabilityTotals } from "../totals/invoice-traceability-totals";
import { InvoiceTraceabilitySalesByCompanyTable } from "../tables/invoice-traceability-sales-by-company-table";
import { InvoiceTraceabilitySalesByCompanyCard } from "../cards/invoice-traceability-sales-by-company-card";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";
import { InvoiceTraceabilityReInvoicingTraceabilityTable } from "../tables/invoice-traceability-re-invoicing-traceability-table";
import { InvoiceTraceabilityReInvoicingTraceabilityCard } from "../cards/invoice-traceability-re-invoicing-traceability-card";
import { InvoiceTraceabilitySalesByInvoiceCard } from "../cards/invoice-traceability-sales-by-invoice-card";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { InvoiceTraceabilityReinvoicingsByInvoiceCard } from "../cards/invoice-traceability-reinvoicings-by-invoice-card";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { SalesByInvoiceDetailsModal } from "../modals/sales-by-invoice-details-modal";

enum InvoicesVisualizationEnum {
  BY_SALE = "by-sale",
  BY_REINVOICING = "by-reinvoicing",
}

const INVOICES_VISUALIZATION_OPTIONS = [
  {
    label: "P/ Venda",
    key: InvoicesVisualizationEnum.BY_SALE,
    value: InvoicesVisualizationEnum.BY_SALE,
  },
  // {
  //   label: "P/ Refaturamento",
  //   key: InvoicesVisualizationEnum.BY_REINVOICING,
  //   value: InvoicesVisualizationEnum.BY_REINVOICING,
  // },
];

export function BusinessAuditInvoiceTraceabilitySection() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0],
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });
  const [sectionStates, setSectionStates] = useQueryStates({
    invoicesVisualization: parseAsString.withDefault(
      InvoicesVisualizationEnum.BY_SALE,
    ),
    invoiceTraceabilityInvoiceDetailsModalOpen:
      parseAsBoolean.withDefault(false),
    invoiceTraceabilityNfId: parseAsString.withDefault(""),
  });

  const {
    // return occurrences
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_COMPANIES_FILTER]: {
      filters: companyCodes,
    },
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_CLIENT_FILTER]: {
      filters: clientCodes,
      setFilters: setClientCodes,
    },
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_REPRESENTATIVE_FILTER]: {
      filters: representativeCodes,
      setFilters: setRepresentativeCodes,
    },
  } = useAllFilters();

  const handleToogleClientCodes = () => {
    if (!clientCodes) return;

    const haveSomeSelectedClientCodes = clientCodes?.length > 0;
    if (haveSomeSelectedClientCodes) {
      return setClientCodes([]);
    }

    return setClientCodes(clients?.map((i) => i.value) ?? []);
  };
  const handleToogleRepresentativeCodes = () => {
    if (!representativeCodes) return;

    const haveSomeSelectedRepresentatives = representativeCodes?.length > 0;
    if (haveSomeSelectedRepresentatives) {
      return setRepresentativeCodes([]);
    }

    return setRepresentativeCodes(representatives?.map((i) => i.value) ?? []);
  };

  const { data, isFetching } = useGetBusinessAuditInvoiceTraceabilityData({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    clientCodes: clientCodes?.join(","),
    companyCodes: companyCodes?.join(","),
    representativeCodes: representativeCodes?.join(","),
  });

  const { data: clients } = useGetBusinessAuditSalesClientFilters({});
  const { data: representatives } =
    useGetBusinessAuditSalesRepresentativeFilters({});

  const handleCloseSalesByInvoiceModal = () =>
    setSectionStates({
      invoiceTraceabilityInvoiceDetailsModalOpen: false,
      invoiceTraceabilityNfId: "",
    });

  return (
    <>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid
          item
          xs={12}
          sm={2}
          marginTop={{
            xs: 0,
            sm: 2,
          }}
        >
          <MultipleSelectInputControlled
            size='small'
            label='Cliente'
            value={clientCodes}
            onChange={(value) => setClientCodes(value)}
            options={
              clients?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
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
            onClick={handleToogleClientCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          marginTop={{
            xs: 0,
            sm: 2,
          }}
        >
          <MultipleSelectInputControlled
            size='small'
            label='Representante'
            value={representativeCodes}
            onChange={(value) => setRepresentativeCodes(value)}
            options={
              representatives?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
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
            onClick={handleToogleRepresentativeCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid item>
          <RadioInputControlled
            row
            name='invoicesVisualization'
            label='Visualização notas fiscais'
            emptyMessage='Sem Opções'
            value={sectionStates.invoicesVisualization}
            onChange={(v) =>
              setSectionStates({ invoicesVisualization: v as string })
            }
            options={INVOICES_VISUALIZATION_OPTIONS}
          />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        {/**
         * SECTION PARA OS KPIS
         * TOTAIS
         */}
        <Grid item xs={12} md={3.5}>
          <InvoiceTraceabilityKpisTotals data={data?.kpis} />
          <InvoiceTraceabilityReInvoicingsTotals
            data={data?.reInvoicingsTotals}
          />
          <InvoiceTraceabilityTotals data={data?.totals} />
        </Grid>
        {/**
         * P/ empresa
         */}
        <Grid item xs={12} md={4.25}>
          <InvoiceTraceabilitySalesByCompanyCard />
        </Grid>
        <Grid item xs={12} md={4.25}>
          {sectionStates.invoicesVisualization ===
            InvoicesVisualizationEnum.BY_SALE && (
            <InvoiceTraceabilitySalesByInvoiceCard />
          )}
          {sectionStates.invoicesVisualization ===
            InvoicesVisualizationEnum.BY_REINVOICING && (
            <InvoiceTraceabilityReinvoicingsByInvoiceCard />
          )}
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        {/**
         * FAT x refat
         */}
        <Grid item xs={12}>
          <InvoiceTraceabilityReInvoicingTraceabilityCard />
        </Grid>
      </Grid>
      <FinpecModal
        title={`Detalhes - Nota Fiscal`}
        open={sectionStates.invoiceTraceabilityInvoiceDetailsModalOpen}
        onClose={handleCloseSalesByInvoiceModal}
      >
        <SalesByInvoiceDetailsModal
          startDate={globalStates.startDate}
          endDate={globalStates.endDate}
          nfId={sectionStates.invoiceTraceabilityNfId}
          onClose={handleCloseSalesByInvoiceModal}
        />
      </FinpecModal>
    </>
  );
}
