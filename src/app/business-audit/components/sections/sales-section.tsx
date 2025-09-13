import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import { Grid } from "@mui/material";
import { SalesByInvoiceTable } from "../tables/sales-by-invoice-table";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { SalesByInvoiceDetailsModal } from "../modals/sales-by-invoice-details-modal";
import { SalesByInvoiceCard } from "../cards/sales-by-invoice-card";
import { SalesByProductCard } from "../cards/sales-by-product-card";
import { SalesByClientCard } from "../cards/sales-by-client-card";
import { SalesByRepresentativeCard } from "../cards/sales-by-representative-card";
import { OrderPriceConsiderationEnum } from "@/types/sales";

export function BusinessAuditSalesSection() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });
  const [salesSectionStates, setSalesSectionStates] = useQueryStates({
    nfNumber: parseAsString.withDefault(""),
    salesByInvoiceModalOpen: parseAsBoolean.withDefault(false),
    priceConsideration: parseAsString.withDefault(
      OrderPriceConsiderationEnum.NONE
    ),
  });

  const handleCloseSalesByInvoiceModal = () => {
    setSalesSectionStates({ salesByInvoiceModalOpen: false, nfNumber: "" });
  };

  return (
    <>
      <Grid container marginTop={0.5} spacing={1}>
        <Grid item xs={12} md={6}>
          <SalesByInvoiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesByProductCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.5} spacing={1}>
        <Grid item xs={12} md={6}>
          <SalesByClientCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesByRepresentativeCard />
        </Grid>
      </Grid>
      <FinpecModal
        title={`Detalhes - NF ${salesSectionStates.nfNumber}`}
        open={salesSectionStates.salesByInvoiceModalOpen}
        onClose={handleCloseSalesByInvoiceModal}
      >
        <SalesByInvoiceDetailsModal
          startDate={globalStates.startDate}
          endDate={globalStates.endDate}
          nfNumber={salesSectionStates.nfNumber}
          onClose={handleCloseSalesByInvoiceModal}
        />
      </FinpecModal>
    </>
  );
}
// quando clica em uma nf -> bate na rota /data/orders com o id da nf e o date range
