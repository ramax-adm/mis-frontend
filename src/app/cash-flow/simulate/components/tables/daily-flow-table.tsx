import { Card } from "@/components/Card";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { ProjectDailyFlowResponse } from "@/types/cash-flow";
import { Box, Grid } from "@mui/material";

interface DailyFlowTableProps {
  data: Pick<ProjectDailyFlowResponse, "dailyFlow">;
}
export function DailyFlowTable({ data }: DailyFlowTableProps) {
  const columns = getColumns();

  return (
    <Box
      marginTop={6}
      sx={{
        width: { xs: "350px", sm: "430px", md: "820px", xl: "98%" },
      }}
    >
      <Card.Root
        sx={{
          height: "750px",
          width: "100",
          padding: 1,
          gap: 1,
        }}
      >
        <Card.Title>Fluxo Diario</Card.Title>
        <Card.Content sx={{ height: "100%" }}>
          <CustomizedTable<any>
            tableStyles={{
              maxHeight: "700px",
              width: "100%",
            }}
            cellStyles={{
              fontSize: "10px",
              paddingX: 1,
              paddingY: 0.2,
            }}
            headCellStyles={{
              paddingX: 1,
              paddingY: 0.2,
              fontSize: "11px",
            }}
            columns={columns}
            data={data.dailyFlow}
          />
        </Card.Content>
      </Card.Root>
    </Box>
  );
}

const getColumns = (): Column<ProjectDailyFlowResponse>[] => {
  return [
    {
      headerName: "Dia",
      type: "string",
      value: {
        first: {
          value: "dia",
        },
      },
    },
    {
      headerName: "Compra R$",
      type: "string",
      value: {
        first: {
          value: "compraBoi",
        },
      },
    },
    {
      headerName: "Frete R$",
      type: "string",
      value: {
        first: {
          value: "freteBoi",
        },
      },
    },
    {
      headerName: "Arrend. R$",
      type: "string",
      value: {
        first: {
          value: "arrend",
        },
      },
    },
    {
      headerName: "Embalagem R$",
      type: "string",
      value: {
        first: {
          value: "embalagem",
        },
      },
    },
    {
      headerName: "M.O.D R$",
      type: "string",
      value: {
        first: {
          value: "mod",
        },
      },
    },
    {
      headerName: "Frete MI R$",
      type: "string",
      value: {
        first: {
          value: "freteMi",
        },
      },
    },
    {
      headerName: "Comissão MI R$",
      type: "string",
      value: {
        first: {
          value: "comissaoMi",
        },
      },
    },
    {
      headerName: "Imposto MI R$",
      type: "string",
      value: {
        first: {
          value: "impostoMi",
        },
      },
    },
    {
      headerName: "Frete Rod. R$",
      type: "string",
      value: {
        first: {
          value: "freteRodMe",
        },
      },
    },
    {
      headerName: "Porto R$",
      type: "string",
      value: {
        first: {
          value: "portoMe",
        },
      },
    },
    {
      headerName: "Frete Marit R$",
      type: "string",
      value: {
        first: {
          value: "maritMe",
        },
      },
    },
    {
      headerName: "Desp. Financ. R$",
      type: "string",
      value: {
        first: {
          value: "financMe",
        },
      },
    },
    {
      headerName: "Saidas R$",
      type: "string",
      value: {
        first: {
          value: "saidas",
        },
      },
    },
    {
      headerName: "Rec. 40",
      type: "string",
      value: {
        first: {
          value: "recMe40",
        },
      },
    },
    {
      headerName: "Rec. 60",
      type: "string",
      value: {
        first: {
          value: "recMe60",
        },
      },
    },
    {
      headerName: "Receitas ME",
      type: "string",
      value: {
        first: {
          value: "recMe",
        },
      },
    },
    {
      headerName: "Receitas MI",
      type: "string",
      value: {
        first: {
          value: "recMi",
        },
      },
    },
    {
      headerName: "Receita Total",
      type: "string",
      value: {
        first: {
          value: "recTotal",
        },
      },
    },
    {
      headerName: "Rec. - Desp.",
      type: "string",
      value: {
        first: {
          value: "recTotalWithExpenses",
        },
      },
    },
    {
      headerName: "Acumulado",
      type: "string",
      value: {
        first: {
          value: "acc",
        },
      },
    },
  ];
};
