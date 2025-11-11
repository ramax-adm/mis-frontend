import { useGetResumeAccountsReceivable } from "@/services/react-query/queries/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { Grid } from "@mui/material";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { AccountReceivableByCompanyCard } from "../cards/account-receivable-by-company-card";
import { AccountReceivableByStatusCard } from "../cards/account-receivable-by-status-card";
import { AccountReceivableLossByClientCard } from "../cards/account-receivable-loss-by-client-card";
import { AccountReceivableOpenValueByClientCard } from "../cards/account-receivable-open-value-by-client-card";
import { AccountReceivableExpiredBucketsCard } from "../cards/account-receivable-expired-buckets-card";
import { AccountReceivableToExpireBucketsCard } from "../cards/account-receivable-to-expire-buckets-card";
import { AccountsReceivableTotals } from "../totals/accounts-receivable-totals";

export function AccountsReceivableResumeSection() {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });

  const { data: resumeData } = useGetResumeAccountsReceivable({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    companyCodes: globalStates.companyCodes.join(","),
  });

  return (
    <>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={12}>
          <AccountsReceivableTotals data={resumeData?.totals} />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={12} md={4}>
          <AccountReceivableByCompanyCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountReceivableByStatusCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountReceivableOpenValueByClientCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={12} md={6}>
          <AccountReceivableToExpireBucketsCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountReceivableExpiredBucketsCard />
        </Grid>
      </Grid>
    </>
  );
}
