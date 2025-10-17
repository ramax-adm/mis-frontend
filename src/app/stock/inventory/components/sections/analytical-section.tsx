import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import {
  useGetInventoriesFilters,
  useGetInventoryAnalyticalData,
} from "@/services/react-query/queries/inventory";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { Grid, Typography } from "@mui/material";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { use } from "react";
import { InventoryAnalyticalTable } from "../tables/inventory-analytical-table";
import { InventoryAnalyticalTotals } from "../totals/inventory-analytical-totals";

export function InventoryAnaliticalSection() {
  const [globalStates] = useQueryStates({
    companyCode: parseAsString.withDefault(""),
    inventoryId: parseAsString.withDefault(""),
  });
  const [sectionStates] = useQueryStates({
    boxNumber: parseAsString.withDefault(""),
  });

  const { data: inventoryItems, isFetching } = useGetInventoryAnalyticalData({
    companyCode: globalStates.companyCode,
    inventoryId: globalStates.inventoryId,
    boxNumber: sectionStates.boxNumber,
  });

  return (
    <>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={12}>
          <InventoryAnalyticalTotals data={inventoryItems?.totals} />
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={12}>
          <InventoryAnalyticalTable
            data={inventoryItems?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
