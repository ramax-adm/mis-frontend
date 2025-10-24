import { Card } from "@/components/Card";
import { StockTable } from "../tables/stock-table";
import { GetStockByCompanyResponse } from "@/types/api/stock";
import { Box, Typography } from "@mui/material";

interface StockCardProps {
  data?: GetStockByCompanyResponse[];
  isFetching: boolean;
}
export function StockCard({ data, isFetching }: StockCardProps) {
  return (
    <Box
      sx={{
        width: "100",
        height: "420px",
        border: 0,
        boxShadow: "none",
        gap: 1,
        padding: 0,
      }}
    >
      <Typography
        variant='body2'
        fontWeight={700}
        color={"#3E63DD"}
        fontSize={12}
      >
        Estoque
      </Typography>
      <StockTable data={data} isFetching={isFetching} />
    </Box>
  );
}
