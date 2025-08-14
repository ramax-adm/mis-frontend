import { Grid, Typography } from "@mui/material";
import { PoliciesTable } from "../tables/policies-table";

export function PoliciesSection() {
  return (
    <Grid container marginX={1}>
      <Grid item xs={12} marginTop={1}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Relação de politicas
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PoliciesTable />
      </Grid>
    </Grid>
  );
}
