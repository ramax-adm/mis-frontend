import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface StockBalanceTotalIndicatorProps {
  title: string;
  value: any;
}
export function StockBalanceTotalIndicator({
  title,
  value,
}: StockBalanceTotalIndicatorProps) {
  return (
    <Box
      component={"span"}
      sx={{
        display: "inline-flex",
        paddingY: 0.3,
        paddingX: 0.4,
        borderRadius: "6px",
        alignItems: "center",
        backgroundColor: "rgba(62, 99, 221, 0.2)",
        color: "#3E63DD",
        width: "110px",
        marginRight: 2,
        marginBottom: 1,
      }}
    >
      <Typography fontWeight={500} fontSize={"10px"}>
        {title}
      </Typography>
      <Typography fontWeight={800} fontSize={"12px"}>
        {toLocaleString(value)}
      </Typography>
    </Box>
  );
}
