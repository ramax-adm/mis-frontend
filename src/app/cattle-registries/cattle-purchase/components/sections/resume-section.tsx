import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { useGetCattlePurchaseResumedData } from "@/services/react-query/queries/purchase";
import { Grid } from "@mui/material";
import { forwardRef } from "react";
import { CattlePurchaseByCattleAdvisorCard } from "../cards/cattle-purchase-by-cattle-advisor-card";
import { CattlePurchaseQuantityBySlaughterDateCard } from "../cards/cattle-purchase-quantity-by-slaughter-date-card";
import { CattlePurchaseTotalsIndicator } from "../customized/totals-indicator";
import { CattlePurchaseByCattleOwnerCard } from "../cards/cattle-purchase-by-cattle-owner-card";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { CattlePurchaseKpiIndicator } from "../customized/kpi-indicator";
import { toCurrency, toLocaleString, toPercent } from "@/utils/string.utils";
import { CattlePurchaseByCompanyCard } from "../cards/cattle-purchase-by-company-card";
import { CattlePurchaseByCattleClassificationCard } from "../cards/cattle-purchase-by-cattle-classification-card";

interface CattlePurchaseResumeSectionProps {}

export interface CattlePurchaseResumeSectionRef {}

export const CattlePurchaseResumeSection = forwardRef<
  CattlePurchaseResumeSectionRef,
  CattlePurchaseResumeSectionProps
>(({}, ref) => {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    cattleOwner: parseAsString.withDefault(""),
    cattleAdvisor: parseAsString.withDefault(""),
    cattleClassification: parseAsString.withDefault(""),
  });
  const { data: cattleResumedData, isFetching } =
    useGetCattlePurchaseResumedData({
      companyCodes: globalStates.companyCodes.join(","),
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
      cattleOwnerName: globalStates.cattleOwner,
      cattleAdvisorName: globalStates.cattleAdvisor,
      cattleClassification: globalStates.cattleClassification,
    });

  const purchaseTotals = cattleResumedData?.totals;
  return (
    <>
      {isFetching && <LoadingOverlay />}
      <Grid container>
        <Grid item xs={12}>
          <CattlePurchaseTotalsIndicator data={purchaseTotals} />
        </Grid>
      </Grid>
      {/** 1° Linha */}
      <Grid container spacing={1} marginTop={0.1}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            height: 200,
            flexWrap: "wrap",
          }}
        >
          <CattlePurchaseKpiIndicator
            label='Valor $/Cab'
            value={toCurrency(cattleResumedData?.kpis.headPrice)}
          />
          <CattlePurchaseKpiIndicator
            label='Valor $/@'
            value={toCurrency(cattleResumedData?.kpis.arrobaPrice)}
          />
          <CattlePurchaseKpiIndicator
            label='Valor $/KG'
            value={toCurrency(cattleResumedData?.kpis.kgPrice)}
          />
          <CattlePurchaseKpiIndicator
            label='Qtd Compras'
            value={toLocaleString(cattleResumedData?.kpis.purchasesCount ?? 0)}
          />
          <CattlePurchaseKpiIndicator
            label='% Frete Pago'
            value={toPercent(cattleResumedData?.kpis.freightPercentOverTotal)}
          />
          <CattlePurchaseKpiIndicator
            label='% Comissão Paga'
            value={toPercent(
              cattleResumedData?.kpis.commissionPercentOverTotal
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <CattlePurchaseByCompanyCard
            data={cattleResumedData?.cattlePurchaseByCompany}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CattlePurchaseQuantityBySlaughterDateCard
            data={cattleResumedData?.cattlePurchaseQuantityBySlaughterDate}
          />
        </Grid>
      </Grid>

      {/** 2° Linha */}
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={12} md={4}>
          <CattlePurchaseByCattleClassificationCard
            data={cattleResumedData?.cattlePurchaseByCattleClassification}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CattlePurchaseByCattleAdvisorCard
            data={cattleResumedData?.cattlePurchaseByCattleAdvisor}
            list={cattleResumedData?.cattlePurchaseByCattleAdvisorList}
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <CattlePurchaseListByCattleAdvisorCard
            data={cattleResumedData?.cattlePurchaseByCattleAdvisorList}
          />
        </Grid> */}
        <Grid item xs={12} md={4}>
          <CattlePurchaseByCattleOwnerCard
            data={cattleResumedData?.cattlePurchaseByCattleOwner}
            list={cattleResumedData?.cattlePurchaseByCattleOwnerList}
          />
        </Grid>
      </Grid>
    </>
  );
});
