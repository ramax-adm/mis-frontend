import { FreightsCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { QuantityFreightsClosedByFreightCompanyGraph } from "../graphs/quantity-freights-closed-by-freight-company-graph";

interface QuantityFreightsClosedByFreightCompanyCardProps {
  data: Record<string, { quantity: number; percent: number }>;
}
export function QuantityFreightsClosedByFreightCompanyCard({
  data,
}: QuantityFreightsClosedByFreightCompanyCardProps) {
  const haveSomeData = Object.values(data).some((item) => item.quantity > 0);

  return (
    <FreightsCustomizedCard
      cardTitle='Concentração de fretes FECHADOS p/ Transportadora'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && (
        <QuantityFreightsClosedByFreightCompanyGraph data={data} />
      )}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  );
}
