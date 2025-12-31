import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert, Box } from "@mui/material";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { CattlePurchaseListByCattleOwnerTable } from "../tables/cattle-purchase-list-by-cattle-owner-table";
import { CattlePurchaseByCattleOwnerGraph } from "../graphs/cattle-purchase-by-cattle-owner-graph";

interface CattlePurchaseByCattleOwnerCardProps {
  list?: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleOwnerList"];
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
export function CattlePurchaseByCattleOwnerCard({
  data,
  list = [],
}: CattlePurchaseByCattleOwnerCardProps) {
  const haveSomeData =
    data && Object.values(data).some((item) => item.totalValue > 0);

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Concentração p/ pecuarista'
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
          <CattlePurchaseByCattleOwnerGraph data={data} />
          <CattlePurchaseListByCattleOwnerTable data={list} />
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
