import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { stringSubstr, toLocaleString, toPercent } from "@/utils/string.utils";
import { Typography, Box, TableCell } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LegendProps,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

interface CattlePurchaseByCompanyGraphProps {
  data: Record<
    string,
    {
      companyCode: string;
      companyName: string;
      cattleQuantity: number;
      totalValue: number;
      percent: number;
    }
  >;
}
export function CattlePurchaseByCompanyGraph({
  data,
}: CattlePurchaseByCompanyGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dataTransposed = getData({ data });

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={dataTransposed}
        layout='horizontal'
        margin={{ top: 8, right: 16, left: -24, bottom: 0 }}
        style={{ fontFamily: "roboto", fontSize: 8 }}
      >
        <XAxis
          dataKey='name'
          type='category'
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => stringSubstr(value, 25)}
          interval={0}
          tick={({ x, y, payload }) => {
            return (
              <text
                x={x} // desloca à esquerda
                y={y}
                textAnchor='end'
                fontSize={8}
                fontFamily='roboto'
                transform={`rotate(-35 ${x} ${y})`}
              >
                {stringSubstr(payload.value, 10)}
              </text>
            );
          }}
        />

        <YAxis
          type='number'
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => toPercent(value)}
        />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey='percent' fill={indigo["A400"]} radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const getData = ({ data }: CattlePurchaseByCompanyGraphProps) => {
  const keys = Object.keys(data);

  const response: { name: string; totalValue: number; percent: number }[] = [];
  for (const key of keys) {
    response.push({
      name: `${data[key].companyCode} - ${data[key].companyName}`,
      totalValue: data[key].totalValue,
      percent: data[key].percent,
    });
  }

  return response.sort((a, b) => b.percent - a.percent);
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
            <Box>
              <Typography variant='body2'>{`${item?.payload?.name}`}</Typography>
              <Typography>
                $ {toLocaleString(item.payload.totalValue, 2)} - %{" "}
                {toPercent(item.payload.percent)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  }

  return null;
};
