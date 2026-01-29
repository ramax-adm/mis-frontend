import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { StorageKeysEnum } from "@/constants/app/storage";
import { COLORS } from "@/constants/styles/colors";
import { useFilter } from "@/contexts/persisted-filters";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { Grid, Typography } from "@mui/material";

export function InvoiceTraceabilitySectionFilters() {
  const { data: companies = [] } = useGetUserCompanies({});

  const { filters: companyCodes, setFilters: setCompanyCodes } = useFilter<
    string[]
  >(StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_COMPANIES_FILTER);

  const handleToogleCompanyCodes = () => {
    if (!companyCodes) return;

    const haveSomeSelectedCompanyCodes = companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setCompanyCodes([]);
    }

    return setCompanyCodes(companies?.map((i) => i.sensattaCode));
  };
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
        />{" "}
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
    </>
  );
}
