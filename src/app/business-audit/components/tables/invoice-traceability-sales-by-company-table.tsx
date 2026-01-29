export function InvoiceTraceabilityByCompanyTable() {}
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditReturnOccurrenceByCauseAgg,
  GetBusinessAuditReturnOccurrenceByClientAgg,
} from "@/types/api/business-audit";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";
import { toLocaleString } from "@/utils/number.utils";
import { toPercent } from "@/utils/string.utils";

type InvoiceTraceabilitySalesByCompanyTableData =
  GetBusinessAuditInvoiceTraceabilityDataResponse["salesByCompany"]["data"][1] & {
    company: string;
    quantityPercentFormated: string;
    invoiceValueFormated: string;
    referenceTableValueFormated: string;
    difValueFormated: string;
    difPercentFormated: string;
  };

interface InvoiceTraceabilitySalesByCompanyTableProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["salesByCompany"]["data"];
  isFetching: boolean;
}
export function InvoiceTraceabilitySalesByCompanyTable({
  data,
  isFetching,
}: InvoiceTraceabilitySalesByCompanyTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "290px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<InvoiceTraceabilitySalesByCompanyTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "290px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["salesByCompany"]["data"];
}): InvoiceTraceabilitySalesByCompanyTableData[] => {
  return Object.values(data)
    .map((item) => ({
      ...item,
      company: `${item.companyCode} - ${item.companyName}`,
      quantityPercentFormated: toPercent(item.quantityPercent ?? 0),
      invoiceValueFormated: toLocaleString(item.invoiceValue ?? 0, 2),
      referenceTableValueFormated: toLocaleString(
        item.referenceTableValue ?? 0,
        2,
      ),
      difValueFormated: toLocaleString(item.difValue ?? 0, 2),
      difPercentFormated: toPercent(item.difPercent ?? 0),
    }))
    .sort((a, b) => Number(a.companyCode) - Number(b.companyCode));
};

const getColumns =
  (): CustomTableColumn<InvoiceTraceabilitySalesByCompanyTableData>[] => [
    {
      headerKey: "company",
      headerName: "Empresa",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "quantity",
      headerName: "NFs",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "quantityPercentFormated",
      headerName: "Conc. %",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "invoiceValueFormated",
      headerName: "$ Fat. inicial",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "referenceTableValueFormated",
      headerName: "$ Tab.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "difValueFormated",
      headerName: "$ Desc.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
    {
      headerKey: "difPercentFormated",
      headerName: "% Desc.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px", paddingY: 1 },
    },
  ];
