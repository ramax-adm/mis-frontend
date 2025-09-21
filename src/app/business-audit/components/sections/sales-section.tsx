import { Grid } from "@mui/material";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { SalesByInvoiceDetailsModal } from "../modals/sales-by-invoice-details-modal";
import { SalesByInvoiceCard } from "../cards/sales-by-invoice-card";
import { SalesByProductCard } from "../cards/sales-by-product-card";
import { SalesByClientCard } from "../cards/sales-by-client-card";
import { SalesByRepresentativeCard } from "../cards/sales-by-representative-card";

export function BusinessAuditSalesSection() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });
  const [salesSectionStates, setSalesSectionStates] = useQueryStates({
    nfId: parseAsString.withDefault(""),
    salesByInvoiceModalOpen: parseAsBoolean.withDefault(false),
  });

  const handleCloseSalesByInvoiceModal = () =>
    setSalesSectionStates({ salesByInvoiceModalOpen: false, nfId: "" });

  return (
    <>
      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <SalesByInvoiceCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={12} md={4}>
          <SalesByProductCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <SalesByClientCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <SalesByRepresentativeCard />
        </Grid>
      </Grid>
      <FinpecModal
        title={`Detalhes - Nota Fiscal`}
        open={salesSectionStates.salesByInvoiceModalOpen}
        onClose={handleCloseSalesByInvoiceModal}
      >
        <SalesByInvoiceDetailsModal
          startDate={globalStates.startDate}
          endDate={globalStates.endDate}
          nfId={salesSectionStates.nfId}
          onClose={handleCloseSalesByInvoiceModal}
        />
      </FinpecModal>
    </>
  );
}
