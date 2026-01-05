import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

type CattlePurchaseByClassificationTableData = {
  cattleClassification: string;
  cattleQuantity: number;
  freightPrice: number;
  purchasePrice: number;
  commissionPrice: number;
  totalValue: number;
  freightPriceFormated: string;
  purchasePriceFormated: string;
  commissionPriceFormated: string;
  totalValueFormated: string;
};

interface CattlePurchaseListByCattleClassificationTableProps {
  data: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleClassification"];
}
export function CattlePurchaseListByCattleClassificationTable({
  data,
}: CattlePurchaseListByCattleClassificationTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomTable<CattlePurchaseByClassificationTableData>
        columns={columns}
        rows={parsedData}
        tableStyles={{ height: "200px" }}
      />
    </Box>
  );
}

const getData = ({
  data,
}: CattlePurchaseListByCattleClassificationTableProps): CattlePurchaseByClassificationTableData[] => {
  const keys = Object.keys(data);

  const response = [];
  for (const k of keys) {
    response.push({
      cattleClassification: k,
      cattleQuantity: data[k].cattleQuantity,
      freightPrice: data[k].freightPrice,
      purchasePrice: data[k].purchasePrice,
      commissionPrice: data[k].commissionPrice,
      totalValue: data[k].totalValue,
      freightPriceFormated: toLocaleString(data[k].freightPrice),
      purchasePriceFormated: toLocaleString(data[k].purchasePrice),
      commissionPriceFormated: toLocaleString(data[k].commissionPrice),
      totalValueFormated: toLocaleString(data[k].totalValue),
    });
  }

  return response.sort((a, b) => b.totalValue - a.totalValue);
};

const getColumns =
  (): CustomTableColumn<CattlePurchaseByClassificationTableData>[] => [
    {
      headerKey: "cattleClassification",
      headerName: "Classificação",
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
