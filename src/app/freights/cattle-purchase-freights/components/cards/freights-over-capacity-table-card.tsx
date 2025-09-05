import {
  FreightOverCapacityTableItem,
  FreightOverPriceTableItem,
  ResumeFreightTotals,
} from "@/types/api/freights";
import { FreightsCustomizedCard } from "../customized/card";
import { Alert } from "@mui/material";
import { FreightsOverCapacityTable } from "../tables/freights-over-capacity-table";

interface FreightsOverCapacityTableCardProps {
  totals: ResumeFreightTotals;
  data: FreightOverCapacityTableItem[];
}
export function FreightsOverCapacityTableCard({
  data,
  totals,
}: FreightsOverCapacityTableCardProps) {
  const haveSomeData = data.length > 0;
  return (
    <FreightsCustomizedCard
      cardTitle='Fora da capacidade'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && (
        <FreightsOverCapacityTable data={data} totals={totals} />
      )}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  );
}
