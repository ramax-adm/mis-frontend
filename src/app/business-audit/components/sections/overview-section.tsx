import { COLORS } from "@/constants/styles/colors";
import { Box, Grid, Typography } from "@mui/material";
import { CattlePurchaseFreightsDuplicatedTable } from "../tables/cattle-purchase-freights-duplicated-table";
import { CattlePurchaseFreightsOverTablePriceTable } from "../tables/cattle-purchase-freights-over-table-price-table";
import { InvoicesWithSamePriceTable } from "../tables/invoices-with-same-price-table";
import { ManuallyEnteredInvoicesTable } from "../tables/manually-entered-invoices-table";
import { OpenCattlePurchaseFreightsTable } from "../tables/open-cattle-purchase-freights-table";
import { StockToExpiresTable } from "../tables/stock-to-expires-table";
import { CattlePurchaseFreightsDuplicatedTotals } from "../totals/cattle-purchase-freights-duplicated-totals";
import { CattlePurchaseFreightsOverTablePriceTotals } from "../totals/cattle-purchase-freights-over-table-price-totals";
import { InvoicesWithSamePriceTotals } from "../totals/invoices-with-same-price-totals";
import { ManuallyEnteredInvoicesTotals } from "../totals/manually-entered-invoices-totals";
import { OpenCattlePurchaseFreightsTotals } from "../totals/open-cattle-purchase-freights-totals";
import { StockToExpiresTotals } from "../totals/stock-to-expires-totals";
import { useGetBusinessAuditOverviewData } from "@/services/react-query/queries/business-audit";
import { parseAsString, useQueryStates } from "nuqs";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";

export function BusinessAuditOverviewSection() {
  const [states] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });
  const { data: businessAuditData, isFetching } =
    useGetBusinessAuditOverviewData({
      startDate: states.startDate,
      endDate: states.endDate,
    });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <Grid container marginTop={1} gap={2}>
      {/* Notas fiscais 
          * Totais Notas avulsas entre 2 datas
          * Tabela Notas avulsas entre 2 datas

        */}
      <Grid item xs={12} md={3}>
        <Typography
          color={"#fff"}
          fontWeight={700}
          sx={{
            border: 1,
            borderRadius: "4px",
            borderColor: COLORS.TEXTO,
            backgroundColor: COLORS.TEXTO,
            paddingX: 1,
            paddingY: 0.5,
          }}
        >
          FATURAMENTO
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
            NFs Avulsas
          </Typography>
          <ManuallyEnteredInvoicesTotals
            data={businessAuditData?.manuallyEnteredInvoicesTotals}
          />
          <ManuallyEnteredInvoicesTable
            data={businessAuditData?.manuallyEnteredInvoicesByCompany}
          />
        </Box>
        <Box marginTop={1} sx={{ display: "inline-flex", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "100%",
            }}
          >
            <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
              NFs c/ duplicidade no valor
            </Typography>
            <InvoicesWithSamePriceTotals
              data={businessAuditData?.invoicesWithSamePriceTotals}
            />
            <InvoicesWithSamePriceTable
              data={businessAuditData?.invoicesWithSamePrice}
            />
          </Box>
        </Box>
      </Grid>
      {/* Fretes
       * Totais
       * fretes com mesma placa 2 vezes no mesmo dia
       * fretes com preço 10% acima da tabela
       *
       *
       */}
      <Grid item xs={12} md={5}>
        <Typography
          color={"#fff"}
          fontWeight={700}
          sx={{
            border: 1,
            borderRadius: "4px",
            borderColor: COLORS.TEXTO,
            backgroundColor: COLORS.TEXTO,
            paddingX: 1,
            paddingY: 0.5,
          }}
        >
          FRETES
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            gap: 1,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "50%",
            }}
          >
            <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
              Duplicados
            </Typography>
            <CattlePurchaseFreightsDuplicatedTotals
              data={businessAuditData?.cattlePurchaseFreightsDuplicatedTotals}
            />
            <CattlePurchaseFreightsDuplicatedTable
              data={businessAuditData?.cattlePurchaseFreightsDuplicated}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              width: "50%",
            }}
          >
            <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
              Acima preço de tabela
            </Typography>
            <CattlePurchaseFreightsOverTablePriceTotals
              data={
                businessAuditData?.cattlePurchaseFreightsOverTablePriceTotals
              }
            />
            <CattlePurchaseFreightsOverTablePriceTable
              data={businessAuditData?.cattlePurchaseFreightsOverTablePrice}
            />
          </Box>
        </Box>
        <Box
          marginTop={1}
          sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
        >
          <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
            Em aberto
          </Typography>
          <OpenCattlePurchaseFreightsTotals
            data={businessAuditData?.openCattlePurchaseFreightsTotals}
          />
          <OpenCattlePurchaseFreightsTable
            data={businessAuditData?.openCattlePurchaseFreights}
          />
        </Box>
      </Grid>
      {/* Estoque
            Produtos abaixo de 15 dias para fifo
            Produtos entre 15 e 30 dias para fifo
        */}
      <Grid item xs={12} sm={3.5}>
        <Typography
          color={"#fff"}
          fontWeight={700}
          sx={{
            border: 1,
            borderRadius: "4px",
            borderColor: COLORS.TEXTO,
            backgroundColor: COLORS.TEXTO,
            paddingX: 1,
            paddingY: 0.5,
          }}
        >
          ESTOQUE
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography fontWeight={700} fontSize={"12px"} color={COLORS.TEXTO}>
            Estoque FIFO
          </Typography>
          <StockToExpiresTotals
            data={businessAuditData?.toExpiresStockTotals}
          />
          <StockToExpiresTable data={businessAuditData?.toExpiresStock} />
        </Box>
      </Grid>

      {/** DEVOLUCOES */}
      <Grid item xs={12} sm={6}>
        <Typography
          color={"#fff"}
          fontWeight={700}
          sx={{
            border: 1,
            borderRadius: "4px",
            borderColor: COLORS.TEXTO,
            backgroundColor: COLORS.TEXTO,
            paddingX: 1,
            paddingY: 0.5,
          }}
        >
          DEVOLUÇÕES
        </Typography>
        <Box
          sx={{
            marginTop: 0.5,
            width: "100%",
            height: "300px",
            backgroundColor: "rgba(62, 99, 221, 0.1)",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Typography fontWeight={700}>EM DESENVOLVIMENTO</Typography>
        </Box>
      </Grid>

      {/** COMPRAS */}
      <Grid item xs={12} sm={5.7}>
        <Typography
          color={"#fff"}
          fontWeight={700}
          sx={{
            border: 1,
            borderRadius: "4px",
            borderColor: COLORS.TEXTO,
            backgroundColor: COLORS.TEXTO,
            paddingX: 1,
            paddingY: 0.5,
          }}
        >
          COMPRAS
        </Typography>
        <Box
          sx={{
            marginTop: 0.5,
            width: "100%",
            height: "300px",
            backgroundColor: "rgba(62, 99, 221, 0.1)",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Typography fontWeight={700}>EM DESENVOLVIMENTO</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
