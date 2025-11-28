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

/**
  occurrenceNumber?: string; => OK
  companyCodes?: string; => OK
  returnTypes?: string; => radio
  occurrenceCauses?: string; => 
 */

const RETURN_TYPE_OPTIONS = [
  {
    label: "Todos",
    key: ReturnOccurrenceReturnTypeEnum.NONE,
    value: ReturnOccurrenceReturnTypeEnum.NONE,
  },
  {
    label: "Integral",
    key: ReturnOccurrenceReturnTypeEnum.FULL,
    value: ReturnOccurrenceReturnTypeEnum.FULL,
  },
  {
    label: "Parcial",
    key: ReturnOccurrenceReturnTypeEnum.PARTIAL,
    value: ReturnOccurrenceReturnTypeEnum.PARTIAL,
  },
];

export function ReturnOccurrencesSectionFilters() {
  const { data: companies = [] } = useGetUserCompanies({});
  const { data: causes = [] } = useGetBusinessAuditReturnOccurrencesCauses();

  const { filters: companyCodes, setFilters: setCompanyCodes } = useFilter<
    string[]
  >(StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_COMPANIES_FILTER);
  const { filters: returnType, setFilters: setReturnType } = useFilter<string>(
    StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_RETURN_TYPES_FILTER
  );
  const { filters: occurrenceCauses, setFilters: setOccurrenceCauses } =
    useFilter<string[]>(
      StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CAUSES_FILTER
    );

  const handleToogleCompanyCodes = () => {
    if (!companyCodes) return;

    const haveSomeSelectedCompanyCodes = companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setCompanyCodes([]);
    }

    return setCompanyCodes(companies?.map((i) => i.sensattaCode));
  };

  const handleToogleOccurrenceCauses = () => {
    if (!occurrenceCauses) return;

    const haveSomeSelectedOccurrenceCauses = occurrenceCauses?.length > 0;
    if (haveSomeSelectedOccurrenceCauses) {
      return setOccurrenceCauses([]);
    }

    return setOccurrenceCauses(causes?.map((i) => i.value));
  };

  const handleSelectReturnType = (value: string) => setReturnType(value);
  const handleSelectOccurrenceCauses = (value: string[]) =>
    setOccurrenceCauses(value);
  const handleSelectCompanyCode = (value: string[]) => setCompanyCodes(value);

  return (
    <>
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
          value={companyCodes}
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
          value={occurrenceCauses}
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
          value={returnType}
          onChange={
            handleSelectReturnType as (value: string | number | Date) => void
          }
          options={RETURN_TYPE_OPTIONS}
        />
      </Grid>
    </>
  );
}
