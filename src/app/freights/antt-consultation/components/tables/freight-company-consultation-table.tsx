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
import {
  useGetFreightCompaniesFilters,
  useGetFreightCompaniesWithConsultation,
  useGetFreightCompanyAnttConsultation,
} from "@/services/react-query/queries/freight-companies";
import { GetFreightCompanyAnttConsultationResponse } from "@/types/api/freight-companies";
import PaginatedTable from "@/components/Table/paginated-table";
import { formatDateToDDMMYYYY, formatToDate } from "@/utils/formatToDate";

export function FreightCompanyConsultationTable() {
  const [states] = useQueryStates({
    freightCompanyCode: parseAsString.withDefault(""),
  });
  const { data: freightCompanyConsultationData, isFetching } =
    useGetFreightCompanyAnttConsultation({
      sensattaCode: states.freightCompanyCode,
    });

  const columns = getColumns({});
  const parsedData = getData({ data: freightCompanyConsultationData });
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box sx={{ display: "grid", height: "100px" }}>
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "100px",
          placeContent: "center",
        }}
      >
        <Alert severity='info'>Sem Dados</Alert>
      </Box>
    );
  }
  return (
    <CustomTable<
      GetFreightCompanyAnttConsultationResponse["freightCompany"] & {
        parsedRegisteredAt: string;
      }
    >
      tableStyles={{}}
      columns={columns}
      rows={parsedData}
    />
  );
}

const getData = ({
  data,
}: {
  data?: GetFreightCompanyAnttConsultationResponse;
}) => {
  if (!data) return [];

  return [
    {
      ...data.freightCompany,
      parsedRegisteredAt: formatToDate(data.freightCompany.registeredAt),
    },
  ];
};

const getColumns = ({}: {}): CustomTableColumn<
  GetFreightCompanyAnttConsultationResponse["freightCompany"] & {
    parsedRegisteredAt: string;
  }
>[] => [
  {
    headerKey: "sensattaCode",
    headerName: "Codigo",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "name",
    headerName: "Transportadora",
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
    headerKey: "rnrtcCode",
    headerName: "RNRTC",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "rnrtcStatus",
    headerName: "Situação RNRTC",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "parsedRegisteredAt",
    headerName: "Cadastrado ANTT em",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "location",
    headerName: "Localidade",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
  {
    headerKey: "resultStatus",
    headerName: "Resultado Consulta ANTT",
    sx: { paddingY: 0.5, paddingX: 1 },
    cellSx: { fontSize: 12, paddingX: 1 },
  },
];
