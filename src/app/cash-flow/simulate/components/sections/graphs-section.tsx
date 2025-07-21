import { PostSimulateDataResponse } from "@/types/api/cash-flow";
import { Box, Grid, Typography } from "@mui/material";
import { DailyFlowGraph } from "../graphs/daily-flow-graph";
import { DailyFlowAccGraph } from "../graphs/daily-flow-acc-graph";
import { IncomesAndExpensesAccGraph } from "../graphs/incomes-expenses-acc-graph";

interface GraphsSectionProps {
  data: PostSimulateDataResponse;
}
export function GraphsSection({ data }: GraphsSectionProps) {
  return (
    <Grid
      container
      direction='row'
      rowSpacing={2}
      gap={0.5}
      marginTop={6}
      sx={{
        width: { xs: "350px", sm: "430px", md: "820px", xl: "95%" },
        justifyContent: "space-between",
      }}
    >
      <Grid item xs={12}>
        <DailyFlowGraph data={data.originalData.dailyFlowProjection} />
      </Grid>
      <Grid item xs={12}>
        <DailyFlowAccGraph
          data={data.originalData.dailyFlowProjection}
          breakEvenFinal={data.parsedData.dailyFlowProjection.breakEvenFinal}
        />
      </Grid>
      <Grid item xs={12}>
        <IncomesAndExpensesAccGraph
          data={data.originalData.dailyFlowProjection}
          breakEven={data.parsedData.dailyFlowProjection.breakEven}
        />
      </Grid>
    </Grid>
  );
}
