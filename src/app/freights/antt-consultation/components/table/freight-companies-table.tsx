import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetIntranetDocumentVersions } from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
} from "@/types/intranet";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight, Trash } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useRemoveDocumentVersion } from "@/services/react-query/mutations/intranet";
import { LoaderIcon } from "../customized/loader-icon";
import { useGetFreightCompaniesWithConsultation } from "@/services/react-query/queries/freight-companies";
import { GetFreightCompaniesResponseItem } from "@/types/api/freight-companies";
import PaginatedTable from "@/components/Table/paginated-table";

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

export function FreightCompaniesTable() {
  const { data: freightCompanies = [], isFetching } =
    useGetFreightCompaniesWithConsultation();

  const columns = getColumns({});
  const parsedData = getData({ data: freightCompanies });
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
        <Alert severity='info'>Sem Dados</Alert>
      </Box>
    );
  }
  return (
    <PaginatedTable<GetFreightCompaniesResponseItem>
      tableStyles={{
        height: "calc(100vh - 200px)",
      }}
      columns={columns}
      rows={parsedData}
    />
  );
}

const getData = ({ data }: { data: GetFreightCompaniesResponseItem[] }) => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
};

const getColumns =
  ({}: {}): CustomTableColumn<GetFreightCompaniesResponseItem>[] => [
    {
      headerKey: "sensattaCode",
      headerName: "Codigo",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "name",
      headerName: "Nome",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "cnpj",
      headerName: "CNPJ",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "stateSubscription",
      headerName: "Inscrição Estadual",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "city",
      headerName: "Cidade",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "uf",
      headerName: "UF",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "rnrtcCode",
      headerName: "Cod. RNRTC",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "resultStatus",
      headerName: "Resultado Consulta",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
    {
      headerKey: "verifiedAt",
      headerName: "Verificado em",
      sx: { paddingY: 0.5, paddingX: 1 },
      cellSx: { fontSize: 12, paddingX: 1 },
    },
  ];
