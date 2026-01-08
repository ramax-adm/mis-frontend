import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import {
  useAccountsReceivableClientsFilters,
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

export function AccountsReceivableAnalyticalSection() {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });
  const [sectionStates, setSectionStates] = useQueryStates({
    clientCode: parseAsString.withDefault(""),
    key: parseAsString.withDefault(""),
    status: parseAsString.withDefault(AccountReceivableStatusEnum.TODOS),
    visualizationType: parseAsString.withDefault(
      AccountReceivableVisualizationEnum.TODOS
    ),
    bucketSituations: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const handleSelectClient = (clientCode: string) => {
    setSectionStates({ clientCode });
  };

  const handleSelectStatus = (status: AccountReceivableStatusEnum | string) => {
    setSectionStates({ status: String(status) });
  };
  const handleSelectVisualizationType = (
    visualizationType: AccountReceivableVisualizationEnum | string
  ) => {
    setSectionStates({ visualizationType: String(visualizationType) });
  };

  const handleSelectKey = (key: string | null) => {
    setSectionStates({ key });
  };

  const handleSelectBucketSituations = (value: string[]) => {
    setSectionStates({
      bucketSituations: value,
    });
  };

  const { data: analyticalData, isFetching } =
    useGetAnalyticalAccountsReceivable({
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
      companyCodes: globalStates.companyCodes.join(","),
      clientCode: sectionStates.clientCode,
      status: sectionStates.status as AccountReceivableStatusEnum,
      key: sectionStates.key,
      visualizationType:
        sectionStates.visualizationType as AccountReceivableVisualizationEnum,
      bucketSituations: sectionStates.bucketSituations.join(","),
    });

  const { data: clients } = useAccountsReceivableClientsFilters({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
  });

  const handleToogleBucketSituations = () => {
    if (!ACCOUNT_RECEIVABLE_BUCKET_SITUATIONS) return;

    const haveSomeSelectedBucketSituations =
      sectionStates.bucketSituations?.length > 0;

    if (haveSomeSelectedBucketSituations) {
      return setSectionStates({ bucketSituations: [] });
    }

    return setSectionStates({
      bucketSituations: ACCOUNT_RECEIVABLE_BUCKET_SITUATIONS,
    });
  };

  return (
    <>
      <Grid container marginTop={0.1} spacing={1}>
        <Grid item xs={12} sm={2} marginTop={{ sm: 2.5 }}>
          <MultipleSelectInputControlled
            size='small'
            label='Status Bucket'
            value={sectionStates.bucketSituations}
            onChange={(value) => handleSelectBucketSituations(value)}
            options={
              ACCOUNT_RECEIVABLE_BUCKET_SITUATIONS?.map((i) => ({
                key: i,
                value: i,
                label: i.split("_").join(" "),
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleToogleBucketSituations}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} marginTop={{ sm: 2.5 }}>
          <ControlledSelect
            id='clientCode'
            name='clientCode'
            label='Clientes'
            size='small'
            value={sectionStates.clientCode}
            onChange={handleSelectClient}
            options={clients}
          />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={{ sm: 2.5 }}>
          <TextInputControlled
            id='key'
            label='Chave'
            size='small'
            value={sectionStates.key}
            setValue={handleSelectKey}
          />
        </Grid>

        <Grid item xs={12} sm={2} marginTop={{ sm: 0 }}>
          <RadioInputControlled
            row
            name='visualizationType'
            label='Visualização'
            emptyMessage='Sem Opções'
            value={sectionStates.visualizationType}
            onChange={
              handleSelectVisualizationType as (
                value: string | number | Date
              ) => void
            }
            options={ACCOUNT_RECEIVABLE_VISUALIZATION_OPTIONS}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          marginTop={{
            sm: 0,
          }}
        >
          <RadioInputControlled
            row
            name='status'
            label='Status'
            emptyMessage='Sem Opções'
            value={sectionStates.status}
            onChange={
              handleSelectStatus as (value: string | number | Date) => void
            }
            options={ACCOUNT_RECEIVABLE_STATUS_OPTIONS}
          />
        </Grid>
      </Grid>
      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <AccountsReceivableTotals data={analyticalData?.totals} />
        </Grid>
        <Grid item xs={12} marginTop={1}>
          <AccountsReceivableTable
            data={analyticalData?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
