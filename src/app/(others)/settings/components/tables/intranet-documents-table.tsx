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
import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  parseAsBoolean,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";

export function IntranetDocumentsTable() {
  const [, setStates] = useQueryStates({
    documentDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentDetailsId: parseAsString.withDefault(""),
  });

  const handleOpenDetailsModal = (id: string) => {
    setStates({ documentDetailsId: id, documentDetailsModalOpen: true });
  };

  const { data: intranetDocuments = [], isFetching } =
    useGetIntranetDocuments();
  const columns = getColumns({ handleOpenDetailsModal });
  const parsedData = getData({ data: intranetDocuments });

  if (isFetching) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <CircularProgress
          color='primary'
          size={24} // Aumenta o tamanho do spinner
          thickness={3} // Aumenta a espessura do stroke
        />
      </Box>
    );
  }
  return (
    <CustomTable<IntranetDocument>
      tableStyles={{
        maxHeight: "100%",
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
  return data.map((i) => ({
    ...i,
    type: documentTypeMap[i.type] as any,
  }));
};

const getColumns = ({
  handleOpenDetailsModal,
}: {
  handleOpenDetailsModal: (id: string) => void;
}): CustomTableColumn<IntranetDocument>[] => [
  {
    headerKey: "name",
    headerName: "Nome",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "description",
    headerName: "Descrição",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "type",
    headerName: "Tipo",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "id",
    headerName: "Detalhes",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
    render: (value, row) => (
      <Box
        onClick={() => handleOpenDetailsModal(row.id)}
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
