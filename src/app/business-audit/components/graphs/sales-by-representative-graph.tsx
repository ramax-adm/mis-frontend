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

const COLORS_TOP_5 = [
  "#312E81", // Azul 800
  "#4338CA", // Azul 600
  "#6366F1", // Azul 500
  "#A5B4FC", // Azul 300
  "#E0E7FF", // Azul 200
];

const COLORS = [
  "#064E3B", // VERDE 900
  "#065F46", // VERDE 800
  "#047857", // VERDE 700
  "#059669", // VERDE 600
  "#10B981", // VERDE 500
  "#34D399", // VERDE 400
  "#6EE7B7", // VERDE 300
  "#A7F3D0", // VERDE 200
  "#D1FAE5", // VERDE 100
  "#ECFDF5", // VERDE 50
];

interface SalesByRepresentativeGraphProps {
  data?: Record<string, GetBusinessAuditSalesRepresentativeAgg>;
  isFetching?: boolean;
}
export function SalesByRepresentativeGraph({
  data = {},
  isFetching,
}: SalesByRepresentativeGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { top5, rest } = getData({ data });

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
      {/* Top 5 */}
      <Typography fontSize={12} fontWeight={700}>
        Top 5 representantes
      </Typography>
      <ResponsiveContainer width='100%' height={180}>
        <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
          <Pie
            dataKey='totalFatValue'
            data={top5}
            cx='50%'
            cy='50%'
            outerRadius={65}
            innerRadius={45}
            strokeWidth={1}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            labelLine={false}
            label={<CustomLabel />}
          >
            {top5.map((entry, index) => (
              <Cell
                key={`cell-top-${index}`}
                fill={COLORS_TOP_5[index % COLORS_TOP_5.length]}
                fillOpacity={hoveredIndex === index ? 0.8 : 1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Restante */}
      <Typography fontSize={12} fontWeight={700}>
        Restante dos representantes
      </Typography>
      <ResponsiveContainer width='100%' height={180}>
        <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
          <Pie
            dataKey='totalFatValue'
            data={rest}
            cx='50%'
            cy='50%'
            outerRadius={55}
            strokeWidth={1}
            labelLine={false}
            label={<CustomLabel />}
          >
            {rest.map((entry, index) => (
              <Cell
                key={`cell-rest-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

const getData = ({ data }: SalesByRepresentativeGraphProps) => {
  const response: {
    id?: string;
    name: string;
    totalFatValue: number;
    percent: number;
  }[] = [];
  if (!data) {
    return { top5: [], rest: [] };
  }

  const values = Object.values(data);

  for (const value of values) {
    response.push({
      id: value.salesRepresentativeCode,
      name: `${value.salesRepresentativeCode} - ${value.salesRepresentativeName}`,
      totalFatValue: value.totalFatValue,
      percent: value.percentValue,
    });
  }

  // Ordena por valor
  const sorted = response.sort((a, b) => b.totalFatValue - a.totalFatValue);

  // Top 5
  const top5 = sorted.slice(0, 5);

  // Restante
  // Do 6º até o 15º
  const middle = sorted.slice(5, 15);

  // Soma do 16º em diante
  const othersTotal = sorted.slice(15).reduce(
    (acc, curr) => ({
      totalFatValue: acc.totalFatValue + curr.totalFatValue,
      percent: acc.percent + curr.percent,
    }),
    { totalFatValue: 0, percent: 0 }
  );

  // Monta o restante
  const rest =
    othersTotal.totalFatValue > 0
      ? [
          ...middle,
          {
            name: "Outros",
            totalFatValue: othersTotal.totalFatValue,
            percent: othersTotal.percent,
          },
        ]
      : middle;

  return { top5, rest };
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
