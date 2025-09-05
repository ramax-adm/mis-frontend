import { GetFreightCompaniesResponseTotals } from "@/types/api/freight-companies";
import { Box, Typography } from "@mui/material";

interface NotConsultedFreightCompaniesConsultationTotalsProps {
  data?: GetFreightCompaniesResponseTotals["notConsulted"];
}
export function NotConsultedFreightCompaniesConsultationTotals({
  data,
}: NotConsultedFreightCompaniesConsultationTotalsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: "#ffe0b2",
        color: "#e65100",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Nao Consultados
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontSize={"8px"}>Qtd.</Typography>
          <Typography fontSize={"10px"} fontWeight={700}>
            {data?.quantity}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontSize={"8px"}>% Registros</Typography>
          <Typography fontSize={"10px"} fontWeight={700}>
            {data?.percent}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
