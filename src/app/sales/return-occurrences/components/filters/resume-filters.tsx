import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { StorageKeysEnum } from "@/constants/app/storage";
import { COLORS } from "@/constants/styles/colors";
import { useFilter } from "@/contexts/persisted-filters";
import { useGetBusinessAuditReturnOccurrencesCauses } from "@/services/react-query/queries/business-audit";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { ReturnOccurrenceReturnTypeEnum } from "@/types/business-audit";
import { Grid, Typography } from "@mui/material";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { RETURN_TYPE_OPTIONS } from "../../constants/return-types";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import dayjs from "dayjs";
import { getIso8601DateString } from "@/utils/date.utils";

/**
  occurrenceNumber?: string; => OK
  companyCodes?: string; => OK
  returnTypes?: string; => radio
  occurrenceCauses?: string; => 
 */

export function ReturnOccurrencesSectionFilters() {
  const { data: companies = [] } = useGetUserCompanies({});
  const { data: causes = [] } = useGetBusinessAuditReturnOccurrencesCauses();

  const [filterStates, setFilterStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    returnType: parseAsString.withDefault(""),
    occurrenceCauses: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const handleSelectStartDate = (value: Date) =>
    setFilterStates({ startDate: getIso8601DateString(value) });
  const handleSelectEndDate = (value: Date) =>
    setFilterStates({ endDate: getIso8601DateString(value) });

  const handleToogleCompanyCodes = () => {
    if (!filterStates.companyCodes) return;

    const haveSomeSelectedCompanyCodes = filterStates.companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setFilterStates({ companyCodes: [] });
    }

    return setFilterStates({
      companyCodes: companies?.map((i) => i.sensattaCode),
    });
  };

  const handleToogleOccurrenceCauses = () => {
    if (!filterStates.occurrenceCauses) return;

    const haveSomeSelectedOccurrenceCauses =
      filterStates.occurrenceCauses?.length > 0;
    if (haveSomeSelectedOccurrenceCauses) {
      return setFilterStates({ occurrenceCauses: [] });
    }

    return setFilterStates({ occurrenceCauses: causes?.map((i) => i.value) });
  };

  const handleSelectReturnType = (value: string) =>
    setFilterStates({ returnType: value });
  const handleSelectOccurrenceCauses = (value: string[]) =>
    setFilterStates({ occurrenceCauses: value });
  const handleSelectCompanyCode = (value: string[]) =>
    setFilterStates({ companyCodes: value });

  return (
    <>
      <Grid item xs={12} sm={2}>
        <DateInputControlled
          label='Dt. Inicio'
          size='small'
          value={dayjs(filterStates.startDate)}
          setValue={handleSelectStartDate}
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <DateInputControlled
          label='Dt. Fim'
          size='small'
          value={dayjs(filterStates.endDate)}
          setValue={handleSelectEndDate}
        />
      </Grid>
      <Grid
        item
        marginTop={{
          xs: 0,
          sm: 0,
        }}
        xs={12}
        sm={2}
      >
        <MultipleSelectInputControlled
          label='Empresas'
          size='small'
          value={filterStates.companyCodes}
          onChange={handleSelectCompanyCode}
          options={companies.map((i) => ({
            label: `${i.sensattaCode} - ${i.name}`,
            value: i.sensattaCode,
            key: i.sensattaCode,
          }))}
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
          onClick={handleToogleCompanyCodes}
        >
          Selecionar/Deselecionar tudo
        </Typography>
      </Grid>
      <Grid
        item
        marginTop={{
          xs: 0,
        }}
        xs={12}
        sm={2.5}
      >
        <MultipleSelectInputControlled
          label='Motivos'
          size='small'
          value={filterStates.occurrenceCauses}
          onChange={handleSelectOccurrenceCauses}
          options={causes.map((i) => ({
            label: i.label,
            key: i.key.toString(),
            value: i.value.toString(),
          }))}
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
          onClick={handleToogleOccurrenceCauses}
        >
          Selecionar/Deselecionar tudo
        </Typography>
      </Grid>
      <Grid
        item
        marginTop={{
          xs: 0,
          sm: -2,
        }}
        xs={12}
        sm={2.5}
      >
        <RadioInputControlled
          row
          name='returnType'
          label='Tipo devolução'
          emptyMessage='Sem Opções'
          value={filterStates.returnType}
          onChange={
            handleSelectReturnType as (value: string | number | Date) => void
          }
          options={RETURN_TYPE_OPTIONS}
        />
      </Grid>
    </>
  );
}
