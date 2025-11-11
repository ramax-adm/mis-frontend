import { Card } from "@/components/Card";
import { useGetResumeAccountsReceivable } from "@/services/react-query/queries/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";
import { AccountsReceivableToExpireBucketsTable } from "../tables/account-receivable-to-expire-buckets-table";
import { AccountReceivableStatusEnum } from "@/types/finance";
import { AccountsReceivableLossByClientTable } from "../tables/account-receivable-loss-by-client-table";
import { AccountsReceivableOpenValueByClientTable } from "../tables/account-receivable-open-value-by-client-table";

export function AccountReceivableOpenValueByClientCard() {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });

  const { data: resumeData, isFetching } = useGetResumeAccountsReceivable({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    companyCodes: globalStates.companyCodes.join(","),
  });

  return (
    <Card.Root sx={{ borderRadius: "6px", padding: 0.5, height: "200px" }}>
      <Card.Title>Titulos com valor aberto p/ cliente</Card.Title>
      <Card.Content>
        <AccountsReceivableOpenValueByClientTable
          isFetching={isFetching}
          data={resumeData?.openValueByClient}
        />
      </Card.Content>
    </Card.Root>
  );
}
