import { Grid, Typography } from "@mui/material";

export function IntegrationKitSection() {
  return (
    <Grid container marginX={1}>
      <Grid item xs={12} marginTop={1}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Relação de kits
        </Typography>
      </Grid>
    </Grid>
  );
}
