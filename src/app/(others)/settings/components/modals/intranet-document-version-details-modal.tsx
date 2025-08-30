import { DisplayItem } from "@/components/Info/display-item";
import { useGetIntranetDocumentVersion } from "@/services/react-query/queries/intranet";
import { IntranetDocumentTypeEnum } from "@/types/intranet";
import { getDatetime } from "@/utils/date.utils";
import { Box, Grid } from "@mui/material";

interface IntranetDocumentVersionDetailsModalProps {
  id: string;
}
export function IntranetDocumentVersionDetailsModal({
  id,
}: IntranetDocumentVersionDetailsModalProps) {
  // query para details de um document
  const { data: document, isFetching } = useGetIntranetDocumentVersion({ id });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Id' content={document?.id} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Nome' content={document?.document?.name} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem
            title='Descrição'
            content={document?.document?.description}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem
            title='Tipo'
            content={getDocumentType(document?.document?.type)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Identificador' content={document?.key} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Versão' content={document?.version} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem
            title='N° Revisão'
            content={document?.reviewNumber?.toString()}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Tipo Storage' content={document?.storageType} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Criado por' content={document?.createdBy.name} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem
            title='Criado em'
            content={getDatetime(document?.createdAt)}
          />
        </Grid>
        <Grid item xs={12}>
          <DisplayItem
            title='Maiores Mudanças'
            content={document?.majorChanges}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const getDocumentType = (type?: IntranetDocumentTypeEnum) => {
  if (!type) {
    return "N/D";
  }
  const documentTypeMap = {
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POP]: "POP",
  };
  return documentTypeMap[type];
};
