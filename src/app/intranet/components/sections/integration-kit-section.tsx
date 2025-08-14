import { Grid, Typography } from "@mui/material";
import { IntegrationKitTable } from "../tables/integration-kit-documents-table";
import { parseAsString, useQueryStates } from "nuqs";

export function IntegrationKitSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    type: parseAsString.withDefault(""),
  });

  const handleSelectType = (value: string) => setSectionStates({ type: value });
  return (
    <Grid container marginX={1}>
      <Grid item xs={12} marginTop={1}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Relação de kits
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <IntegrationKitTable />
      </Grid>
    </Grid>
  );
}
