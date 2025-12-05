import { GetCattlePurchaseResumedTotalsItem } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface CattlePurchaseResumedTotalsIndicatorProps {
  data?: GetCattlePurchaseResumedTotalsItem;
}
export function CattlePurchaseResumedTotalsIndicator({
  data,
}: CattlePurchaseResumedTotalsIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Box
        sx={{
          marginTop: 1,
          paddingX: 0.5,
          paddingY: 0.2,
          borderRadius: "4px",
          backgroundColor: indigo["50"],
          color: "#3E63DD",
        }}
      >
        <Typography fontWeight={700} fontSize={"12px"}>
          Totais
        </Typography>
        <Box sx={{ display: "inline-flex", gap: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography fontSize={"8px"}>Cabeças</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.cattleQuantity ?? 0)}
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
            <Typography fontSize={"8px"}>Peso @</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.weightInArroba ?? 0)}
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
            <Typography fontSize={"8px"}>$ Frete</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.freightPrice ?? 0)}
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
            <Typography fontSize={"8px"}>$ Comissão</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.commissionPrice ?? 0)}
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
            <Typography fontSize={"8px"}>$ Compra</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.purchasePrice ?? 0)}
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
            <Typography fontSize={"8px"}>$ Total</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {toLocaleString(data?.totalValue ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
