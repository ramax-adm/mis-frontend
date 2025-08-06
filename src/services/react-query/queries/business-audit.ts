import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetBusinessAuditResumeData } from "@/services/webApi/business-audit-api";
import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";

export const useGetBusinessAuditResumeData = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery<GetBusinessAuditResumeDataResponse>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_RESUMED,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetBusinessAuditResumeData({ startDate, endDate });

      return response;
    },
  });
};
