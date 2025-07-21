import { COLORS } from "@/constants/styles/colors";
import { Box, Typography } from "@mui/material";

interface OperationFinanceSummaryIndicatorProps {
  title: string;
  value?: string | number;
  highlited?: boolean;
}
export function OperationFinanceSummaryIndicator({
  title,
  value,
  highlited = false,
}: OperationFinanceSummaryIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: 1.5,
        gap: 0.5,
        borderLeftWidth: 4,
        borderLeftStyle: "solid",
        borderLeftColor: highlited ? "#3E63DD" : COLORS.BORDAS_ALTERNATIVA,
      }}
    >
      <Typography
        fontSize={"14px"}
        fontWeight={700}
        color={highlited ? "#3E63DD" : "#000"}
      >
        {value}
      </Typography>
      <Typography
        fontSize={"12px"}
        fontWeight={600}
        color={highlited ? "#3E63DD" : "#000"}
      >
        {title}
      </Typography>
    </Box>
  );
}
