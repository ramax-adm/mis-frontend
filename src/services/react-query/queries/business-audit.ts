import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetBusinessAuditConsideredCfops,
  GetBusinessAuditConsideredNfSituations,
  GetBusinessAuditResumeData,
} from "@/services/webApi/business-audit-api";
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

export const useGetBusinessAuditConsideredCfops = () => {
  return useQuery<string[]>({
    queryKey: [queryKeys.BUSINESS_AUDIT.GET_CONSIDERED_CFOPS],
    queryFn: async () => {
      const response = await GetBusinessAuditConsideredCfops();

      return response;
    },
  });
};

export const useGetBusinessAuditConsideredNfSituations = () => {
  return useQuery<string[]>({
    queryKey: [queryKeys.BUSINESS_AUDIT.GET_CONSIDERED_NF_SITUATIONS],
    queryFn: async () => {
      const response = await GetBusinessAuditConsideredNfSituations();

      return response;
    },
  });
};
