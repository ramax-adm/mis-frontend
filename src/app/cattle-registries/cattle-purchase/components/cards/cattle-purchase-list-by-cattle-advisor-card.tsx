import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { CattlePurchaseListByCattleAdvisorTable } from "../tables/cattle-purchase-list-by-cattle-advisor-table";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";

interface CattlePurchaseListByCattleAdvisorCardProps {
  data?: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleAdvisorList"];
}
export function CattlePurchaseListByCattleAdvisorCard({
  data = [],
}: CattlePurchaseListByCattleAdvisorCardProps) {
  const haveSomeData = data.length > 0;

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Ranking por assessor'
      sx={{ height: "calc(100vh - 500px);", padding: 0.5 }}
    >
      {haveSomeData && <CattlePurchaseListByCattleAdvisorTable data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}
