import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import {
  useGetInventoriesFilters,
  useGetInventoryAnalyticalData,
  useGetInventoryResumeData,
} from "@/services/react-query/queries/inventory";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { Alert, Grid, Typography } from "@mui/material";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { use } from "react";
import { InventoryAnalyticalTable } from "../tables/inventory-analytical-table";
import { InventoryAnalyticalTotals } from "../totals/inventory-analytical-totals";
import { InventoryResumeCancelatedTotals } from "../totals/inventory-resume-cancelated-totals";
import { InventoryResumeBlockedTotals } from "../totals/inventory-resume-blocked-totals";
import { InventoryResumeDispatchedTotals } from "../totals/inventory-resume-dispatched-totals";
import { InventoryResumeTotals } from "../totals/inventory-resume-totals";
import { InventoryProductsWithDiferenceTable } from "../tables/inventory-products-with-difference-table";

export function InventoryResumeSection() {
  const [globalStates] = useQueryStates({
    companyCode: parseAsString.withDefault(""),
    inventoryId: parseAsString.withDefault(""),
  });

  const { data: inventoryItems, isFetching } = useGetInventoryResumeData({
    companyCode: globalStates.companyCode,
    inventoryId: globalStates.inventoryId,
  });

  return (
    <>
      <Grid container marginTop={0.5}>
        <Grid item>
          <Alert
            severity='info'
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontSize: "0.75rem", // tamanho do texto
              padding: "2px 8px", // padding interno
              "& .MuiAlert-icon": {
                fontSize: "1rem", // tamanho do ícone
              },
            }}
          >
            <span style={{ fontWeight: 700 }}>Em Desenvolvimento:</span> Saldos
            de inventario para Etiquetas lidas e Saldo Anterior!
          </Alert>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid
          item
          xs={12}
          sx={{ display: "inline-flex", gap: 1, flexWrap: "wrap" }}
        >
          <InventoryResumeTotals data={inventoryItems?.totals} />
          <InventoryResumeCancelatedTotals data={inventoryItems?.totals} />
          <InventoryResumeBlockedTotals data={inventoryItems?.totals} />
          <InventoryResumeDispatchedTotals data={inventoryItems?.totals} />
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={12}>
          <InventoryProductsWithDiferenceTable
            data={inventoryItems?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
