import { Grid, Typography } from "@mui/material";
import { PopsTable } from "../tables/pops-table";

export function PopsSection() {
  return (
    <Grid container marginX={1}>
      <Grid item xs={12} marginTop={1}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Relação de POPs
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PopsTable />
      </Grid>
    </Grid>
  );
}
