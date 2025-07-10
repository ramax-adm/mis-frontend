import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FreightsCustomizedCard } from "../customized/card";
import { Alert, Box, Typography } from "@mui/material";
import { toLocaleString } from "@/utils/string.utils";

interface PriceByFreightCompanyCardProps {
  data: Record<string, number>;
}
export function PriceByFreightCompanyCard({
  data,
}: PriceByFreightCompanyCardProps) {
  const dataTransposed = getData({ data });
  const haveSomeData = dataTransposed.some((item) => item.price > 0);

  return (
    <FreightsCustomizedCard
      cardTitle='Valor R$ p/ Transportadora'
      sx={{ height: "200px", padding: 0.5 }}
    >
      {haveSomeData && (
        <ResponsiveContainer width={"100%"} height='100%'>
          <BarChart
            data={dataTransposed}
            layout='vertical'
            margin={{ top: 10, left: 30, right: 5 }}
          >
            <XAxis
              dataKey='price'
              type='number'
              tickFormatter={(value) => "R$ ".concat(toLocaleString(value))}
              axisLine={false}
              tickLine={false}
              fontFamily='roboto'
              width={50}
              fontSize={"8px"}
            />
            <YAxis
              dataKey='company'
              type='category'
              axisLine={false}
              tickLine={false}
              fontFamily='roboto'
              fontSize={8}
              fontWeight={500}
              tick={({ x, y, payload }) => {
                return (
                  <text
                    x={x - 80} // desloca à esquerda
                    y={y}
                    dy={4}
                    textAnchor='start'
                    fontSize={8}
                    fontFamily='roboto'
                    fontWeight={500}
                  >
                    {payload.value.length > 20
                      ? payload.value.substring(0, 15) + "..."
                      : payload.value}
                  </text>
                );
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid horizontal={false} />
            <Bar dataKey='price' fill='#0B2B5E'>
              {dataTransposed.map((d) => (
                <Cell key={d.price} fill={"#0B2B5E"} radius={2} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: "auto", marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  );
}

const getData = ({ data }: PriceByFreightCompanyCardProps) => {
  const keys = Object.keys(data);

  const response: { company: string; price: number }[] = [];
  for (const key of keys) {
    response.push({ company: key, price: data[key] });
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
            <Typography variant='body2'>{`Valor R$: ${toLocaleString(item.value, 2)}`}</Typography>
          );
        })}
      </Box>
    );
  }

  return null;
};
