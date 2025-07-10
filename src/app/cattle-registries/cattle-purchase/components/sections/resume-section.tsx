import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { useGetCattlePurchaseResumedData } from "@/services/react-query/queries/purchase";
import { Grid } from "@mui/material";
import { forwardRef } from "react";
import { CattlePurchaseByCattleAdvisorCard } from "../cards/cattle-purchase-by-cattle-advisor-card";
import { CattlePurchaseQuantityBySlaughterDateCard } from "../cards/cattle-purchase-quantity-by-slaughter-date-card";
import { CattlePurchaseResumedTotalsIndicator } from "../customized/resumed-totals-indicator";
import { CattlePurchaseListByCattleAdvisorCard } from "../cards/cattle-purchase-list-by-cattle-advisor-card";
import { CattlePurchaseListByCattleOwnerCard } from "../cards/cattle-purchase-list-by-cattle-owner-card";

interface CattlePurchaseResumeSectionProps {
  companyCode: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface CattlePurchaseResumeSectionRef {}

export const CattlePurchaseResumeSection = forwardRef<
  CattlePurchaseResumeSectionRef,
  CattlePurchaseResumeSectionProps
>(({ companyCode, startDate, endDate }, ref) => {
  const { data: cattleResumedData, isFetching } =
    useGetCattlePurchaseResumedData({
      companyCode,
      startDate,
      endDate,
    });

  const purchaseTotals = cattleResumedData?.totals;
  return (
    <>
      {isFetching && <LoadingOverlay />}
      <Grid container>
        <Grid item xs={12}>
          <CattlePurchaseResumedTotalsIndicator data={purchaseTotals} />
        </Grid>
      </Grid>
      {/** 1° Linha */}
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12} sm={6}>
          <CattlePurchaseByCattleAdvisorCard
            data={cattleResumedData?.cattlePurchaseByCattleAdvisor}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CattlePurchaseQuantityBySlaughterDateCard
            data={cattleResumedData?.cattlePurchaseQuantityBySlaughterDate}
          />
        </Grid>
      </Grid>

      {/** 2° Linha */}
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12} sm={6}>
          <CattlePurchaseListByCattleAdvisorCard
            data={cattleResumedData?.cattlePurchaseByCattleAdvisorList}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CattlePurchaseListByCattleOwnerCard
            data={cattleResumedData?.cattlePurchaseByCattleOwnerList}
          />
        </Grid>
      </Grid>
    </>
  );
});
