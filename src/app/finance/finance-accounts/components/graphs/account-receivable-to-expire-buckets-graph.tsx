import { LoaderIcon } from "@/components/Loading/loader-icon";
import { COLORS } from "@/constants/styles/colors";
import { useAppContext } from "@/contexts/app";
import { PostSimulateCashFlowChampionCattleResponse } from "@/types/api/cash-flow-champion-cattle";
import { AccountReceivableResumeAgg } from "@/types/api/finance";
import {
  AccountReceivableBucketSituationEnum,
  AccountReceivableItem,
  AccountReceivableStatusEnum,
} from "@/types/finance";
import { fromLocaleStringToNumber, toLocaleString } from "@/utils/number.utils";
import { toPercent } from "@/utils/string.utils";
import { Alert, Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Key } from "lucide-react";
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface AccountReceivableToExpireBucketsGraphProps {
  data?: Record<string, AccountReceivableResumeAgg>;
  isFetching?: boolean;
}
export function AccountReceivableToExpireBucketsGraph({
  data = {},
  isFetching,
}: AccountReceivableToExpireBucketsGraphProps) {
  const parsedData = getData({ data });
  const haveSomeData =
    parsedData.length > 0 && parsedData.some((item) => item.value > 0);

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
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
      <ResponsiveContainer width={"100%"} height={165}>
        <BarChart
          data={parsedData}
          margin={{
            top: 10,
            left: -10,
            right: 10,
          }}
        >
          <XAxis
            dataKey='bucketSituation'
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fontFamily: "roboto" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' fill={indigo[500]} radius={6}>
            <LabelList
              dataKey='value'
              position='top'
              fontSize={"10px"}
              fontWeight={700}
              fontFamily='roboto'
              formatter={(value: number) => `${toLocaleString(value, 2)}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

const getData = ({
  data,
}: {
  data: Record<string, AccountReceivableResumeAgg>;
}) => {
  const replaceBucketSituation = (situation: string) => {
    return situation.replaceAll("_", " ");
  };
  const undoReplaceBucketSituation = (situation: string) => {
    return situation.replaceAll(
      " ",
      "_"
    ) as AccountReceivableBucketSituationEnum;
  };

  const toExpireSituations = [
    AccountReceivableBucketSituationEnum.A_VENCER_0_30,
    AccountReceivableBucketSituationEnum.A_VENCER_31_60,
    AccountReceivableBucketSituationEnum.A_VENCER_61_90,
    AccountReceivableBucketSituationEnum.A_VENCER_91_180,
    AccountReceivableBucketSituationEnum.A_VENCER_181_360,
    AccountReceivableBucketSituationEnum.A_VENCER_MAIOR_360,
  ];
  return Object.entries(data)
    .filter(([key]) =>
      toExpireSituations.includes(key as AccountReceivableBucketSituationEnum)
    )
    .map(([key, value]) => ({
      ...value,
      bucketSituation: replaceBucketSituation(key),
    }))
    .sort(
      (a, b) =>
        toExpireSituations.indexOf(
          undoReplaceBucketSituation(a.bucketSituation)
        ) -
        toExpireSituations.indexOf(
          undoReplaceBucketSituation(b.bucketSituation)
        )
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          height: "70px",
          backgroundColor: "#EEEEEE",
          borderRadius: 2,
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        className='custom-tooltip'
      >
        <Typography variant='caption'>{`${label}`}</Typography>
        {payload.map((item: any) => (
          <>
            <Typography variant='body2'>
              Qtd. {toLocaleString(item.payload.quantity ?? 0)}
            </Typography>
            <Typography variant='body2'>
              $ {toLocaleString(item.payload.value ?? 0, 2)} (
              {toPercent(item.payload.percent ?? 0)}){" "}
            </Typography>
          </>
        ))}
      </Box>
    );
  }

  return null;
};
