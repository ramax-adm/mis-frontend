import { GetFetch, urls } from "../axios/api-base";

export async function GetBusinessAuditResumeData({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const response = await GetFetch(
    urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_RESUMED,
    {
      params: { startDate, endDate },
    }
  );

  return response.data;
}
