import { COLORS } from "@/constants/styles/colors";
import { Box, Typography } from "@mui/material";

interface OperationFinanceSummaryLineIndicatorProps {
  title: string;
  value?: string | number;
  highlited?: boolean;
}
export function OperationFinanceSummaryLineIndicator({
  title,
  value,
  highlited = false,
}: OperationFinanceSummaryLineIndicatorProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "inline-flex",
        paddingX: 1.5,
        gap: 0.5,
      }}
    >
      <Typography fontSize={"12px"} fontWeight={500}>
        {title}
      </Typography>
      <Typography fontSize={"12px"} fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}
