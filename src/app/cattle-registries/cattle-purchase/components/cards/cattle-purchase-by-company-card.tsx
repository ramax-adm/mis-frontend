import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { CattlePurchaseByCompanyGraph } from "../graphs/cattle-purchase-by-company-graph";

interface CattlePurchaseByCompanyCardProps {
  data?: Record<
    string,
    {
      companyCode: string;
      companyName: string;
      cattleQuantity: number;
      totalValue: number;
      percent: number;
    }
  >;
}
export function CattlePurchaseByCompanyCard({
  data,
}: CattlePurchaseByCompanyCardProps) {
  const haveSomeData =
    data && Object.values(data).some((item) => item.totalValue > 0);

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Concentração p/ empresa'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && <CattlePurchaseByCompanyGraph data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}
