import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";

export function ReturnOccurrencesByItemCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const haveSomeData = false;

  return (
    <BusinessAuditCustomizedCard cardTitle='Relação de devoluções'>
      {/* <SalesTotals data={sales?.salesByClient.totals} /> */}

      {!haveSomeData ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {/* <SalesByClientTable data={salesData} isFetching={isFetching} />

          <SalesByClientGraph data={salesData} isFetching={isFetching} /> */}
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
