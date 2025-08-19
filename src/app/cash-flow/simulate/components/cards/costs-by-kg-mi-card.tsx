import { Card } from "@/components/Card";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { CostsTransposed, ProjectCostByKgResponse } from "@/types/cash-flow";
import { Typography } from "@mui/material";

interface CostsByKgMiCardProps {
  data: Pick<ProjectCostByKgResponse, "costs" | "total">;
}
export function CostsByKgMiCard({ data }: CostsByKgMiCardProps) {
  const columns = getColumns();
  return (
    <Card.Root sx={{ padding: 1, gap: 1 }}>
      <Card.Title>Custo R$/KG MI</Card.Title>
      <Card.Content sx={{ height: "100%" }}>
        <CustomizedTable<{ label: string; value: number; costByKg: number }>
          tableStyles={{
            maxHeight: "200px",
          }}
          columns={columns}
          data={data.costs.custoMi}
        />
      </Card.Content>
      <Card.Footer sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Typography
          fontWeight={700}
          fontSize={"12px"}
          sx={{ color: COLORS.TEXTO }}
        >
          TOTAL: {data.total.totalCustoMi}
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={"12px"}
          sx={{ color: COLORS.TEXTO }}
        >
          RS/KG: {data.total.totalCustoKgMi}
        </Typography>
      </Card.Footer>
    </Card.Root>
  );
}

const getColumns = (): Column<CostsTransposed>[] => {
  return [
    {
      headerName: "Custo",
      type: "string",
      value: {
        first: {
          value: "label",
        },
      },
    },
    {
      headerName: "Valor R$",
      type: "string",
      value: {
        first: {
          value: "value",
        },
      },
    },
    {
      headerName: "R$/KG",
      type: "string",
      value: {
        first: {
          value: "costByKg",
        },
      },
    },
  ];
};
