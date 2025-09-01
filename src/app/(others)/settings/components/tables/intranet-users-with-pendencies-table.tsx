import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  useGetIntranetDocuments,
  useGetIntranetDocumentVersions,
  useGetPendingAcceptanceIntranetDocumentsData,
} from "@/services/react-query/queries/intranet";
import { GetPendingAcceptanceDocumentsResponseDto } from "@/types/api/intranet";
import {
  IntranetDocument,
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
} from "@/types/intranet";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { getDocumentType } from "../../utils/get-document-type";

interface IntranetUsersWithPendenciesTableProps {
  handleSelectUserPendency: (
    newState: GetPendingAcceptanceDocumentsResponseDto | null
  ) => void;
}
export function IntranetUsersWithPendenciesTable({
  handleSelectUserPendency,
}: IntranetUsersWithPendenciesTableProps) {
  const { data: pendingAcceptanceDocuments = [], isFetching } =
    useGetPendingAcceptanceIntranetDocumentsData();
  const columns = getColumns({ handleSelectUserPendency });
  const parsedData = getData({ data: pendingAcceptanceDocuments });
  const haveSomeData = parsedData.length > 0;

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
    <CustomTable<GetPendingAcceptanceDocumentsResponseDto>
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
  data: GetPendingAcceptanceDocumentsResponseDto[];
}): GetPendingAcceptanceDocumentsResponseDto[] => {
  return data
    .sort((a, b) =>
      a.userName.localeCompare(b.userName, undefined, { numeric: true })
    )

    .map((userData) => {
      const updatedPendingDocs = userData.pendingDocumentVersions.map(
        (docVersion) => {
          const updatedDocument = {
            ...docVersion.document,
            type: getDocumentType(
              docVersion.document.type
            ) as IntranetDocumentTypeEnum,
          };

          return {
            ...docVersion,
            document: updatedDocument,
          };
        }
      );

      return {
        ...userData,
        pendingDocumentVersions: updatedPendingDocs,
      };
    });
};

const getColumns = ({
  handleSelectUserPendency,
}: {
  handleSelectUserPendency: (
    newState: GetPendingAcceptanceDocumentsResponseDto | null
  ) => void;
}): CustomTableColumn<GetPendingAcceptanceDocumentsResponseDto>[] => [
  {
    headerKey: "userId",
    headerName: "Id Usuario",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "userName",
    headerName: "Usuario",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "userRoleName",
    headerName: "Departamento",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "pendencesQuantity",
    headerName: "Qtd Pendencias",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "userId",
    headerName: "Ação",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },

    render: (value, row) => (
      <Button
        onClick={() => handleSelectUserPendency(row)}
        sx={{
          backgroundColor: "white",
          color: "#3E63DD",
          fontSize: "14px",
          textAlign: "center",
          padding: "4px 24px",
          borderRadius: "4px",
        }}
      >
        <SquareArrowOutUpRight size={14} />
      </Button>
    ),
  },
];
