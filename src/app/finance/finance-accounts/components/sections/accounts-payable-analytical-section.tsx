import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import {
  useAccountsReceivableClientsFilters,
  useGetAnalyticalAccountsPayable,
  useGetAnalyticalAccountsReceivable,
} from "@/services/react-query/queries/finance";
import {
  AccountReceivableStatusEnum,
  AccountReceivableVisualizationEnum,
} from "@/types/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { Grid, Typography } from "@mui/material";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { ACCOUNT_RECEIVABLE_STATUS_OPTIONS } from "../../constants/account-receivable-status-options";
import { AccountsReceivableTable } from "../tables/account-receivable-items-table";
import { ACCOUNT_RECEIVABLE_VISUALIZATION_OPTIONS } from "../../constants/account-receivable-visualization-options";
import { COLORS } from "@/constants/styles/colors";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { ACCOUNT_RECEIVABLE_BUCKET_SITUATIONS } from "../../constants/account-receivable-bucket-situations";
import { AccountsReceivableTotals } from "../totals/accounts-receivable-totals";
import { AccountsPayableTotals } from "../totals/accounts-payable-totals";
import { AccountsPayableTable } from "../tables/account-payable-items-table";

export function AccountsPayableAnalyticalSection() {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });

  const { data: analyticalData, isFetching } = useGetAnalyticalAccountsPayable({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    companyCodes: globalStates.companyCodes.join(","),
  });
  return (
    <>
      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <AccountsPayableTotals data={analyticalData?.totals} />
        </Grid>
        <Grid item xs={12} marginTop={1}>
          <AccountsPayableTable
            data={analyticalData?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
