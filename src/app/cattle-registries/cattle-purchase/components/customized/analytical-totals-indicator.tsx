import { GetCattlePurchaseAnalyticalTotalsItem } from "@/types/api/purchase";
import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface CattlePurchaseAnalyticalTotalsIndicatorProps {
  data?: GetCattlePurchaseAnalyticalTotalsItem;
}
export function CattlePurchaseAnalyticalTotalsIndicator({
  data,
}: CattlePurchaseAnalyticalTotalsIndicatorProps) {
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
            <Typography fontSize={"8px"}>Cbs</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {data?.cattleQuantity}
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
            <Typography fontSize={"8px"}>Peso/@</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {data?.weightInArroba}
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
              {data?.freightValue}
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
              {data?.commissionValue}
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
              {data?.purchaseValue}
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
            <Typography fontSize={"8px"}>$/Cab</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {data?.headPrice}
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
            <Typography fontSize={"8px"}>$/@</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {data?.arrobaPrice}
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
            <Typography fontSize={"8px"}>$/KG</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {data?.kgPrice}
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
              {data?.finalValue}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
