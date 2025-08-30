import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { IoMdDownload } from "react-icons/io";
import "@/app/globals.css";
import { useQueryStates, parseAsBoolean, parseAsString } from "nuqs";
import { Button } from "@mui/material";
import { useGetIntranetDocumentsData } from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentCategoryEnum,
  IntranetDocumentTypeEnum,
} from "@/types/intranet";
import { GetIntranetUserDocumentsItem } from "@/types/api/intranet";
import { SquareArrowOutUpRight } from "lucide-react";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";

type GetParsedData = {
  categoryName: string;
  typeName: string;
  id: string;
  key: string;
  name: string;
  description: string;
  category: IntranetDocumentCategoryEnum;
  status: string;
  type: string;
  reviewNumber: string;
  version: string;
  storageType: string;
  storageKey: string;
  createdAt: string;
  createdById: string;
  createdBy: string;
  versionCreatedById: string;
  versionCreatedBy: string;
  signedUrl: string;
};

export function PoliciesTable() {
  const [, setStates] = useQueryStates({
    documentViewerModalOpen: parseAsBoolean.withDefault(false),
    versionId: parseAsString.withDefault(""),
    signedUrl: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });
  const handleOpenDocumentViewer = ({
    versionId,
    signedUrl,
    status,
  }: {
    versionId: string;
    signedUrl: string;
    status: string;
  }) => {
    setStates({
      documentViewerModalOpen: true,
      signedUrl,
      status,
      versionId,
    });
  };

  const { data: documents, isFetching } = useGetIntranetDocumentsData({
    type: IntranetDocumentTypeEnum.POLICY,
  });

  const data = getData({ data: documents });
  const columns = getColumns({
    handleOpenDocumentViewer,
  });
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return <CustomTable<GetParsedData> columns={columns} rows={data} />;
}

const getData = ({
  data = [],
}: {
  data?: GetIntranetUserDocumentsItem[];
}): GetParsedData[] => {
  const categoryMap = {
    [IntranetDocumentCategoryEnum.DOCUMENT]: "Documento",
    [IntranetDocumentCategoryEnum.VIDEO]: "Video",
  };
  const typeMap = {
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.POP]: "POP",
  };
  return data
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
    .map((i) => ({
      ...i,
      categoryName: categoryMap[i.category],
      typeName: typeMap[i.type as IntranetDocumentTypeEnum],
    }));
};

const getColumns = ({
  handleOpenDocumentViewer,
}: {
  handleOpenDocumentViewer: (data: {
    versionId: string;
    signedUrl: string;
    status: string;
  }) => void;
}): CustomTableColumn<GetParsedData>[] => [
  {
    headerKey: "key",
    headerName: "Identificador",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "name",
    headerName: "Nome Politica",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "description",
    headerName: "Descrição",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "typeName",
    headerName: "Tipo",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "categoryName",
    headerName: "Categoria",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "version",
    headerName: "Versão",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "reviewNumber",
    headerName: "N° Revisão",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "status",
    headerName: "Status",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "id",
    headerName: "Ação",
    sx: { fontSize: "12px", paddingX: 0.5 },
    cellSx: { fontSize: "11px", paddingX: 0.5 },

    render: (value, row: any) => (
      <Button
        onClick={() =>
          handleOpenDocumentViewer({
            signedUrl: row.signedUrl,
            status: row.status,
            versionId: row.versionId,
          })
        }
        style={{
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
