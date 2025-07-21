import { COLORS } from "@/constants/styles/colors";
import { Box, BoxProps, Typography } from "@mui/material";

interface OperationFinanceSummaryCustomizedCardProps extends BoxProps {
  cardTitle: string;
}
export function OperationFinanceSummaryCustomizedCard(
  props: OperationFinanceSummaryCustomizedCardProps
) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "6px",
        border: `1px solid ${COLORS.BORDAS}`,
        backgroundColor: "white",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        ...props?.sx,
      }}
    >
      <Box sx={{ width: "100%", borderBottom: `1px` }}>
        <Typography fontWeight={900} fontSize={"12px"} color={COLORS.TEXTO}>
          {props.cardTitle}
        </Typography>
      </Box>
      {props.children}
    </Box>
  );
}
