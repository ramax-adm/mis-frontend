import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

type CattlePurchaseByAdvisorTableData =
  GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleAdvisorList"][number] & {
    cattleAdvisor: string;
    freightPriceFormated: string;
    purchasePriceFormated: string;
    commissionPriceFormated: string;
    totalValueFormated: string;
  };

interface CattlePurchaseListByCattleAdvisorTableProps {
  data: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleAdvisorList"];
}
export function CattlePurchaseListByCattleAdvisorTable({
  data,
}: CattlePurchaseListByCattleAdvisorTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomTable<CattlePurchaseByAdvisorTableData>
        columns={columns}
        rows={parsedData}
        tableStyles={{ height: "200px" }}
      />
    </Box>
  );
}

const getData = ({
  data,
}: CattlePurchaseListByCattleAdvisorTableProps): CattlePurchaseByAdvisorTableData[] => {
  return [...data]
    .sort((a, b) => b.totalValue - a.totalValue)
    .map((item) => ({
      ...item,
      cattleAdvisor: `${item.cattleAdvisorCode} - ${item.cattleAdvisorName}`,
      freightPriceFormated: toLocaleString(item.freightPrice),
      purchasePriceFormated: toLocaleString(item.purchasePrice),
      commissionPriceFormated: toLocaleString(item.commissionPrice),
      totalValueFormated: toLocaleString(item.totalValue),
    }));
};

const getColumns =
  (): CustomTableColumn<CattlePurchaseByAdvisorTableData>[] => [
    {
      headerKey: "cattleAdvisor",
      headerName: "Assessor",
      sx: { fontSize: "9.5px", px: 1 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleQuantity",
      headerName: "Cabeças",
      sx: { fontSize: "9.5px", px: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "purchasePriceFormated",
      headerName: "$ Compra",
      sx: { fontSize: "9.5px", px: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "freightPriceFormated",
      headerName: "$ Frete",
      sx: { fontSize: "9.5px", px: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "commissionPriceFormated",
      headerName: "$ Comissão",
      sx: { fontSize: "9.5px", px: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalValueFormated",
      headerName: "$ Total",
      sx: { fontSize: "9.5px", px: 0.5 },
      cellSx: { fontSize: "9px", fontWeight: 600 },
    },
  ];
