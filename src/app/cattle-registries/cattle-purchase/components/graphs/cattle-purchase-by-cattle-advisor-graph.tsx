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
interface CattlePurchaseByCattleAdvisorGraphProps {
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
export function CattlePurchaseByCattleAdvisorGraph({
  data,
}: CattlePurchaseByCattleAdvisorGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dataTransposed = getData({ data });

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
        <Pie
          dataKey='percent'
          data={dataTransposed}
          cx='50%'
          cy='50%'
          outerRadius={75}
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
        <Legend
          layout='vertical'
          align='right'
          verticalAlign='top'
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

const getData = ({ data }: CattlePurchaseByCattleAdvisorGraphProps) => {
  const keys = Object.keys(data);

  const response: { name: string; totalValue: number; percent: number }[] = [];
  for (const key of keys) {
    response.push({
      name: key,
      percent: data[key].percent,
      totalValue: data[key].totalValue,
    });
  }

  return response.sort((a, b) => b.percent - a.percent);
};

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <table
      style={{
        height: "100%",
        display: "block", // Permite scroll na tabela
        fontFamily: "roboto",
        fontSize: "9px",
        borderCollapse: "collapse",
      }}
    >
      <thead style={{ position: "sticky", top: 0 }}>
        <tr style={{ display: "flex", gap: 2 }}>
          <th style={{ width: 15, textAlign: "center" }}></th>
          <th style={{ width: 120, textAlign: "left" }}>Assessor</th>
          <th style={{ width: 80, textAlign: "left" }}>Total R$</th>
          <th style={{ width: 50, textAlign: "left" }}>%</th>
        </tr>
      </thead>
      <tbody style={{ display: "block", height: "90%", overflowY: "auto" }}>
        {payload.map((entry: any, index: number) => (
          <tr
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <td style={{ width: 15, textAlign: "center" }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: entry.color,
                  display: "inline-block",
                  borderRadius: "50%",
                }}
              />
            </td>
            <td style={{ width: 120 }}>{entry.payload.name}</td>
            <td style={{ width: 80 }}>
              {toLocaleString(entry.payload.totalValue, 2)}
            </td>
            <td style={{ width: 50 }}>{toPercent(entry.payload.percent)}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
