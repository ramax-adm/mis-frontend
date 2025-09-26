import {
  GetBusinessAuditSalesClientAgg,
  GetBusinessAuditSalesProductAgg,
  GetBusinessAuditSalesRepresentativeAgg,
} from "@/types/api/business-audit";
import { formatToDateMinified } from "@/utils/formatToDate";
import { stringSubstr, toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Customized,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoaderIcon } from "../customized/loader-icon";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";

type ParsedDataItem = {
  id?: string;
  name: string;
  totalFatValue: number;
  percent: number;
  acc: number;
};

type GetDataResponse = {
  top10: ParsedDataItem[];
  rest: ParsedDataItem[];
};

const COLORS_TOP_10 = [
  "#1E1B4B", // Indigo 950
  "#312E81", // Indigo 900
  "#3730A3", // Indigo 800
  "#4338CA", // Indigo 700
  "#4F46E5", // Indigo 600
  "#6366F1", // Indigo 500
  "#818CF8", // Indigo 400
  "#A5B4FC", // Indigo 300
  "#C7D2FE", // Indigo 200
  "#E0E7FF", // Indigo 100
];

// const COLORS = [
//   "#064E3B", // VERDE 900
//   "#065F46", // VERDE 800
//   "#047857", // VERDE 700
//   "#059669", // VERDE 600
//   "#10B981", // VERDE 500
//   "#34D399", // VERDE 400
//   "#6EE7B7", // VERDE 300
//   "#A7F3D0", // VERDE 200
//   "#D1FAE5", // VERDE 100
//   "#ECFDF5", // VERDE 50
// ];

interface SalesByRepresentativeGraphProps {
  data?: Record<string, GetBusinessAuditSalesRepresentativeAgg>;
  isFetching?: boolean;
}
export function SalesByRepresentativeGraph({
  data = {},
  isFetching,
}: SalesByRepresentativeGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { top10, rest } = getData({ data });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <>
      <Typography fontSize={12} fontWeight={700}>
        Top 10 Produtos
      </Typography>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
          <Pie
            dataKey='totalFatValue'
            data={top10}
            cx='50%'
            cy='50%'
            outerRadius={85}
            innerRadius={60}
            strokeWidth={1}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            labelLine={false}
            label={<CustomLabel />}
          >
            {top10.map((entry, index) => (
              <Cell
                key={`cell-top-${index}`}
                fill={COLORS_TOP_10[index % COLORS_TOP_10.length]}
                fillOpacity={hoveredIndex === index ? 0.8 : 1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <Box>
        <CustomGraphTable data={{ top10, rest }} />
      </Box>
      {/** Use a table aqui: */}
    </>
  );
}

const getData = ({
  data,
}: SalesByRepresentativeGraphProps): GetDataResponse => {
  if (!data) {
    return { top10: [], rest: [] };
  }

  const response: ParsedDataItem[] = Object.values(data).map((value) => ({
    id: value.salesRepresentativeCode,
    name: `${value.salesRepresentativeCode} - ${value.salesRepresentativeName}`,
    totalFatValue: value.totalFatValue,
    percent: value.percentValue,
    acc: 0, // será recalculado depois
  }));

  // Ordena por valor
  let accumulated = 0;
  const sorted = response
    .sort((a, b) => b.totalFatValue - a.totalFatValue)
    .map((item) => {
      accumulated += item.percent;
      return { ...item, acc: accumulated };
    });

  // Top 10
  const top10 = sorted.slice(0, 10);

  // Restante (11º até 15º)
  const middle = sorted.slice(10, 15);

  // Soma do 16º em diante
  const othersTotal = sorted.slice(15).reduce(
    (acc, curr) => ({
      totalFatValue: acc.totalFatValue + curr.totalFatValue,
      percent: acc.percent + curr.percent,
    }),
    { totalFatValue: 0, percent: 0 }
  );

  let rest: ParsedDataItem[] = [...middle];

  if (othersTotal.totalFatValue > 0) {
    // pega o último acumulado calculado até agora
    const lastAcc =
      middle.length > 0
        ? middle[middle.length - 1].acc
        : top10[top10.length - 1].acc;

    rest = [
      ...middle,
      {
        name: "Outros",
        totalFatValue: othersTotal.totalFatValue,
        percent: othersTotal.percent,
        acc: lastAcc + othersTotal.percent,
      },
    ];
  }

  return { top10, rest };
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          backgroundColor: "#EEEEEE",
          borderRadius: 2,
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        className='custom-tooltip'
      >
        {payload.map((item: any) => {
          return (
            <>
              <Typography variant='caption'>{`${item.name}`}</Typography>
              <Typography variant='body2'>{`Faturamento $: ${toLocaleString(item.value)} - ${toPercent(item.payload.percent)}`}</Typography>
            </>
          );
        })}
      </Box>
    );
  }

  return null;
};

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  payload,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = 12 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      style={{
        fontSize: "8.5px",
        fontFamily: "roboto",
        fontWeight: 500,
      }}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline='central'
    >
      <tspan x={x} dy='-1em'>
        {stringSubstr(payload?.name, 30)}
      </tspan>
      <tspan x={x} dy='1.1em'>
        {toLocaleString(value)} - {toPercent(payload.percent)}
      </tspan>
    </text>
  );
};

export const CustomGraphTable = ({ data }: { data: GetDataResponse }) => {
  // calcula o acumulado em %
  const rows = [...data.top10, ...data.rest];

  const columns: CustomTableColumn<ParsedDataItem>[] = [
    {
      headerKey: "name",
      headerName: "Representante",
      align: "left",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalFatValue",
      headerName: "Fat (R$)",
      align: "right",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
      format: (value) => toLocaleString(value),
    },
    {
      headerKey: "percent",
      headerName: "%",
      align: "right",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
      format: (value) => toPercent(value),
    },
    {
      headerKey: "acc",
      headerName: "% Acc",
      align: "right",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
      format: (value) => toPercent(value),
    },
  ];

  return (
    <Box margin={2}>
      <CustomTable<ParsedDataItem>
        columns={columns}
        rows={rows}
        tableStyles={{ height: "150px" }}
      />
    </Box>
  );
};
