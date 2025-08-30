import CustomTable from "@/components/Table/custom-table";
import {
  useGetIntranetDocuments,
  useGetIntranetDocumentVersions,
} from "@/services/react-query/queries/intranet";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { IntranetDocumentVersionTable } from "../tables/intranet-document-versions-table";
import { grey } from "@mui/material/colors";
import { IntranetDocumentsTable } from "../tables/intranet-documents-table";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { IntranetDocumentDetailsModal } from "../modals/intranet-document-details-modal";
import { IntranetDocumentVersionDetailsModal } from "../modals/intranet-document-version-details-modal";
import { IntranetDocumentAddNewVersionModal } from "../modals/intranet-document-add-new-version-modal";
import { ArrowDownToLine, ChevronDown, Plus } from "lucide-react";
import {
  PopoverTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTypography,
} from "@/components/Button/PopoverButton";
import { IntranetDocumentAddNewModal } from "../modals/intranet-document-new-modal";
import { IntranetUsersWithPendenciesTable } from "../tables/intranet-users-with-pendencies-table";
import { IntranetDocumentEditNewModal } from "../modals/intranet-document-edit-modal";
import { IntranetUserAcceptedDocumentsTable } from "../tables/intranet-user-accepted-documents-table";
import { IntranetPendingAcceptanceDocumentsTable } from "../tables/intranet-pending-acceptance-document-table";
import { useExportIntranetData } from "@/services/react-query/mutations/intranet";

export function IntranetSettingsSection() {
  const [sectionStates, setSectionStates] = useQueryStates({
    // modal forms
    documentAddNewModalOpen: parseAsBoolean.withDefault(false),
    documentAddNewVersionModalOpen: parseAsBoolean.withDefault(false),
    documentAddNewVersionModalDefaultDisabled: parseAsBoolean.withDefault(true),

    // document
    documentDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentDetailsId: parseAsString.withDefault(""),
    documentEditModalOpen: parseAsBoolean.withDefault(false),
    documentEditId: parseAsString.withDefault(""),

    // document version
    documentVersionDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentVersionDetailsId: parseAsString.withDefault(""),
  });

  const { mutateAsync: exportData, isPending: isExportingData } =
    useExportIntranetData();

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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant='h6'>Cadastros - Intranet</Typography>
            <Box sx={{ display: "inline-flex", gap: 1 }}>
              <PopoverRoot>
                <PopoverTrigger
                  startIcon={<Plus size={15} />}
                  disabled={isExportingData}
                >
                  Novo registro
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTypography
                    onClick={() =>
                      setSectionStates({ documentAddNewModalOpen: true })
                    }
                  >
                    Adicionar documento
                  </PopoverTypography>
                  <PopoverTypography
                    onClick={() =>
                      setSectionStates({
                        documentAddNewVersionModalOpen: true,
                        documentAddNewVersionModalDefaultDisabled: false,
                      })
                    }
                  >
                    Adicionar versão de documento
                  </PopoverTypography>
                </PopoverContent>
              </PopoverRoot>
              <Button
                variant='contained'
                startIcon={<ArrowDownToLine size={15} />}
                disabled={isExportingData}
                onClick={async () => await exportData()}
              >
                Extrair dados
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/** Content */}
        <Grid container marginTop={0.2} spacing={1}>
          {/** Documentos */}
          <Grid item xs={12} md={5} sx={{ height: "280px" }}>
            <Typography fontSize={"12px"} fontWeight={600}>
              Documentos cadastrados
            </Typography>
            <IntranetDocumentsTable />
          </Grid>
          {/** Versões do documento */}
          <Grid item xs={12} md={7} sx={{ height: "280px" }}>
            <Typography fontSize={"12px"} fontWeight={600}>
              Versões dos documentos
            </Typography>
            <IntranetDocumentVersionTable />
          </Grid>
        </Grid>
      </Box>

      <Grid container marginTop={0.2} spacing={1}>
        {/** Usuarios */}
        <Grid item xs={5} sx={{ height: "280px" }}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Documentos aceitos pelo usuario
          </Typography>
          <IntranetUserAcceptedDocumentsTable />
        </Grid>
        <Grid item xs={7} sx={{ height: "280px" }}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Usuarios com pendencias
          </Typography>
          <IntranetPendingAcceptanceDocumentsTable />
        </Grid>
      </Grid>

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
        title='Editar'
        open={!!sectionStates.documentEditModalOpen}
        onClose={() =>
          setSectionStates({
            documentEditModalOpen: false,
            documentEditId: "",
          })
        }
      >
        <IntranetDocumentEditNewModal
          id={sectionStates.documentEditId}
          onClose={() =>
            setSectionStates({
              documentEditModalOpen: false,
              documentEditId: "",
            })
          }
        />
      </FinpecModal>

      <FinpecModal
        title='Adicionar Documento'
        open={!!sectionStates.documentAddNewModalOpen}
        onClose={() =>
          setSectionStates({
            documentAddNewModalOpen: false,
          })
        }
      >
        <IntranetDocumentAddNewModal
          onClose={() =>
            setSectionStates({
              documentAddNewModalOpen: false,
            })
          }
        />
      </FinpecModal>

      <FinpecModal
        title='Adicionar versão'
        open={!!sectionStates.documentAddNewVersionModalOpen}
        onClose={() =>
          setSectionStates({
            documentAddNewVersionModalOpen: false,
            documentAddNewVersionModalDefaultDisabled: true,
            documentDetailsModalOpen:
              sectionStates.documentAddNewVersionModalDefaultDisabled
                ? true
                : false,
          })
        }
      >
        <IntranetDocumentAddNewVersionModal
          id={sectionStates.documentDetailsId}
          defaultDisabled={
            sectionStates.documentAddNewVersionModalDefaultDisabled
          }
          onClose={() =>
            setSectionStates({
              documentAddNewVersionModalOpen: false,
              documentAddNewVersionModalDefaultDisabled: true,
              documentDetailsModalOpen:
                sectionStates.documentAddNewVersionModalDefaultDisabled
                  ? true
                  : false,
            })
          }
        />
      </FinpecModal>
    </>
  );
}
