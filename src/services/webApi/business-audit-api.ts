import { GetFetch, urls } from "../axios/api-base";

export async function GetBusinessAuditResumeData({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const response = await GetFetch(
    urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_RESUMED,
    {
      params: { startDate, endDate },
    }
  );

  return response.data;
}

export async function GetBusinessAuditConsideredCfops() {
  const response = await GetFetch(urls.BUSINESS_AUDIT.GET_CONSIDERED_CFOPS);

  return response.data;
}

export async function GetBusinessAuditConsideredNfSituations() {
  const response = await GetFetch(
    urls.BUSINESS_AUDIT.GET_CONSIDERED_NF_SITUATIONS
  );

  return response.data;
}
