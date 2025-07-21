import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetOperationFinanceSummary } from "@/services/webApi/operation-finance-summary-api";
import { GetOperationFinanceSummaryResponse } from "@/types/api/operation-finance-summary";

export const useGetOperationFinanceSummary = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate: Date | null;
  endDate: Date | null;
}) => {
  return useQuery<GetOperationFinanceSummaryResponse>({
    queryKey: [
      queryKeys.BUSINESS_SUMMARY.GET_OPERATION_FINANCE_SUMMARY,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetOperationFinanceSummary({
        companyCode,
        startDate,
        endDate,
      });
      return response;
    },
  });
};
