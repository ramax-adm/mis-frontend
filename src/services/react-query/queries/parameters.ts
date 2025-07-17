import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetSalesDeductionsParameters } from "@/services/webApi/parameters-api";
import { MarketEnum } from "@/types/sensatta";
import { GetSalesDeductionsParametersResponseItem } from "@/types/api/parameters";

export const useGetSalesDeductionParams = ({
  companyCode,
  market,
  name,
}: {
  companyCode: string | null;
  name?: string;
  market: MarketEnum;
}) => {
  return useQuery<GetSalesDeductionsParametersResponseItem[]>({
    queryKey: [
      queryKeys.PARAMETER.GET_SALES_DEDUCTIONS,
      companyCode,
      market,
      name,
    ],
    queryFn: async () => {
      const response = await GetSalesDeductionsParameters({
        companyCode,
        market,
        name,
      });
      return response.data;
    },
    enabled: !!companyCode,
  });
};
