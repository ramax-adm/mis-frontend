import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { stringSubstr, toLocaleString, toPercent } from "@/utils/string.utils";
import { Typography, Box, TableCell } from "@mui/material";
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LegendProps,
} from "recharts";

const COLORS = [
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

interface CattlePurchaseByCattleOwnerGraphProps {
  data: Record<
    string,
    {
      cattleQuantity: number;
      freightPrice: number;
      purchasePrice: number;
      commissionPrice: number;
      totalValue: number;
      percent: number;
    }
  >;
}
export function CattlePurchaseByCattleOwnerGraph({
  data,
}: CattlePurchaseByCattleOwnerGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dataTransposed = getData({ data });

  return (
    <>
      <Typography fontSize={12} fontWeight={700}>
        Top 10 pecuaristas
      </Typography>

      <ResponsiveContainer width='100%' height={230}>
        <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
          <Pie
            dataKey='percent'
            data={dataTransposed}
            cx='50%'
            cy='50%'
            outerRadius={95}
            innerRadius={70}
            strokeWidth={1}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
              payload,
            }) => {
              // Calculo de radiano para saber a posição das legendas
              const RADIAN = Math.PI / 180;
              const radius = 12 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                // Legenda
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
                    {stringSubstr(payload?.name, 20)} - ({toPercent(value)})
                  </tspan>
                </text>
              );
            }}
          >
            {dataTransposed.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={hoveredIndex === index ? 0.8 : 1} // Só a fatia com hover recebe 0.8
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

const getData = ({ data }: CattlePurchaseByCattleOwnerGraphProps) => {
  const entries = Object.entries(data).map(([name, value]) => ({
    name,
    percent: value.percent,
    totalValue: value.totalValue,
  }));

  // Ordena do maior para o menor
  const sorted = entries.sort((a, b) => b.percent - a.percent);

  // Top 10
  const top10 = sorted.slice(0, 10);

  // Restante → "Outros"
  const others = sorted.slice(10);

  if (others.length === 0) {
    return top10;
  }

  const othersAgg = others.reduce(
    (acc, cur) => {
      acc.totalValue += cur.totalValue;
      acc.percent += cur.percent;
      return acc;
    },
    {
      name: "Outros",
      totalValue: 0,
      percent: 0,
    }
  );
  return [...top10];
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
            <Typography variant='body2'>{`${item.name}: ${toPercent(item.value)}`}</Typography>
          );
        })}
      </Box>
    );
  }

  return null;
};
