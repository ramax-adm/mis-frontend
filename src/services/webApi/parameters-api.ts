import { MarketEnum } from "@/types/sensatta";
import { GetFetch, urls } from "../axios/api-base";

export async function GetSalesDeductionsParameters({
  companyCode,
  market,
  name,
}: {
  companyCode: string | null;
  name?: string;
  market: MarketEnum;
}) {
  const response = await GetFetch(
    urls.PARAMETER.GET_SALES_DEDUCTIONS_PARAMETERS,
    {
      params: {
        companyCode,
        market,
        name,
      },
    }
  );

  return response.data;
}
