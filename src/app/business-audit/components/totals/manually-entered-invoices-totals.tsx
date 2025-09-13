import { GetBusinessAuditOverviewDataResponse } from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface ManuallyEnteredInvoicesTotalsProps {
  data?: GetBusinessAuditOverviewDataResponse["manuallyEnteredInvoicesTotals"];
}
export function ManuallyEnteredInvoicesTotals({
  data,
}: ManuallyEnteredInvoicesTotalsProps) {
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
          <Typography fontSize={"9px"}>Qtd. </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(data?.quantity ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>Qtd. Produtos </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(data?.productQuantity ?? 0)}
          </Typography>
        </Box>
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
            {toLocaleString(data?.weightInKg ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>R$ Total </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {toLocaleString(data?.totalPrice ?? 0, 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
