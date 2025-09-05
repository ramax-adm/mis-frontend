import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import {
  useGetFreightCompaniesFilters,
  useGetFreightCompanyAnttConsultation,
} from "@/services/react-query/queries/freight-companies";
import { Grid, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useQueryStates, parseAsString } from "nuqs";
import { FreightCompaniesTable } from "../tables/freight-companies-table";
import { FreightCompanyConsultationTable } from "../tables/freight-company-consultation-table";

export function AnttConsultationOverviewSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    freightCompanyCode: parseAsString.withDefault(""),
  });

  const { data: filters } = useGetFreightCompaniesFilters();

  const { data: freightCompanyConsultationData, isFetching } =
    useGetFreightCompanyAnttConsultation({
      sensattaCode: sectionStates.freightCompanyCode,
    });

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
