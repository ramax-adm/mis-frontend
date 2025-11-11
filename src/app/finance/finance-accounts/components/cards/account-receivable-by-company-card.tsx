import { Card } from "@/components/Card";
import { useGetResumeAccountsReceivable } from "@/services/react-query/queries/finance";
import { getIso8601DateString } from "@/utils/date.utils";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";
import { AccountsReceivableToExpireBucketsTable } from "../tables/account-receivable-to-expire-buckets-table";
import { AccountReceivableStatusEnum } from "@/types/finance";
import { AccountsReceivableLossByClientTable } from "../tables/account-receivable-loss-by-client-table";
import { AccountReceivableByCompanyGraph } from "../graphs/account-receivable-by-company-graph";

export function AccountReceivableByCompanyCard() {
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
    <Card.Root
      sx={{
        borderRadius: "6px",
        paddingX: 0.5,
        paddingY: 0.5,
        height: "200px",
      }}
    >
      <Card.Title>Titulos p/ empresa</Card.Title>
      <Card.Content>
        <AccountReceivableByCompanyGraph
          data={resumeData?.accountReceivableByCompany}
          isFetching={isFetching}
        />
      </Card.Content>
    </Card.Root>
  );
}
