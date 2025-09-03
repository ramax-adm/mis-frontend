import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { COLORS } from "@/constants/styles/colors";
import { useGetAnalyticalCattlePurchaseFreights } from "@/services/react-query/queries/freights";
import { GetAnalyticalCattlePurchaseFreightsResponse } from "@/types/api/freights";
import { fromLocaleStringToNumber, toLocaleString } from "@/utils/number.utils";
import { Box, TableCell, Typography } from "@mui/material";
import { green, grey, orange, red, yellow } from "@mui/material/colors";

interface CattleFreightsTableProps {
  companyCode: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: string | null;
  freightCompany: string | null;
}
export function CattleFreightsTable({
  companyCode,
  startDate,
  endDate,
  status,
  freightCompany,
}: CattleFreightsTableProps) {
  const columns = getColumns();
  const { data: cattleFreights, isFetching: isFetchingCattleFreights } =
    useGetAnalyticalCattlePurchaseFreights({
      companyCode,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      status,
      freightCompany,
    });

  if (isFetchingCattleFreights) {
    return <LoadingOverlay />;
  }

  if (!cattleFreights) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "rgba(190, 23, 23, 0.2)",
            color: "#BE1717",
          }}
        >
          <Typography fontWeight={700} fontSize={"10px"}>
            Fretes em aberto
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.openFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.openFreights.cattleQuantity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Med. Dias (Até HOJE)</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.openFreights.openDays}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "#ffe0b2",
            color: "#e65100",
          }}
        >
          <Typography fontWeight={700} fontSize={"10px"}>
            Sem Fretes
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.noFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.noFreights.cattleQuantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "rgba(27, 94, 32, 0.2)",
            color: "#1B5E20",
          }}
        >
          <Typography fontWeight={700} fontSize={"10px"}>
            Fretes Fechados
          </Typography>
          <Box sx={{ display: "inline-flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.cattleQuantity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ R$ Tabela</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.tablePrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ R$ Base</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>R$ DIF</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.difPrice}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>R$ Outros</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.otherPrices}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>R$ TOTAL</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.totalPrice}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: COLORS.FUNDO_PRIMARIO,
            color: COLORS.TEXTO,
          }}
        >
          <Typography fontWeight={700} fontSize={"10px"}>
            Totais
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"8px"}>Qtd.</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {cattleFreights.totals.quantity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"8px"}>Σ Cbs</Typography>
              <Typography fontSize={"10px"} fontWeight={700}>
                {toLocaleString(cattleFreights.totals.cattleQuantity)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <PaginatedTable<any>
        tableStyles={{
          marginTop: 1,
          height: "calc(100vh - 300px);",
          width: "100%",
        }}
        columns={columns}
        rows={cattleFreights.parsedData}
      />
    </>
  );
}
const getColumns = (): PaginatedTableColumn<any>[] => {
  return [
    {
      headerKey: "slaughterDate",
      headerName: "Data Abate",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC" },
    },
    {
      headerKey: "openDays",
      headerName: "Dias em aberto",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB", width: "70px" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC", width: "70px" },
    },
    {
      headerName: "Empresa",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC" },
      headerKey: "companyName",
    },
    {
      headerName: "OC",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC" },
      headerKey: "purchaseCattleOrderId",
    },
    {
      headerName: "Status",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB", width: "50px" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC", width: "50px" },
      headerKey: "status",
    },
    {
      headerName: "Transportadora",
      cellSx: { fontSize: "9.5px", width: "90px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", width: "90px", backgroundColor: "#A6C9EC" },
      headerKey: "freightCompanyName",
    },
    {
      headerName: "Fornecedor",
      cellSx: { fontSize: "9.5px", width: "90px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", width: "90px", backgroundColor: "#A6C9EC" },
      headerKey: "supplierName",
    },
    {
      headerName: "Assessor",
      cellSx: { fontSize: "9.5px", width: "90px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", width: "90px", backgroundColor: "#A6C9EC" },
      headerKey: "cattleAdvisorName",
    },
    {
      headerName: "Placa",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC" },
      headerKey: "freightTransportPlate",
    },
    {
      headerName: "Frota",
      cellSx: { fontSize: "9.5px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", backgroundColor: "#A6C9EC" },
      headerKey: "freightTransportType",
    },
    {
      headerName: "Fazenda",
      cellSx: { fontSize: "9.5px", width: "90px", backgroundColor: "#E9F2FB" },
      sx: { fontSize: "9.5px", width: "90px", backgroundColor: "#A6C9EC" },
      headerKey: "feedlotName",
    },
    {
      headerName: "KM Propriedade",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "feedlotKmDistance",
    },

    {
      headerName: "KM Negociado",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "negotiatedKmDistance",
    },
    {
      headerName: "Cbs",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "cattleQuantity",
    },
    {
      headerName: "R$ Asfalto",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "roadPrice",
    },
    {
      headerName: "R$ Terra",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "earthPrice",
    },
    {
      headerName: "R$ Base",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "basePrice",
    },

    {
      headerName: "R$ Tabela",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "referenceFreightTablePrice",
    },
    {
      headerName: "Dif",
      headerKey: "difPrice",
      align: "center",
      cellSx: {
        fontSize: "9.5px",
        backgroundColor: grey["900"],
        fontWeight: 700,
      },
      sx: {
        fontSize: "9.5px",
        backgroundColor: grey["900"],
        color: "white",
        width: "30px",
      },
      render: (value, row) => {
        const parsedValue = fromLocaleStringToNumber(value);
        return (
          <Typography
            fontSize={"9.5px"}
            fontWeight={700}
            color={parsedValue > 0 ? green["100"] : red["200"]}
          >
            {parsedValue}
          </Typography>
        );
      },
    },

    {
      headerName: "R$ Pedágio",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "tollPrice",
    },
    {
      headerName: "R$ Adicional",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "additionalPrice",
    },
    {
      headerName: "R$ Desconto",
      cellSx: { fontSize: "9.5px", backgroundColor: grey["200"] },
      sx: { fontSize: "9.5px", backgroundColor: grey["400"] },
      headerKey: "discountPrice",
    },
    {
      headerName: "R$ Total",
      headerKey: "negotiatedFreightPrice",
      align: "center",
      cellSx: {
        fontSize: "9.5px",
        backgroundColor: grey["900"],
        fontWeight: 700,
      },
      sx: { fontSize: "9.5px", backgroundColor: grey["900"], color: "white" },
      render: (value, row) => {
        const parsedValue = fromLocaleStringToNumber(value);
        return (
          <Typography
            fontSize={"9.5px"}
            fontWeight={700}
            color={parsedValue > 0 ? green["100"] : red["200"]}
          >
            {parsedValue}
          </Typography>
        );
      },
    },

    // {
    //   headerName: 'NFs',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'entryNf',
    //     },
    //   },
    // },
    // {
    //   headerName: 'NF Complemento',
    //   maxWidth: '50px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'complementNf',
    //     },
    //   },
    // },
  ];
};
