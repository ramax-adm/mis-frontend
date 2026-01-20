import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoaderIcon } from "../customized/loader-icon";
import { GetBusinessAuditReturnOccurrenceByDayAgg } from "@/types/api/business-audit";
import { formatToDate } from "@/utils/formatToDate";
import { grey, indigo } from "@mui/material/colors";

type ParsedDataItem = {
  date: Date;
  dateFormated: string;
  count: number;
  quantity: number;
  value: number;
  weightInKg: number;
};

interface ReturnOccurrencesByDayGraphProps {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByDayAgg>;
  isFetching?: boolean;
}
export function ReturnOccurrencesByDayGraph({
  data = {},
  isFetching,
}: ReturnOccurrencesByDayGraphProps) {
  const parsedData = getData({ data });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "185px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <ResponsiveContainer width='100%' height={185}>
      <AreaChart
        data={parsedData}
        margin={{
          top: 20,
          left: -40,
          right: 10,
        }}
      >
        <XAxis
          dataKey='dateFormated'
          fontSize={"8px"}
          fontFamily='roboto'
          fontWeight={500}
          tickLine={false}
          axisLine={false}
          // interval={4}
        />
        <YAxis
          dataKey='count'
          fontSize={"8px"}
          fontFamily='roboto'
          fontWeight={500}
          axisLine={false}
          tickLine={false}
        />
        <defs>
          <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={indigo["A700"]} stopOpacity={0.9} />
            <stop offset='95%' stopColor={indigo["A700"]} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid
          strokeDasharray='3 3'
          stroke={grey["200"]}
          vertical={false}
        />

        <Area
          type='monotone'
          dataKey='count'
          dot={{ r: 1 }}
          activeDot={{ r: 4 }}
          stroke={"#4F46E5"}
          fill='url(#fillDesktop)'
          fillOpacity={0.4}
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const getData = ({
  data,
}: {
  data: Record<string, GetBusinessAuditReturnOccurrenceByDayAgg>;
}) => {
  const response: ParsedDataItem[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    response.push({
      date: new Date(key),
      dateFormated: formatToDate(new Date(key)),
      count: data[key].count,
      quantity: data[key].quantity,
      value: data[key].value,
      weightInKg: data[key].weightInKg,
    });
  }

  return response.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
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
        <Typography variant='caption'>{`${label}`}</Typography>
        {payload.map((item: any) => {
          return (
            <Typography variant='body2'>{`Quantidade: ${toLocaleString(item.value)}`}</Typography>
          );
        })}
      </Box>
    );
  }

  return null;
};
