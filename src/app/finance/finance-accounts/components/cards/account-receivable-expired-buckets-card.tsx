import { Card } from "@/components/Card";
import { useGetResumeAccountsReceivable } from "@/services/react-query/queries/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";
import { AccountsReceivableToExpireBucketsTable } from "../tables/account-receivable-to-expire-buckets-table";
import { AccountReceivableStatusEnum } from "@/types/finance";
import { AccountsReceivableExpiredBucketsTable } from "../tables/account-receivable-expired-buckets-table";
import { AccountReceivableExpiredBucketsGraph } from "../graphs/account-receivable-expired-buckets-graph";

export function AccountReceivableExpiredBucketsCard() {
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

  const expiredBuckets =
    resumeData?.listByStatus?.[AccountReceivableStatusEnum.VENCIDO];

  return (
    <Card.Root sx={{ borderRadius: "6px", padding: 0.5, height: "380px" }}>
      <Card.Title>Titulos vencidos p/ bucket</Card.Title>
      <Card.Content>
        <AccountReceivableExpiredBucketsGraph
          data={resumeData?.accountReceivableByBucketSituation}
          isFetching={isFetching}
        />
        <AccountsReceivableExpiredBucketsTable
          isFetching={isFetching}
          data={expiredBuckets}
        />
      </Card.Content>
    </Card.Root>
  );
}
