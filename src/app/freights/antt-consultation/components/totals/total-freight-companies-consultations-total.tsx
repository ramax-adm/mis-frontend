import { COLORS } from "@/constants/styles/colors";
import { GetFreightCompaniesResponseTotals } from "@/types/api/freight-companies";
import { Box, Typography } from "@mui/material";

interface TotalFreightCompaniesConsultationTotalsProps {
  data?: GetFreightCompaniesResponseTotals;
}
export function TotalFreightCompaniesConsultationTotals({
  data,
}: TotalFreightCompaniesConsultationTotalsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: COLORS.FUNDO_PRIMARIO,
        color: COLORS.TEXTO,
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontSize={"8px"}>Qtd.</Typography>
          <Typography fontSize={"10px"} fontWeight={700}>
            {data?.quantity}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
