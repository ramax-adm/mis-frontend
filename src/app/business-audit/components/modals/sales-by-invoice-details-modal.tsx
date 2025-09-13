import { ListItemCustom } from "@/components/ListItemCustom";
import { useGetBusinessAuditOrdersLinesData } from "@/services/react-query/queries/business-audit";
import { Box, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";
import { LoaderIcon } from "../customized/loader-icon";
import { SalesByInvoiceDetailsTable } from "../tables/sales-by-invoice-details-table";

interface SalesByInvoiceDetailsModalProps {
  onClose: () => void;
  startDate: string;
  endDate: string;
  nfNumber: string;
}
export function SalesByInvoiceDetailsModal({
  onClose,
  nfNumber,
  startDate,
  endDate,
}: SalesByInvoiceDetailsModalProps) {
  const { data: ordersData, isFetching } = useGetBusinessAuditOrdersLinesData({
    nfNumber,
    startDate,
    endDate,
  });

  if (isFetching) {
    return (
      <Box sx={{ height: "300px", display: "grid", placeItems: "center" }}>
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SalesByInvoiceDetailsTable data={ordersData} isFetching={isFetching} />
    </Box>
  );
}
