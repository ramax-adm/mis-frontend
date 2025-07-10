import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { CattlePurchaseByCattleAdvisorGraph } from "../graphs/cattle-purchase-by-cattle-advisor-graph";

interface CattlePurchaseByCattleAdvisorCardProps {
  data?: Record<
    string,
    {
      cattleQuantity: number;
      freightPrice: number;
      purchasePrice: number;
      commissionPrice: number;
      totalValue: number;
      percent: number;
    }
  >;
}
export function CattlePurchaseByCattleAdvisorCard({
  data,
}: CattlePurchaseByCattleAdvisorCardProps) {
  const haveSomeData =
    data && Object.values(data).some((item) => item.totalValue > 0);

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Concentração p/ assessor'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && <CattlePurchaseByCattleAdvisorGraph data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}
