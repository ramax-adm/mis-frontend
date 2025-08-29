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

export function PopsTable() {
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
    type: IntranetDocumentTypeEnum.POP,
  });

  const data = getData({ data: documents });
  const columns = getColumns({
    handleOpenDocumentViewer,
  });
  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <CustomizedTable
      columns={columns}
      data={data}
      cellStyles={{ fontSize: "12px" }}
    />
  );
}

const getData = ({ data = [] }: { data?: GetIntranetUserDocumentsItem[] }) => {
  const categoryMap = {
    [IntranetDocumentCategoryEnum.DOCUMENT]: "Documento",
    [IntranetDocumentCategoryEnum.VIDEO]: "Video",
  };
  const typeMap = {
    [IntranetDocumentTypeEnum.INTEGRATION_KIT]: "Kit Integração",
    [IntranetDocumentTypeEnum.POLICY]: "Politica",
    [IntranetDocumentTypeEnum.POP]: "POP",
  };
  return data.map((i) => ({
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
}) => [
  {
    headerName: "Identificador",
    type: "string",
    value: {
      first: {
        value: "key",
      },
    },
  },
  {
    headerName: "Nome Politica",
    type: "string",
    value: {
      first: {
        value: "name",
      },
    },
  },
  {
    headerName: "Descrição",
    type: "string",
    value: {
      first: {
        value: "description",
      },
    },
  },
  {
    headerName: "Tipo",
    type: "string",
    value: {
      first: {
        value: "typeName",
      },
    },
  },
  {
    headerName: "Categoria",
    type: "string",
    value: {
      first: {
        value: "categoryName",
      },
    },
  },
  {
    headerName: "Versão",
    type: "string",
    value: {
      first: {
        value: "version",
      },
    },
  },
  {
    headerName: "N° Revisão",
    type: "string",
    value: {
      first: {
        value: "reviewNumber",
      },
    },
  },
  {
    headerName: "Status",
    type: "string",
    value: {
      first: {
        value: "status",
      },
    },
  },
  {
    headerName: "Ação",
    type: "action",
    value: {
      first: {
        value: (row: any) => (
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
    },
  },
];
