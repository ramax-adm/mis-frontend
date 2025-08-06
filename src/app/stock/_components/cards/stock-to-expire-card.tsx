import { GetToExpiresByCompanyResponse } from "@/types/api/stock";
import { StockToExpiresTable } from "../tables/stock-to-expires-table";
import { Box, Typography } from "@mui/material";

interface StockToExpireCardProps {
  data: GetToExpiresByCompanyResponse[];
}
export function StockToExpireCard({ data }: StockToExpireCardProps) {
  return (
    <Box
      sx={{
        width: "100",
        height: "520px",
        border: 0,
        boxShadow: "none",
        gap: 1,
        padding: 0,
      }}
    >
      <Typography variant='body2' fontWeight={700} color={"#3E63DD"}>
        Vencimentos (FIFO)
      </Typography>
      <StockToExpiresTable data={data} />
    </Box>
  );
}
