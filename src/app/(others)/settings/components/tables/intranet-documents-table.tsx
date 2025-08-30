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
import { Pencil, SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { getDocumentType } from "../../utils/get-document-type";

export function IntranetDocumentsTable() {
  const [, setStates] = useQueryStates({
    documentDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentDetailsId: parseAsString.withDefault(""),
    documentEditModalOpen: parseAsBoolean.withDefault(false),
    documentEditId: parseAsString.withDefault(""),
  });

  const handleOpenDetailsModal = (id: string) => {
    setStates({ documentDetailsId: id, documentDetailsModalOpen: true });
  };
  const handleOpenEditModal = (id: string) => {
    setStates({ documentEditId: id, documentEditModalOpen: true });
  };

  const { data: intranetDocuments = [], isFetching } =
    useGetIntranetDocuments();
  const columns = getColumns({ handleOpenDetailsModal, handleOpenEditModal });
  const parsedData = getData({ data: intranetDocuments });
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return <LoaderIcon />;
  }

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
  return data.map((i) => ({
    ...i,
    type: getDocumentType(i.type) as any,
  }));
};

const getColumns = ({
  handleOpenDetailsModal,
  handleOpenEditModal,
}: {
  handleOpenDetailsModal: (id: string) => void;
  handleOpenEditModal: (id: string) => void;
}): CustomTableColumn<IntranetDocument>[] => [
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
    headerName: "Editar",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
    render: (value, row) => (
      <Box
        onClick={() => handleOpenEditModal(row.id)}
        sx={{
          "&:hover": {
            color: grey["700"],
            cursor: "pointer",
          },
        }}
      >
        <Pencil size={14} />
      </Box>
    ),
  },
  {
    headerKey: "id",
    headerName: "Detalhes",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
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
