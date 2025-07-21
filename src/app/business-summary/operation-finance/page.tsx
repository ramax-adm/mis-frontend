"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { useGetOperationFinanceSummary } from "@/services/react-query/queries/operation-finance-summary";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { OperationFinanceSummaryIndicator } from "./components/indicators/operation-finance-summary-indicator";
import { toLocaleString } from "@/utils/string.utils";
import { OperationFinanceSummaryLineIndicator } from "./components/indicators/operation-finance-summary-line-indicator";

export default function OperationFinanceSummaryPage() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  );

  const { data: operationSummary, isFetching } = useGetOperationFinanceSummary({
    companyCode: selectedCompany,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });
  return (
    <PageContainer>
      <PageContainerHeader title='DRE Operação' />
      <Grid container>
        {/** Lado das tabelas */}
        <Grid item container xs={12} sm={8}>
          {/** Tabela p/ familia,
           * p/ mercado
           * grafico por mercado
           */}
          <Grid item xs={12} sm={6}></Grid>

          {/** Tabela p/ sexo, quateio */}
          <Grid item xs={12} sm={6}></Grid>
        </Grid>

        {/** Lado do Resultado */}
        <Grid item container xs={12} sm={4} flexDirection={"column"}>
          {/** KPIs */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                highlited
                title='Produção em KG'
                value={toLocaleString(
                  operationSummary?.totals.productionWeightInKg ?? 0
                )}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                highlited
                title='Receita total'
                value={toLocaleString(
                  operationSummary?.totals.totalIncome ?? 0
                )}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                title='Produção ME (KG)'
                value={toLocaleString(
                  operationSummary?.totals.meProductionWeightInKg ?? 0
                )}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                title='Receita ME'
                value={toLocaleString(
                  operationSummary?.totals.meIncomeValue ?? 0
                )}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                title='Produção MI (KG)'
                value={toLocaleString(
                  operationSummary?.totals.miProductionWeightInKg ?? 0
                )}
              />
            </Box>
            <Box sx={{ width: "45%" }}>
              <OperationFinanceSummaryIndicator
                title='Receita MI'
                value={toLocaleString(
                  operationSummary?.totals.miIncomeValue ?? 0
                )}
              />
            </Box>
          </Box>
          {/** Valores somatorios */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <OperationFinanceSummaryLineIndicator
              title='(-) COMPRA GADO / FRETE (MP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) CUSTO DE MÃO DE OBRA (OP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) CUSTO EMBALAGENS'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) DESPESAS FINANCEIRAS ME (LOG)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) DESPESAS FINANCEIRAS PORTO (LOG)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) COMPRA GADO / FRETE (MP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) COMPRA GADO / FRETE (MP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) COMPRA GADO / FRETE (MP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
            <OperationFinanceSummaryLineIndicator
              title='(-) COMPRA GADO / FRETE (MP)'
              value={operationSummary?.totals.cattlePurchaseBuyCost}
            />
          </Box>
          {/** Totais */}
        </Grid>
      </Grid>
    </PageContainer>
  );
}
