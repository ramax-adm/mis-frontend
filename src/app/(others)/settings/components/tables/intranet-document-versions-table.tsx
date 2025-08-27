import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetIntranetDocumentVersions } from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
} from "@/types/intranet";
import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

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
    <CustomTable<GetParsedDataItemType>
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
  data: IntranetDocumentVersion[];
}): GetParsedDataItemType[] => {
  const documentTypeMap = {
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POP]: "POP",
  };
  return data
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((i) => ({
      id: i.id,
      documentName: i.document.name,
      documentType: documentTypeMap[i.document.type] as any,
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
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "documentName",
    headerName: "Nome",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "documentType",
    headerName: "Tipo",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "reviewNumber",
    headerName: "N° Revisão",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { paddingX: 1 },
  },
  {
    headerKey: "version",
    headerName: "Versão",
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
