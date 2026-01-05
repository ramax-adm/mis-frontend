import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert, Box } from "@mui/material";
import { CattlePurchaseByCattleClassificationGraph } from "../graphs/cattle-purchase-by-cattle-classification-graph";
import { CattlePurchaseListByCattleClassificationTable } from "../tables/cattle-purchase-list-by-cattle-classification-table";

interface CattlePurchaseByCattleClassificationCardProps {
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
export function CattlePurchaseByCattleClassificationCard({
  data,
}: CattlePurchaseByCattleClassificationCardProps) {
  const haveSomeData =
    data && Object.values(data).some((item) => item.totalValue > 0);

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Concentração p/ tipo de gado'
      sx={{ height: "500px", padding: 0.5 }}
    >
      {haveSomeData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            height: "95%",
          }}
        >
          <CattlePurchaseByCattleClassificationGraph data={data} />
          <CattlePurchaseListByCattleClassificationTable data={data} />
        </Box>
      )}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}
