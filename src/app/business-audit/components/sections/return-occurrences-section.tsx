import { Grid, Typography } from "@mui/material";
import { ReturnOccurrencesByItemCard } from "../cards/return-occurrences-by-item-card";
import { ReturnOccurrencesByTypeCard } from "../cards/return-occurrences-by-type-card";
import { ReturnOccurrencesByDayCard } from "../cards/return-occurrences-by-day-card";
import { ReturnOccurrencesByCompanyCard } from "../cards/return-occurrences-by-company-card";
import { ReturnOccurrencesByCauseCard } from "../cards/return-occurrences-by-cause-card";
import { ReturnOccurrencesByRepresentativeCard } from "../cards/return-occurrences-by-representative-card";
import { ReturnOccurrencesByClientCard } from "../cards/return-occurrences-by-client-card";
import { ReturnOccurrencesByProductCard } from "../cards/return-occurrences-by-product-card";
import { ReturnOccurrencesByCauseGraphCard } from "../cards/return-occurrences-by-cause-graph-card";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { ReturnOccurrenceDetailsModal } from "../modals/return-occurrence-details-modal";

export function BusinessAuditReturnOccurrencesSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    detailsOccurrenceNumber: parseAsString.withDefault(""),
    occurrenceModalOpen: parseAsBoolean.withDefault(false),
  });
  return (
    <>
      <Grid container marginTop={-0.5} spacing={1}>
        {/** Tabela de listagem das devoluções */}
        <Grid item xs={12}>
          <ReturnOccurrencesByItemCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        {/** Grafico linha para devoluções p/ dia */}
        <Grid item xs={12} md={7.2}>
          <ReturnOccurrencesByDayCard />
        </Grid>
        {/** Grafico pizza para devoluções p/ tipo */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByTypeCard />
        </Grid>
        {/** Grafico pizza para devoluções p/ motivo */}

        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByCauseGraphCard />
        </Grid>
      </Grid>
      <Grid container marginTop={0.1} spacing={1}>
        {/** Card p/ fabrica */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByCompanyCard />
        </Grid>

        {/** Card p/ Motivo */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByCauseCard />
        </Grid>

        {/** Card p/ Representante */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByRepresentativeCard />
        </Grid>

        {/** Card p/ Cliente */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByClientCard />
        </Grid>

        {/** Card p/ Produto */}
        <Grid item xs={12} md={2.4}>
          <ReturnOccurrencesByProductCard />
        </Grid>
      </Grid>
      <FinpecModal
        title={`Detalhes - Devolução`}
        open={sectionStates.occurrenceModalOpen}
        onClose={() =>
          setSectionStates({
            occurrenceModalOpen: false,
            detailsOccurrenceNumber: "",
          })
        }
      >
        <ReturnOccurrenceDetailsModal
          occurrenceNumber={sectionStates.detailsOccurrenceNumber}
          onClose={() =>
            setSectionStates({
              occurrenceModalOpen: false,
              detailsOccurrenceNumber: "",
            })
          }
        />
      </FinpecModal>
    </>
  );
}
