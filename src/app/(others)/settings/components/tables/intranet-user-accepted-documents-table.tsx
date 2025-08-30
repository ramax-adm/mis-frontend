import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  useGetAcceptedIntranetDocumentsData,
  useGetIntranetDocumentVersions,
} from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentCategoryEnum,
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
  UserIntranetDocumentAcceptance,
} from "@/types/intranet";
import { Alert, Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { getDocumentType } from "../../utils/get-document-type";
import { formatSeconds, getDatetime } from "@/utils/date.utils";

type GetParsedDataItemType = {
  acceptedAt: string;
  username: string;
  documentName: string;
  documentType: IntranetDocumentTypeEnum;
  key: string;
  version: string;
  reviewNumber: number;
  majorChanges: string;
  category: IntranetDocumentCategoryEnum | undefined;
  acceptanceTime: string;
};

export function IntranetUserAcceptedDocumentsTable() {
  const { data: userDocumentAcceptances = [], isFetching } =
    useGetAcceptedIntranetDocumentsData();
  const columns = getColumns();
  const parsedData = getData({ data: userDocumentAcceptances });
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
  data: UserIntranetDocumentAcceptance[];
}): GetParsedDataItemType[] => {
  return data
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((i) => ({
      acceptedAt: getDatetime(i.createdAt),
      username: i.user.name,
      documentName: i.documentVersion.document.name,
      documentType: getDocumentType(
        i.documentVersion.document.type
      ) as IntranetDocumentTypeEnum,
      key: i.documentVersion.key,
      version: i.documentVersion.version,
      reviewNumber: i.documentVersion.reviewNumber,
      majorChanges: i.documentVersion.majorChanges,
      category: i.documentVersion.category,
      acceptanceTime: formatSeconds(i.acceptanceTimeInSeconds),
    }));
};

const getColumns = (): CustomTableColumn<GetParsedDataItemType>[] => [
  {
    headerKey: "acceptedAt",
    headerName: "Aceito em",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "username",
    headerName: "Usuario",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "key",
    headerName: "Identificador",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "documentName",
    headerName: "Documento",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "documentType",
    headerName: "Tipo",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "version",
    headerName: "Versão",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "reviewNumber",
    headerName: "Revisão",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
  {
    headerKey: "acceptanceTime",
    headerName: "Tempo para aceitação",
    sx: { paddingY: 0.2, paddingX: 1 },
    cellSx: { fontSize: 10, paddingX: 1 },
  },
];
