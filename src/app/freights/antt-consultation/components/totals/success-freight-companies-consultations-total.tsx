import { GetFreightCompaniesResponseTotals } from "@/types/api/freight-companies";
import { Box, Typography } from "@mui/material";

interface SuccessFreightCompaniesConsultationTotalsProps {
  data?: GetFreightCompaniesResponseTotals["success"];
}
export function SuccessFreightCompaniesConsultationTotals({
  data,
}: SuccessFreightCompaniesConsultationTotalsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: "rgba(27, 94, 32, 0.2)",
        color: "#1B5E20",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Consulta OK
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
