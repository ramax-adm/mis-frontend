import { Grid, Typography } from "@mui/material";
import { ReturnOccurrencesByItemCard } from "../cards/return-occurrences-by-item-card";
import { ReturnOccurrencesByTypeCard } from "../cards/return-occurrences-by-type-card";
import { ReturnOccurrencesByDayCard } from "../cards/return-occurrences-by-day-card";
import { ReturnOccurrencesByCompanyCard } from "../cards/return-occurrences-by-company-card";
import { ReturnOccurrencesByCauseCard } from "../cards/return-occurrences-by-cause-card";
import { ReturnOccurrencesByRepresentativeCard } from "../cards/return-occurrences-by-representative-card";
import { ReturnOccurrencesByClientCard } from "../cards/return-occurrences-by-client-card";
import { ReturnOccurrencesByProductCard } from "../cards/return-occurrences-by-product-card";

export function BusinessAuditReturnOccurrencesSection() {
  return (
    <>
      <Grid container marginTop={0.1} spacing={1}>
        {/** Tabela de listagem das devoluções */}
        <Grid item xs={12} md={7.14}>
          <ReturnOccurrencesByItemCard />
        </Grid>
        {/** Grafico pizza para devoluções p/ tipo */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByTypeCard />
        </Grid>
        {/** Grafico linha para devoluções p/ dia */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByDayCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        {/** Card p/ fabrica */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByCompanyCard />
        </Grid>

        {/** Card p/ Motivo */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByCauseCard />
        </Grid>

        {/** Card p/ Representante */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByRepresentativeCard />
        </Grid>

        {/** Card p/ Cliente */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByClientCard />
        </Grid>

        {/** Card p/ Produto */}
        <Grid item xs={12} md={2.38}>
          <ReturnOccurrencesByProductCard />
        </Grid>
      </Grid>
    </>
  );
}
