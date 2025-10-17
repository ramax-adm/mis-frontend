import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { Grid } from "@mui/material";
import { parseAsString, useQueryStates } from "nuqs";

export function InventoryAnalyticalFilters() {
  const [analyticalStates, setAnalyticalStates] = useQueryStates({
    boxNumber: parseAsString.withDefault(""),
  });

  const handleSelectBoxNumber = (value: string | null) =>
    setAnalyticalStates({ boxNumber: value });
  return (
    <>
      <Grid item xs={12} sm={2}>
        <TextInputControlled
          id='boxNumber'
          label='N° Caixa'
          size='small'
          value={analyticalStates.boxNumber}
          setValue={handleSelectBoxNumber}
        />
      </Grid>
    </>
  );
}
