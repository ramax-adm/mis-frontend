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
import PaginatedTable from "@/components/Table/paginated-table";
import { green, grey, indigo, red } from "@mui/material/colors";
import { formatToDate } from "@/utils/formatToDate";

type InvoiceTraceabilityReInvoicingTraceabilityTableData =
  GetBusinessAuditInvoiceTraceabilityDataResponse["reinvoicingsTraceability"][0] & {
    company: string;
    dateFormated: string;
    client: string;
    representative: string;
    product: string;
    weightInKgFormated: string;
    saleUnitPriceFormated: string;
    tableUnitPriceFormated: string;
    invoicingValueFormated: string;
    tableValueFormated: string;
    invoiceDifValueFormated: string;
    reInvoicingDateFormated: string;
    reInvoicingProduct: string;
    reInvoicingClient: string;
    reInvoicingWeightInKgFormated: string;
    reInvoicingUnitPriceFormated: string;
    reInvoicingValueFormated: string;
    reInvoicingTableValueFormated: string;
    reInvoicingDifFormated: string;
    difWeightInKgFormated: string;
    difSaleUnitPriceFormated: string;
    difValueFormated: string;
    difValuePercentFormated: string;
    returnValueFormated: string;
    returnWeightInKgFormated: string;
  };

interface InvoiceTraceabilityReInvoicingTraceabilityTableProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["reinvoicingsTraceability"];
  isFetching: boolean;
}
export function InvoiceTraceabilityReInvoicingTraceabilityTable({
  data,
  isFetching,
}: InvoiceTraceabilityReInvoicingTraceabilityTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const titleGroups = getTitleGroups();

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <PaginatedTable<InvoiceTraceabilityReInvoicingTraceabilityTableData>
      titleGroups={titleGroups}
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "400px" }}
    />
  );
}

const getTitleGroups = () => {
  return [
    {
      label: "Vendas",
      colSpan: 13,
      sx: {
        backgroundColor: green["600"],
        color: "white",
      },
    },
    {
      label: "Refaturamentos",
      colSpan: 10,
      sx: {
        backgroundColor: red["600"],
        color: "white",
      },
    },
    {
      label: "Diferenças",
      colSpan: 5,
      sx: {
        backgroundColor: grey["600"],
        color: "white",
      },
    },
    {
      label: "Devoluções",
      colSpan: 8,
      sx: {
        backgroundColor: indigo["600"],
        color: "white",
      },
    },
  ];
};

const getData = ({
  data = [],
}: {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["reinvoicingsTraceability"];
}): InvoiceTraceabilityReInvoicingTraceabilityTableData[] => {
  return data.map((item) => ({
    ...item,
    // company: `${item.companyCode} - ${item.companyName}`,
    // quantityPercentFormated: toPercent(item.quantityPercent ?? 0),
    // invoiceValueFormated: toLocaleString(item.invoiceValue ?? 0, 2),
    // referenceTableValueFormated: toLocaleString(
    //   item.referenceTableValue ?? 0,
    //   2,
    // ),
    // difValueFormated: toLocaleString(item.difValue ?? 0, 2),
    // difPercentFormated: toPercent(item.difPercent ?? 0),
    company: `${item.companyCode} - ${item.companyName}`,
    dateFormated: formatToDate(item.date!),
    client: `${item.clientCode} - ${item.clientName}`,
    representative: `${item.salesRepresentativeCode} - ${item.salesRepresentativeName}`,
    product: `${item.productCode} - ${item.productName}`,
    weightInKgFormated: toLocaleString(item.weightInKg ?? 0),
    saleUnitPriceFormated: toLocaleString(item.saleUnitPrice ?? 0, 2),
    tableUnitPriceFormated: toLocaleString(item.tableUnitPrice ?? 0, 2),
    invoicingValueFormated: toLocaleString(item.invoicingValue ?? 0),
    tableValueFormated: toLocaleString(item.tableValue ?? 0),
    invoiceDifValueFormated: toLocaleString(
      item.invoicingValue - item.tableValue,
    ),
    reInvoicingDateFormated: formatToDate(item.reInvoicingDate!),
    reInvoicingProduct: `${item.reInvoicingProductCode} - ${item.reInvoicingProductName}`,
    reInvoicingClient: `${item.reInvoicingClientCode} - ${item.reInvoicingClientName}`,
    reInvoicingWeightInKgFormated: toLocaleString(
      item.reInvoicingWeightInKg ?? 0,
    ),
    reInvoicingUnitPriceFormated: toLocaleString(
      item.reInvoicingUnitPrice ?? 0,
      2,
    ),
    reInvoicingValueFormated: toLocaleString(item.reInvoicingValue ?? 0),
    reInvoicingTableValueFormated: toLocaleString(
      item.reInvoicingTableValue ?? 0,
    ),
    reInvoicingDifFormated: toLocaleString(item.reInvoicingDif ?? 0),
    difWeightInKgFormated: toLocaleString(item.difWeightInKg ?? 0),
    difSaleUnitPriceFormated: toLocaleString(item.difSaleUnitPrice ?? 0, 2),
    difValueFormated: toLocaleString(item.difValue ?? 0),
    difValuePercentFormated: toPercent(item.difValuePercent),
    returnWeightInKgFormated: toLocaleString(item.returnWeightInKg ?? 0),
    returnValueFormated: toLocaleString(item.returnValue ?? 0),
  }));
  // .sort((a, b) => b.difPercent - a.difPercent);
};

const getColumns =
  (): CustomTableColumn<InvoiceTraceabilityReInvoicingTraceabilityTableData>[] => [
    {
      headerKey: "company",
      headerName: "Empresa",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "dateFormated",
      headerName: "Dt.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "nfNumber",
      headerName: "NF",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "representative",
      headerName: "Representante",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "category",
      headerName: "Categoria",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "product",
      headerName: "Produto",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "weightInKgFormated",
      headerName: "KG",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "saleUnitPriceFormated",
      headerName: "$Fat. Un.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "tableUnitPriceFormated",
      headerName: "$Tab Un.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "invoicingValueFormated",
      headerName: "$Fat",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "tableValueFormated",
      headerName: "$Tab",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "invoiceDifValueFormated",
      headerName: "$Desc",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: green["200"] },
      cellSx: { fontSize: "9px", bgcolor: green["50"] },
    },
    {
      headerKey: "reInvoicingDateFormated",
      headerName: "Dt.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingNfNumber",
      headerName: "NF",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingNfSituation",
      headerName: "NF Status",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingProduct",
      headerName: "Produto",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingClient",
      headerName: "Cliente",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingWeightInKgFormated",
      headerName: "KG",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingUnitPriceFormated",
      headerName: "$Fat. Un.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingValueFormated",
      headerName: "$Fat.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingTableValueFormated",
      headerName: "$Tab",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "reInvoicingDifFormated",
      headerName: "$Desc",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: red["200"] },
      cellSx: { fontSize: "9px", bgcolor: red["50"] },
    },
    {
      headerKey: "difDays",
      headerName: "Dias",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: grey["200"] },
      cellSx: { fontSize: "9px", bgcolor: grey["50"] },
    },
    {
      headerKey: "difWeightInKgFormated",
      headerName: "KG",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: grey["200"] },
      cellSx: { fontSize: "9px", bgcolor: grey["50"] },
    },
    {
      headerKey: "difSaleUnitPriceFormated",
      headerName: "$Fat Un.",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: grey["200"] },
      cellSx: { fontSize: "9px", bgcolor: grey["50"] },
    },
    {
      headerKey: "difValueFormated",
      headerName: "$Fat",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: grey["200"] },
      cellSx: { fontSize: "9px", bgcolor: grey["50"] },
    },
    {
      headerKey: "difValuePercentFormated",
      headerName: "%Fat",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: grey["200"] },
      cellSx: { fontSize: "9px", bgcolor: grey["50"] },
    },
    {
      headerKey: "occurrenceNumber",
      headerName: "B.O",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },

    {
      headerKey: "returnType",
      headerName: "Tipo",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },
    {
      headerKey: "occurrenceCause",
      headerName: "Motivo",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },
    {
      headerKey: "occurrenceNf",
      headerName: "NF",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },
    {
      headerKey: "returnWeightInKgFormated",
      headerName: "KG",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },
    {
      headerKey: "returnValueFormated",
      headerName: "$ Valor",
      sx: { fontSize: "9.5px", paddingX: 0.5, bgcolor: indigo["200"] },
      cellSx: { fontSize: "9px", bgcolor: indigo["50"] },
    },

    // {
    //   headerKey: "tableValueFormated",
    //   headerName: "$ Tab.",
    //   sx: { fontSize: "9.5px", paddingX: 0.5 },
    //   cellSx: { fontSize: "9px" },
    // },
    // {
    //   headerKey: "difValueFormated",
    //   headerName: "$ Desc.",
    //   sx: { fontSize: "9.5px", paddingX: 0.5 },
    //   cellSx: { fontSize: "9px" },
    // },
    // {
    //   headerKey: "difPercentFormated",
    //   headerName: "% Desc.",
    //   sx: { fontSize: "9.5px", paddingX: 0.5 },
    //   cellSx: { fontSize: "9px" },
    // },
  ];
