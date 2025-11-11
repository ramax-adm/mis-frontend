import {
  GetBusinessAuditSalesClientAgg,
  GetBusinessAuditSalesProductAgg,
  GetBusinessAuditSalesRepresentativeAgg,
} from "@/types/api/business-audit";
import { formatToDateMinified } from "@/utils/formatToDate";
import { stringSubstr, toLocaleString, toPercent } from "@/utils/string.utils";
import { Alert, Box, Typography } from "@mui/material";
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
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { AccountReceivableItem } from "@/types/finance";
import { AccountReceivableResumeAgg } from "@/types/api/finance";

type ParsedDataItem = AccountReceivableResumeAgg & {
  company: string;
};

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

interface AccountReceivableByCompanyGraphProps {
  data?: Record<string, AccountReceivableResumeAgg>;
  isFetching?: boolean;
}
export function AccountReceivableByCompanyGraph({
  data = {},
  isFetching,
}: AccountReceivableByCompanyGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const parsedData = getData({ data });
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "180px",
        }}
      >
        <Alert severity='info'>Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <>
      <ResponsiveContainer width='100%' height={170}>
        <PieChart style={{ fontSize: 12, fontFamily: "roboto" }}>
          <Pie
            dataKey='value'
            nameKey='company'
            data={parsedData}
            cx='50%'
            cy='50%'
            outerRadius={60}
            innerRadius={40}
            strokeWidth={1}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            labelLine={false}
            label={<CustomLabel />}
          >
            {parsedData.map((entry, index) => (
              <Cell
                key={`cell-top-${index}`}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={hoveredIndex === index ? 0.8 : 1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

const getData = ({
  data = {},
}: AccountReceivableByCompanyGraphProps): ParsedDataItem[] => {
  return Object.entries(data)
    .map(([key, value]) => ({
      ...value,
      company: key,
    }))
    .sort((a, b) => b.value - a.value);
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
              <Typography variant='body2'>{`Qtd ${toLocaleString(item.payload.quantity)}`}</Typography>
              <Typography variant='body2'>{`$ ${toLocaleString(item.payload.value)} (${toPercent(item.payload.percent)})`}</Typography>
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
        {stringSubstr(payload?.company, 30)}
      </tspan>
      <tspan x={x} dy='1.1em'>
        {toLocaleString(payload.value)} ({toPercent(payload.percent)})
      </tspan>
    </text>
  );
};
