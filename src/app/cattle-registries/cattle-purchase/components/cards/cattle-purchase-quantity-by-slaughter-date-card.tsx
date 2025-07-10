import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, Box, Typography } from "@mui/material";
import { formatToDateMinified } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { CattlePurchaseCustomizedCard } from "../customized/card";
import dayjs from "dayjs";

interface CattlePurchaseQuantityBySlaughterDateCardProps {
  data?: Record<string, number>;
}
export function CattlePurchaseQuantityBySlaughterDateCard({
  data,
}: CattlePurchaseQuantityBySlaughterDateCardProps) {
  const dataTransposed = getData({ data });
  const haveSomeData =
    data && dataTransposed.some((item) => item.cattleQuantity > 0);

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Qtd. cabeças compradas (Dia)'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && (
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={dataTransposed}
            margin={{
              top: 20,
              left: -30,
              right: 10,
            }}
          >
            <XAxis
              dataKey='date'
              fontSize={"8px"}
              fontFamily='roboto'
              fontWeight={500}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey='cattleQuantity'
              fontSize={"8px"}
              fontFamily='roboto'
              fontWeight={500}
              axisLine={false}
            />
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#0B2B5E' stopOpacity={0.9} />
                <stop offset='95%' stopColor='#0B2B5E' stopOpacity={0.2} />
              </linearGradient>
            </defs>
            {/* <YAxis dataKey='cattleQuantity' /> */}
            <Tooltip content={<CustomTooltip />} />

            <Area
              type='monotone'
              dataKey='cattleQuantity'
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
              stroke={"#0B2B5E"}
              fill='url(#fillDesktop)'
              fillOpacity={0.4}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  );
}

const getData = ({ data }: CattlePurchaseQuantityBySlaughterDateCardProps) => {
  const response: { date: string; cattleQuantity: number }[] = [];
  if (!data) {
    return response;
  }
  const keys = Object.keys(data);

  for (const key of keys) {
    console.log({ key });

    const parsedDate = formatToDateMinified(
      dayjs(new Date(key)).add(3, "hour") as any
    );
    response.push({ date: parsedDate, cattleQuantity: data[key] });
  }

  return response;
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
            <Typography variant='body2'>{`Cabeças: ${toLocaleString(item.value)}`}</Typography>
          );
        })}
      </Box>
    );
  }

  return null;
};
