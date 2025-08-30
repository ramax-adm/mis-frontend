import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  useGetIntranetDocuments,
  useGetIntranetDocumentVersions,
} from "@/services/react-query/queries/intranet";
import {
  IntranetDocument,
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
} from "@/types/intranet";
import { Alert, Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export function IntranetUsersWithPendenciesTable() {
  const columns = getColumns({});
  const parsedData = getData({ data: [] });
  const haveSomeData = parsedData.length > 0;

  //   if (isFetching) {
  //     return (
  //       <Box
  //         sx={{
  //           width: "100%",
  //           height: "100%",
  //           display: "grid",
  //           placeContent: "center",
  //         }}
  //       >
  //         <CircularProgress
  //           color='primary'
  //           size={24} // Aumenta o tamanho do spinner
  //           thickness={3} // Aumenta a espessura do stroke
  //         />
  //       </Box>
  //     );
  //   }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "250px",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <Alert severity='info'> Sem Dados</Alert>
      </Box>
    );
  }
  return (
    <CustomTable<IntranetDocument>
      tableStyles={{
        height: "250px",
      }}
      columns={columns}
      rows={parsedData}
    />
  );
}

const getData = ({
  data,
}: {
  data: IntranetDocument[];
}): IntranetDocument[] => {
  const documentTypeMap = {
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POP]: "POP",
  };
  return [];
};

const getColumns = ({}: {}): CustomTableColumn<IntranetDocument>[] => [
  {
    headerKey: "name",
    headerName: "Nome",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "description",
    headerName: "Descrição",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "type",
    headerName: "Tipo",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "id",
    headerName: "Detalhes",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
    render: (value, row) => (
      <Box
        sx={{
          "&:hover": {
            color: grey["700"],
            cursor: "pointer",
          },
        }}
      >
        <SquareArrowOutUpRight size={14} />
      </Box>
    ),
  },
];
