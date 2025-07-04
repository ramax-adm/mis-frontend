import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/body";
import { useGetAnalyticalCattlePurchaseFreights } from "@/services/react-query/queries/freights";
import { GetAnalyticalCattlePurchaseFreightsResponse } from "@/types/api/freights";
import { Box, Typography } from "@mui/material";

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

  console.log(cattleFreights.totals);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Box
          sx={{
            marginTop: 1,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "rgba(190, 23, 23, 0.2)",
            color: "#BE1717",
          }}
        >
          <Typography fontWeight={700} fontSize={"12px"}>
            Fretes em aberto
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.openFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.openFreights.cattleQuantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 1,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "#ffe0b2",
            color: "#e65100",
          }}
        >
          <Typography fontWeight={700} fontSize={"12px"}>
            Sem Fretes
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.noFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.noFreights.cattleQuantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 1,
            padding: "2px",
            borderRadius: "4px",
            backgroundColor: "rgba(27, 94, 32, 0.2)",
            color: "#1B5E20",
          }}
        >
          <Typography fontWeight={700} fontSize={"12px"}>
            Fretes Fechados
          </Typography>
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Qtd.</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ Cbs</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.cattleQuantity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ R$ Tabela</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.tablePrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Σ R$ Frete</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>R$ Dif. Tabela/Frete</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {cattleFreights.totals.closedFreights.difPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Max. Variação R$</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {`${cattleFreights.totals.closedFreights.maxFreightOutOfTable?.difPrice ?? 0} | O.C: ${cattleFreights.totals.closedFreights.maxFreightOutOfTable?.purchaseCattleOrderId ?? ""}`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography fontSize={"9px"}>Min. Variação R$</Typography>
              <Typography fontSize={"14px"} fontWeight={700}>
                {`${cattleFreights.totals.closedFreights.minFreightOutOfTable?.difPrice ?? 0} | O.C: ${cattleFreights.totals.closedFreights.minFreightOutOfTable?.purchaseCattleOrderId ?? ""}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: "calc(100vh - 300px);", marginTop: 1 }}>
        <CustomizedTable<any>
          tableStyles={{
            height: "100%",
            width: "100%",
          }}
          cellStyles={{
            paddingX: 1,
            fontSize: "10px",
            paddingY: 0.2,
          }}
          headCellStyles={{
            paddingX: 1,
            fontSize: "11px",
          }}
          columns={columns}
          data={cattleFreights.parsedData}
        />
      </Box>
    </>
  );
}
const getColumns =
  (): Column<GetAnalyticalCattlePurchaseFreightsResponse>[] => {
    return [
      {
        headerName: "Data",
        maxWidth: "80px",
        type: "string",
        value: {
          first: {
            value: "slaughterDate",
          },
        },
      },
      {
        headerName: "Empresa",
        // maxWidth: '80px',
        type: "string",
        value: {
          first: {
            value: "companyName",
          },
        },
      },
      {
        headerName: "Cod OC",
        maxWidth: "40px",
        type: "string",
        value: {
          first: {
            value: "purchaseCattleOrderId",
          },
        },
      },
      {
        headerName: "Status",
        maxWidth: "40px",
        type: "string",
        value: {
          first: {
            value: "status",
          },
        },
      },
      {
        headerName: "Transportadora",
        maxWidth: "90px",
        type: "string",
        value: {
          first: {
            value: "freightCompanyName",
          },
        },
      },
      {
        headerName: "Fornecedor",
        maxWidth: "90px",
        type: "string",
        value: {
          first: {
            value: "supplierName",
          },
        },
      },
      {
        headerName: "Assessor",
        maxWidth: "90px",
        type: "string",
        value: {
          first: {
            value: "cattleAdvisorName",
          },
        },
      },
      {
        headerName: "Placa",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "freightTransportPlate",
          },
        },
      },
      {
        headerName: "Frota",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "freightTransportType",
          },
        },
      },
      {
        headerName: "Fazenda",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "feedlotName",
          },
        },
      },
      {
        headerName: "KM Propriedade",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "feedlotKmDistance",
          },
        },
      },
      {
        headerName: "KM Negociado",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "negotiatedKmDistance",
          },
        },
      },
      {
        headerName: "Cbs",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "cattleQuantity",
          },
        },
      },
      {
        headerName: "R$ Tabela",
        //   maxWidth: '30px',
        type: "string",
        value: {
          first: {
            value: "referenceFreightTablePrice",
          },
        },
      },
      {
        headerName: "R$ Frete",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "negotiatedFreightPrice",
          },
        },
      },
      {
        headerName: "R$ Dif",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "difPrice",
          },
        },
      },
      {
        headerName: "R$/KM",
        maxWidth: "30px",
        type: "string",
        value: {
          first: {
            value: "priceKm",
          },
        },
      },
      {
        headerName: "R$/KM/CBS",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "priceKmCattleQuantity",
          },
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
