import { COLORS } from "@/constants/styles/colors";
import { GetBusinessAuditSalesDataTotals } from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green, indigo, red } from "@mui/material/colors";

interface SalesTotalsProps {
  data?: GetBusinessAuditSalesDataTotals;
}
export function SalesTotals({ data }: SalesTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex", // <- muda para inline-flex
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: COLORS.FUNDO_PRIMARIO,
        color: COLORS.TEXTO,
        width: "fit-content", // <- garante que só ocupe o necessário
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>NFs</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {data?.invoiceQuantity ?? 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Total KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalKg ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Fat.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalFatValue ?? 0)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Tabela.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalTableValue ?? 0)}
          </Typography>
        </Box>

        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"} color={green["900"]} fontWeight={700}>
            $ Adicional
          </Typography>
          <Typography fontSize={"11px"} fontWeight={700} color={green["900"]}>
            {toLocaleString(data?.totalAdditionValue ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"} fontWeight={700} color={red["900"]}>
            $ Desconto.
          </Typography>
          <Typography fontSize={"11px"} fontWeight={700} color={red["900"]}>
            {toLocaleString(data?.totalDiscountValue ?? 0)}
          </Typography>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography
            fontSize={"9.5px"}
            color={indigo["A700"]}
            fontWeight={700}
          >
            $ Dif.
          </Typography>
          <Typography fontSize={"11px"} fontWeight={700} color={indigo["A700"]}>
            {toLocaleString(data?.totalDiff ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography
            fontSize={"9.5px"}
            color={indigo["A700"]}
            fontWeight={700}
          >
            % Dif.
          </Typography>
          <Typography fontSize={"11px"} fontWeight={700} color={indigo["A700"]}>
            {toPercent(data?.totalDiffPercent)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
