import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import {
  useGetFreightCompaniesFilters,
  useGetFreightCompaniesWithConsultation,
  useGetFreightCompanyAnttConsultation,
} from "@/services/react-query/queries/freight-companies";
import { Box, Grid, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useQueryStates, parseAsString } from "nuqs";
import { FreightCompaniesTable } from "../tables/freight-companies-table";
import { FreightCompanyConsultationTable } from "../tables/freight-company-consultation-table";
import { LoaderIcon } from "../customized/loader-icon";
import { COLORS } from "@/constants/styles/colors";
import { toLocaleString } from "@/utils/string.utils";
import { ErrorFreightCompaniesConsultationTotals } from "../totals/error-freight-companies-consultations-total";
import { NotConsultedFreightCompaniesConsultationTotals } from "../totals/not-consulted-freight-companies-consultations-total";
import { SuccessFreightCompaniesConsultationTotals } from "../totals/success-freight-companies-consultations-total";
import { TotalFreightCompaniesConsultationTotals } from "../totals/total-freight-companies-consultations-total";

export function AnttConsultationOverviewSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    freightCompanyCode: parseAsString.withDefault(""),
  });

  const { data: filters } = useGetFreightCompaniesFilters();

  const { data: freightCompanyConsultationData, isFetching } =
    useGetFreightCompanyAnttConsultation({
      sensattaCode: sectionStates.freightCompanyCode,
    });
  const { data: freightCompanies, isFetching: isFetchingFreightCompanies } =
    useGetFreightCompaniesWithConsultation();

  const status = freightCompanyConsultationData?.freightCompany.resultStatus;
  const resultDescription =
    freightCompanyConsultationData?.freightCompany.resultDescription;
  const resultObservation =
    freightCompanyConsultationData?.freightCompany.resultObservation;
  return (
    <>
      <Grid container xs={12} marginTop={1}>
        <Grid item xs={12}>
          <ControlledSelect
            label='Transportadora'
            name='freightCompany'
            id='freightCompany'
            value={sectionStates.freightCompanyCode}
            onChange={(v) => setSectionStates({ freightCompanyCode: v })}
            options={filters}
            size='small'
          />
        </Grid>
      </Grid>

      {isFetching && (
        <Box sx={{ height: "120px" }}>
          <LoaderIcon />
        </Box>
      )}
      {freightCompanyConsultationData && !isFetching && (
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: 0.5,
          }}
        >
          <Grid item xs={12}>
            <Typography fontSize={"12px"} fontWeight={700}>
              Resultado consulta
            </Typography>
            <FreightCompanyConsultationTable />
          </Grid>

          <Grid item xs={12}>
            <Typography
              fontSize={"12px"}
              marginLeft={1}
              fontWeight={600}
              color={status === "OK" ? green["500"] : red["500"]}
            >
              {`Status: ${status} - ${resultDescription}`}
            </Typography>
            <Typography
              fontSize={"12px"}
              marginLeft={1}
              marginTop={0.5}
              color={"#000"}
            >
              {`Observação: ${resultObservation}`}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={0.5} sx={{ marginTop: 0.5 }}>
        <Grid
          item
          xs={12}
          gap={1}
          sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <ErrorFreightCompaniesConsultationTotals
            data={freightCompanies?.totals.error}
          />
          <NotConsultedFreightCompaniesConsultationTotals
            data={freightCompanies?.totals.notConsulted}
          />
          <SuccessFreightCompaniesConsultationTotals
            data={freightCompanies?.totals.success}
          />
          <TotalFreightCompaniesConsultationTotals
            data={freightCompanies?.totals}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={700}>
            Transportadoras
          </Typography>
          <FreightCompaniesTable />
        </Grid>
      </Grid>
    </>
  );
}
