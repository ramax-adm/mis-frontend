import "@/app/globals.css";
import { CustomizedTable } from "@/components/Table/normal-table/body";
import { IoMdDownload } from "react-icons/io";
import {
  IntranetDocumentCategoryEnum,
  IntranetDocumentTypeEnum,
} from "@/types/intranet";
import { RiFileVideoFill } from "react-icons/ri";
import { Button, Modal } from "@mui/material";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { getYouTubeVideoId } from "@/utils/video.utils";
import { DocumentVideoModal } from "../modals/document-video-modal";
import { useGetIntranetDocumentsData } from "@/services/react-query/queries/intranet";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { GetIntranetUserDocumentsItem } from "@/types/api/intranet";
import { SquareArrowOutUpRight } from "lucide-react";
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

export function IntegrationKitTable() {
  const { data: documents, isFetching } = useGetIntranetDocumentsData({
    type: IntranetDocumentTypeEnum.INTEGRATION_KIT,
  });
  const [state, setState] = useQueryStates({
    documentViewerModalOpen: parseAsBoolean.withDefault(false),
    videoModalOpen: parseAsBoolean.withDefault(false),

    versionId: parseAsString.withDefault(""),
    signedUrl: parseAsString.withDefault(""),
    videoUrl: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });
  const handleCloseVideoModal = () =>
    setState({
      status: "",
      versionId: "",
      videoModalOpen: false,
      videoUrl: "",
    });

  const handleOpenVideoPlayer = ({
    versionId,
    storageKey,
    status,
  }: {
    versionId: string;
    storageKey: string;
    status: string;
  }) => {
    const videoId = getYouTubeVideoId(storageKey);

    if (videoId && videoId !== "") {
      setState({
        videoModalOpen: true,
        videoUrl: videoId,
        status,
        versionId,
      });
    }
  };

  const handleOpenDocumentViewer = ({
    versionId,
    signedUrl,
    status,
  }: {
    versionId: string;
    signedUrl: string;
    status: string;
  }) => {
    setState({
      documentViewerModalOpen: true,
      signedUrl,
      status,
      versionId,
    });
  };

  const data = getData({ data: documents });
  const columns = getColumns({
    handleOpenVideoPlayer,
    handleOpenDocumentViewer,
  });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <CustomTable<GetParsedData> columns={columns} rows={data} />
      <Modal open={state.videoModalOpen} onClose={handleCloseVideoModal}>
        <DocumentVideoModal
          versionId={state.versionId}
          videoUrl={state.videoUrl}
          status={state.status}
          onClose={handleCloseVideoModal}
        />
      </Modal>
    </>
  );
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
    .map((i) => ({ ...i, key: i.key ?? "N/D" }))
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
    .map((i) => ({
      ...i,
      categoryName: categoryMap[i.category],
      typeName: typeMap[i.type as IntranetDocumentTypeEnum],
    }));
};

const getColumns = ({
  handleOpenVideoPlayer,
  handleOpenDocumentViewer,
}: {
  handleOpenVideoPlayer: (data: {
    storageKey: string;
    status: string;
    versionId: string;
  }) => void;
  handleOpenDocumentViewer: ({
    versionId,
    signedUrl,
    status,
  }: {
    versionId: string;
    signedUrl: string;
    status: string;
  }) => void;
}): CustomTableColumn<GetParsedData>[] => {
  const openDocumentViewer = (row: any) => (
    <Button
      variant='text'
      onClick={() =>
        handleOpenDocumentViewer({
          signedUrl: row.signedUrl,
          status: row.status,
          versionId: row.versionId,
        })
      }
    >
      <SquareArrowOutUpRight size={14} />
    </Button>
  );

  const openVideoButton = (row: any) => (
    <Button
      onClick={() =>
        handleOpenVideoPlayer({
          storageKey: row.storageKey,
          status: row.status,
          versionId: row.versionId,
        })
      }
      variant='text'
    >
      <SquareArrowOutUpRight size={14} />
    </Button>
  );

  return [
    {
      headerKey: "key",
      headerName: "Identificador",
      sx: { fontSize: "12px", paddingX: 0.5 },
      cellSx: { fontSize: "11px", paddingX: 0.5 },
    },
    {
      headerKey: "name",
      headerName: "Nome POP",
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
      render: (value, row: any) => {
        switch (row.category) {
          case IntranetDocumentCategoryEnum.DOCUMENT: {
            return openDocumentViewer(row);
          }
          case IntranetDocumentCategoryEnum.VIDEO: {
            return openVideoButton(row);
          }
          default: {
            return "";
          }
        }
      },
    },
  ];
};
