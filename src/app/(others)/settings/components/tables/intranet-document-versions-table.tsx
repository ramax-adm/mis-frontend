import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetIntranetDocumentVersions } from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
} from "@/types/intranet";
import { Alert, Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { getDocumentType } from "../../utils/get-document-type";

type GetParsedDataItemType = {
  id: string;
  documentName: string;
  documentType: IntranetDocumentTypeEnum;
  key: string;
  version: string;
  reviewNumber: number;
  storageType: string | undefined;
  storageKey: string | undefined;
  createdAt: Date;
  createdBy: string;
};

export function IntranetDocumentVersionTable() {
  const [, setStates] = useQueryStates({
    documentVersionDetailsModalOpen: parseAsBoolean.withDefault(false),
    documentVersionDetailsId: parseAsString.withDefault(""),
  });

  const handleOpenDetailsModal = (id: string) => {
    setStates({
      documentVersionDetailsId: id,
      documentVersionDetailsModalOpen: true,
    });
  };

  const { data: intranetDocumentVersions = [], isFetching } =
    useGetIntranetDocumentVersions();

  const columns = getColumns({ handleOpenDetailsModal });
  const parsedData = getData({ data: intranetDocumentVersions });
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
    <CustomTable<GetParsedDataItemType>
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
  data: IntranetDocumentVersion[];
}): GetParsedDataItemType[] => {
  return data
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((i) => ({
      id: i.id,
      documentName: i.document.name,
      documentType: getDocumentType(
        i.document.type
      ) as IntranetDocumentTypeEnum,
      key: i.key,
      version: i.version,
      reviewNumber: i.reviewNumber,
      storageType: i.storageType,
      storageKey: i.storageKey,
      createdAt: i.createdAt,
      createdBy: i.createdBy?.id,
    }));
};

const getColumns = ({
  handleOpenDetailsModal,
}: {
  handleOpenDetailsModal: (id: string) => void;
}): CustomTableColumn<GetParsedDataItemType>[] => [
  {
    headerKey: "key",
    headerName: "Identificador",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "documentName",
    headerName: "Nome",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "documentType",
    headerName: "Tipo",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "reviewNumber",
    headerName: "N° Revisão",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "version",
    headerName: "Versão",
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
