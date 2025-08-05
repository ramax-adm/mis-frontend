"use client";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { COLORS } from "@/constants/styles/colors";
import { useGetBusinessAuditResumeData } from "@/services/react-query/queries/business-audit";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { ManuallyEnteredInvoicesTable } from "./components/tables/manually-entered-invoices-table";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { ManuallyEnteredInvoicesTotals } from "./components/totals/manually-entered-invoices-totals";
import { CattlePurchaseFreightsDuplicatedTable } from "./components/tables/cattle-purchase-freights-duplicated-table";
import { CattlePurchaseFreightsOverTablePriceTable } from "./components/tables/cattle-purchase-freights-over-table-price-table";
import { OpenCattlePurchaseFreightsTable } from "./components/tables/open-cattle-purchase-freights-table";
import { CattlePurchaseFreightsDuplicatedTotals } from "./components/totals/cattle-purchase-freights-duplicated-totals";
import { CattlePurchaseFreightsOverTablePriceTotals } from "./components/totals/cattle-purchase-freights-over-table-price-totals";
import { StockToExpiresTotals } from "./components/totals/stock-to-expires-totals";
import { StockToExpiresTable } from "./components/tables/stock-to-expires-table";
import { OpenCattlePurchaseFreightsTotals } from "./components/totals/open-cattle-purchase-freights-totals";
import { InvoicesWithSamePriceTable } from "./components/tables/invoices-with-same-price-table";
import { InvoicesWithSamePriceTotals } from "./components/totals/invoices-with-same-price-totals";

export default function BusinessAudit() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const { data: businessAuditData, isFetching } = useGetBusinessAuditResumeData(
    {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    }
  );

  const handleSelectStartDate = (value: Date) => setSelectedStartDate(value);
  const handleSelectEndDate = (value: Date) => setSelectedEndDate(value);

  return (
    <PageContainer>
      <PageContainerHeader title='Auditoria' />
      {isFetching && <LoadingOverlay />}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Inicio'
            size='small'
            value={dayjs(selectedStartDate)}
            setValue={handleSelectStartDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Fim'
            size='small'
            value={dayjs(selectedEndDate)}
            setValue={handleSelectEndDate}
          />
        </Grid>
      </Grid>

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
              <Typography
                fontWeight={700}
                fontSize={"12px"}
                color={COLORS.TEXTO}
              >
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
              <Typography
                fontWeight={700}
                fontSize={"12px"}
                color={COLORS.TEXTO}
              >
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
              <Typography
                fontWeight={700}
                fontSize={"12px"}
                color={COLORS.TEXTO}
              >
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
    </PageContainer>
  );
}
