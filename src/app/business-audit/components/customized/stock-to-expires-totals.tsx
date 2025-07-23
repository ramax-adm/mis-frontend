import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface StockToExpiresTotalsProps {
  data?: GetBusinessAuditResumeDataResponse["toExpiresStockTotals"];
}
export function StockToExpiresTotals({ data }: StockToExpiresTotalsProps) {
  return (
    <Box
      sx={{
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: "rgba(62, 99, 221, 0.1)",
        color: "#3E63DD",
        width: "100%",
      }}
    >
      <Typography fontWeight={800} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>Peso KG </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(data?.totalWeightInKg ?? 0)}
          </Typography>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>Med. Venc. </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(data?.daysToExpires ?? 0)}
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
}
