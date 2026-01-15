import { ResumeFreightStatus } from "@/types/api/freights";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Typography, Box } from "@mui/material";
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

const COLORS = ["#dc2626", "#ca8a04", "#059669"];

const RADIAN = Math.PI / 180;

interface QuantityFreightsByStatusGraphProps {
  data: ResumeFreightStatus;
}
export function QuantityFreightsByStatusGraph({
  data,
}: QuantityFreightsByStatusGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dataTransposed = getData({ data });
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
        <Pie
          dataKey='value'
          data={dataTransposed}
          cx='50%'
          cy='50%'
          outerRadius={55}
          innerRadius={35}
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
                  fontSize: "9px",
                  fontFamily: "roboto",
                  fontWeight: 500,
                }}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline='central'
              >
                ({toPercent(value)})
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
        <Legend layout='horizontal' align='center' content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

const getData = ({ data }: QuantityFreightsByStatusGraphProps) => {
  return [
    {
      name: "ABERTOS",
      value: data.percentActive,
      quantity: data.quantityActive,
    },
    {
      name: "S/FRETES",
      value: data.percentNoFreight,
      quantity: data.quantityNoFreight,
    },
    {
      name: "FECHADOS",
      value: data.percentClosed,
      quantity: data.quantityClosed,
    },
  ];
};
const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        // width: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {payload.map((entry: any, index) => (
        <li
          key={`item-${index}`}
          style={{ marginBottom: 8, display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: entry.color,
              marginRight: 2,
            }}
          />
          <span
            style={{ fontFamily: "roboto", fontSize: "8px", fontWeight: 500 }}
          >
            {entry.payload.name}: {entry.payload.quantity}
          </span>
        </li>
      ))}
    </ul>
  );
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
