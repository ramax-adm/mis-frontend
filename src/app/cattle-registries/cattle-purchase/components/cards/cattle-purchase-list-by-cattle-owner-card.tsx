import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { CattlePurchaseListByCattleOwnerTable } from "../tables/cattle-purchase-list-by-cattle-owner-table";

interface CattlePurchaseListByCattleOwnerCardProps {
  data?: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleOwnerList"];
}
export function CattlePurchaseListByCattleOwnerCard({
  data = [],
}: CattlePurchaseListByCattleOwnerCardProps) {
  const haveSomeData = data.length > 0;

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Ranking por pecuarista'
      sx={{ height: "calc(100vh - 500px);", padding: 0.5 }}
    >
      {haveSomeData && <CattlePurchaseListByCattleOwnerTable data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}
