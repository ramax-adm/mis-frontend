import { DisplayItem } from "@/components/Info/display-item";
import { ListItemCustom } from "@/components/ListItemCustom";
import { useGetIntranetDocument } from "@/services/react-query/queries/intranet";
import { IntranetDocumentTypeEnum } from "@/types/intranet";
import { Box, Button, Grid, IconButton, List, Typography } from "@mui/material";
import { useQueryStates, parseAsBoolean } from "nuqs";
import { FaPlusCircle } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { RiPagesLine } from "react-icons/ri";
import { LoaderIcon } from "../customized/loader-icon";

interface IntranetDocumentDetailsModalProps {
  id: string;
}
export function IntranetDocumentDetailsModal({
  id,
}: IntranetDocumentDetailsModalProps) {
  const [, setStates] = useQueryStates({
    documentAddNewVersionModalOpen: parseAsBoolean.withDefault(false),
    documentAddNewVersionModalDefaultDisabled: parseAsBoolean.withDefault(true),
    documentDetailsModalOpen: parseAsBoolean.withDefault(false),
  });

  const handleOpenNewVersionModal = () => {
    setStates({
      documentAddNewVersionModalOpen: true,
      documentAddNewVersionModalDefaultDisabled: true,
      documentDetailsModalOpen: false,
    });
  };

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

  const { data: document, isFetching } = useGetIntranetDocument({ id });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "300px",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Grid container>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Id' content={document?.id} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Nome' content={document?.name} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Descrição' content={document?.description} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DisplayItem title='Tipo' content={getDocumentType(document?.type)} />
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
                Versões do documento
              </Typography>

              <IconButton
                edge='end'
                aria-label='plus'
                style={{
                  marginLeft: "4px",
                  fontSize: "16px",
                  marginTop: "-2px",
                }}
                onClick={handleOpenNewVersionModal}
              >
                <FaPlusCircle />
              </IconButton>
            </Box>
            <List
              dense={true}
              sx={{ maxHeight: "200px", overflowY: "auto", marginTop: -2 }}
            >
              {document?.versions?.map((item, index) => (
                <ListItemCustom
                  key={item.id}
                  title={`Versão - ${item.version}`}
                  content={item.key}
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
