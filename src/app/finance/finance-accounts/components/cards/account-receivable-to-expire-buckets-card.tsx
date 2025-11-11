import { Card } from "@/components/Card";
import { useGetResumeAccountsReceivable } from "@/services/react-query/queries/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";
import { AccountsReceivableToExpireBucketsTable } from "../tables/account-receivable-to-expire-buckets-table";
import { AccountReceivableStatusEnum } from "@/types/finance";
import { AccountReceivableToExpireBucketsGraph } from "../graphs/account-receivable-to-expire-buckets-graph";

export function AccountReceivableToExpireBucketsCard() {
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

  const toExpireBuckets =
    resumeData?.listByStatus?.[AccountReceivableStatusEnum.A_VENCER];

  return (
    <Card.Root sx={{ borderRadius: "6px", padding: 0.5, height: "380px" }}>
      <Card.Title>Titulos a vencer p/ bucket</Card.Title>
      <Card.Content>
        <AccountReceivableToExpireBucketsGraph
          data={resumeData?.accountReceivableByBucketSituation}
          isFetching={isFetching}
        />
        <AccountsReceivableToExpireBucketsTable
          isFetching={isFetching}
          data={toExpireBuckets}
        />
      </Card.Content>
    </Card.Root>
  );
}
