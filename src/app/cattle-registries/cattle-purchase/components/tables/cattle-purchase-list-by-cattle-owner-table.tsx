import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

type CattlePurchaseByOwnerTableData =
  GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleOwnerList"][number] & {
    cattleOwner: string;
    freightPriceFormated: string;
    purchasePriceFormated: string;
    commissionPriceFormated: string;
    totalValueFormated: string;
  };

interface CattlePurchaseListByCattleOwnerTableProps {
  data: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleOwnerList"];
}
export function CattlePurchaseListByCattleOwnerTable({
  data,
}: CattlePurchaseListByCattleOwnerTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomTable<CattlePurchaseByOwnerTableData>
        columns={columns}
        rows={parsedData}
        tableStyles={{ height: "200px" }}
      />
    </Box>
  );
}

const getData = ({
  data,
}: CattlePurchaseListByCattleOwnerTableProps): CattlePurchaseByOwnerTableData[] => {
  return [...data]
    .sort((a, b) => b.totalValue - a.totalValue)
    .map((item) => ({
      ...item,
      cattleOwner: `${item.cattleOwnerCode} - ${item.cattleOwnerName}`,
      freightPriceFormated: toLocaleString(item.freightPrice),
      purchasePriceFormated: toLocaleString(item.purchasePrice),
      commissionPriceFormated: toLocaleString(item.commissionPrice),
      totalValueFormated: toLocaleString(item.totalValue),
    }));
};

const getColumns = (): CustomTableColumn<CattlePurchaseByOwnerTableData>[] => [
  {
    headerKey: "cattleOwner",
    headerName: "Pecuarista",
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
