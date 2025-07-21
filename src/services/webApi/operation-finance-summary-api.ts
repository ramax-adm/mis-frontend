import { GetFetch, urls } from "../axios/api-base";

export async function GetOperationFinanceSummary({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate: Date | null;
  endDate: Date | null;
}) {
  const response = await GetFetch(
    urls.BUSINESS_SUMMARY.GET_OPERATION_FINANCE_SUMMARY,
    { params: { companyCode, startDate, endDate } }
  );

  return response.data;
}
