import CustomTable from "@/components/Table/custom-table";
import {
  useGetIntranetDocuments,
  useGetIntranetDocumentVersions,
} from "@/services/react-query/queries/intranet";
import { IntranetDocument, IntranetDocumentVersion } from "@/types/intranet";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { IntranetDocumentVersionTable } from "../tables/intranet-document-versions-table";
import { grey } from "@mui/material/colors";
import { IntranetDocumentsTable } from "../tables/intranet-documents-table";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { IntranetDocumentDetailsModal } from "../modals/intranet-document-details-modal";
import { IntranetDocumentVersionDetailsModal } from "../modals/intranet-document-version-details-modal";
import { IntranetDocumentAddNewVersionModal } from "../modals/intranet-document-add-new-version-modal";
import { ChevronDown, Plus } from "lucide-react";

export function IntranetSettingsSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    documentAddNewVersionModalOpen: parseAsBoolean.withDefault(false),
    documentDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentDetailsId: parseAsString.withDefault(""),
    documentVersionDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentVersionDetailsId: parseAsString.withDefault(""),
  });

  return (
    <>
      <Box sx={{ marginLeft: 1 }}>
        {/** Header */}
        <Grid container marginTop={1}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant='contained' startIcon={<Plus size={15} />}>
              Novo registro
            </Button>
          </Grid>
        </Grid>

        {/** Content */}
        <Grid container gap={1}>
          {/** Documentos */}
          <Grid item xs={12} sm={3} sx={{ height: "200px" }}>
            <Typography fontSize={"12px"} fontWeight={600}>
              Relação de documentos cadastrados
            </Typography>
            <IntranetDocumentsTable />
          </Grid>
          {/** Versões do documento */}
          <Grid item xs={12} sm={4} sx={{ height: "200px" }}>
            <Typography fontSize={"12px"} fontWeight={600}>
              Relação de versões de documentos
            </Typography>
            <IntranetDocumentVersionTable />
          </Grid>
        </Grid>
      </Box>

      <FinpecModal
        title='Detalhes'
        open={!!sectionStates.documentDetailsModalOpen}
        onClose={() =>
          setSectionStates({
            documentDetailsModalOpen: false,
            documentDetailsId: "",
          })
        }
      >
        <IntranetDocumentDetailsModal id={sectionStates.documentDetailsId} />
      </FinpecModal>
      <FinpecModal
        title='Detalhes versão'
        open={!!sectionStates.documentVersionDetailsModalOpen}
        onClose={() =>
          setSectionStates({
            documentVersionDetailsModalOpen: false,
            documentVersionDetailsId: "",
          })
        }
      >
        <IntranetDocumentVersionDetailsModal
          id={sectionStates.documentVersionDetailsId}
        />
      </FinpecModal>

      <FinpecModal
        title='Adicionar versão'
        open={!!sectionStates.documentAddNewVersionModalOpen}
        onClose={() =>
          setSectionStates({
            documentAddNewVersionModalOpen: false,
            documentDetailsModalOpen: true,
          })
        }
      >
        <IntranetDocumentAddNewVersionModal
          id={sectionStates.documentDetailsId}
          onClose={() =>
            setSectionStates({
              documentAddNewVersionModalOpen: false,
              documentDetailsModalOpen: true,
            })
          }
        />
      </FinpecModal>
    </>
  );
}
