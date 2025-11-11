import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Alert, Box } from "@mui/material";
import { AccountReceivableItem } from "@/types/finance";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { formatDateToDDMMYYYY, formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import PaginatedTable from "@/components/Table/paginated-table";

type AccountsReceivableToExpireBucketsTableData = AccountReceivableItem & {
  company: string;
  client: string;
  issueDateFormated: string;
  dueDateFormated: string;
  recognitionDateFormated: string;
  lossRecognitionDateFormated: string;
  valueFormated: string;
  openValueFormated: string;
};

interface AccountsReceivableToExpireBucketsTableProps {
  data?: AccountReceivableItem[];
  isFetching: boolean;
}
export function AccountsReceivableToExpireBucketsTable({
  data,
  isFetching,
}: AccountsReceivableToExpireBucketsTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
        }}
      >
        <Alert severity='info'>Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <CustomTable<AccountsReceivableToExpireBucketsTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "180px" }}
    />
  );
}

const getData = ({
  data = [],
}: {
  data?: AccountReceivableItem[];
}): AccountsReceivableToExpireBucketsTableData[] => {
  return data
    .map((i) => ({
      ...i,
      company: `${i.companyCode} - ${i.companyName}`,
      client: `${i.clientCode} - ${i.clientName}`,
      bucketSituation: i.bucketSituation?.replaceAll("_", " "),
      issueDateFormated: i.issueDate ? formatToDate(i.issueDate) : "",
      dueDateFormated: i.dueDate ? formatToDate(i.dueDate) : "",
      recognitionDateFormated: i.recognitionDate
        ? formatToDate(i.recognitionDate)
        : "",
      lossRecognitionDateFormated: i.lossRecognitionDate
        ? formatToDate(i.lossRecognitionDate)
        : "",
      valueFormated: toLocaleString(i.value ?? 0, 2),
      openValueFormated: toLocaleString(i.openValue ?? 0, 2),
    }))
    .sort((a, b) => {
      if (a.issueDate && b.issueDate) {
        return (
          new Date(b.issueDate)?.getTime() - new Date(a.issueDate)?.getTime()
        );
      }
      return 0;
    });
};

const getColumns =
  (): CustomTableColumn<AccountsReceivableToExpireBucketsTableData>[] => [
    {
      headerKey: "issueDateFormated",
      headerName: "Dt. Emissão",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "dueDateFormated",
      headerName: "Dt. Venc.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "recognitionDateFormated",
      headerName: "Dt. Baixa",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "lossRecognitionDateFormated",
      headerName: "Dt. Perda",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "receivableNumber",
      headerName: "N° Registro",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "company",
      headerName: "Empresa",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "bucketSituation",
      headerName: "Status Bucket",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "differenceInDays",
      headerName: "Dif. Dias",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "valueFormated",
      headerName: "$ Valor",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "openValueFormated",
      headerName: "$ Aberto",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
