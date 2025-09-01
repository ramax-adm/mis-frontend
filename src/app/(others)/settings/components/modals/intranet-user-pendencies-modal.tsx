import { DisplayItem } from "@/components/Info/display-item";
import { ListItemCustom } from "@/components/ListItemCustom";
import { GetPendingAcceptanceDocumentsResponseDto } from "@/types/api/intranet";
import { Box, Grid, IconButton, List, Typography } from "@mui/material";
import { RiPagesLine } from "react-icons/ri";

interface IntranetUserPendenciesModalProps {
  pendencySelected: GetPendingAcceptanceDocumentsResponseDto | null;
  onClose: () => void;
}
export function IntranetUserPendenciesModal({
  pendencySelected,
}: IntranetUserPendenciesModalProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4}>
          <DisplayItem title='Id Usuario' content={pendencySelected?.userId} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <DisplayItem title='Usuario' content={pendencySelected?.userName} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <DisplayItem
            title='Qtd. Pendencias'
            content={pendencySelected?.pendencesQuantity.toString()}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant='subtitle1' fontSize={"12px"}>
                Documentos pendentes de aceite
              </Typography>
            </Box>
            <List dense={true} sx={{ maxHeight: "200px", overflowY: "auto" }}>
              {pendencySelected?.pendingDocumentVersions?.map((item, index) => (
                <ListItemCustom
                  key={item.id}
                  title={`Pendencia - ${item.document.name}`}
                  content={`ID: ${item.key}, Versão: ${item.version}, Revisão No.: ${item.reviewNumber}`}
                  icon={<RiPagesLine />}
                />
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
