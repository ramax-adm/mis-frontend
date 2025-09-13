import {
  GetBusinessAuditSalesClientAgg,
  GetBusinessAuditSalesProductAgg,
  GetBusinessAuditSalesRepresentativeAgg,
} from "@/types/api/business-audit";
import { formatToDateMinified } from "@/utils/formatToDate";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoaderIcon } from "../customized/loader-icon";

const COLORS = [
  "#0B2B5E", // Azul 800
  "#0F3775", // Azul 700
  "#1E478D", // Azul 600
  "#2D5AA1", // Azul 500
  "#4D7FC9", // Azul 400
  "#7BA0D6", // Azul 300
  "#A9C0E4", // Azul 200
  "#D6E1F1", // Azul 100
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

  const dataTransposed = getData({ data });

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
    <ResponsiveContainer width='100%' height={250}>
      <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
        <Pie
          dataKey='totalFatValue'
          data={dataTransposed}
          cx='50%'
          cy='50%'
          outerRadius={85}
          strokeWidth={1.5}
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
                {/* sobe/abaixa o bloco inteiro */}
                {payload?.name && (
                  <tspan x={x} dy='-1em'>
                    {payload.name}
                  </tspan>
                )}

                {/* mais próximo do nome */}
                <tspan x={x} dy='1.1em'>
                  {toLocaleString(value)}
                </tspan>
              </text>
            );
          }}
        >
          {dataTransposed.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name === "Outros"
                  ? "#3e63ddff"
                  : COLORS[index % COLORS.length]
              }
              fillOpacity={hoveredIndex === index ? 0.8 : 1} // Só a fatia com hover recebe 0.8
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

const getData = ({ data }: SalesByRepresentativeGraphProps) => {
  const response: { id?: string; name: string; totalFatValue: number }[] = [];
  if (!data) {
    return response;
  }

  const values = Object.values(data);

  for (const value of values) {
    response.push({
      id: value.salesRepresentativeCode,
      name: `${value.salesRepresentativeCode} - ${value.salesRepresentativeName}`,
      totalFatValue: value.totalFatValue,
    });
  }

  // Ordena por valor
  const sorted = response.sort((a, b) => b.totalFatValue - a.totalFatValue);

  // Pega os top 9
  const top9 = sorted.slice(0, 8);

  // Soma os restantes
  const othersTotal = sorted
    .slice(8)
    .reduce((acc, curr) => acc + curr.totalFatValue, 0);

  // Se houver "outros", adiciona no final
  if (othersTotal > 0) {
    top9.push({
      name: "Outros",
      totalFatValue: othersTotal,
    });
  }

  return top9;
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
              <Typography variant='body2'>{`$: ${toLocaleString(item.value)}`}</Typography>
            </>
          );
        })}
      </Box>
    );
  }

  return null;
};
