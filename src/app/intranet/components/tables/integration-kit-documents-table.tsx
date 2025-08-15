import "@/app/globals.css";
import { CustomizedTable } from "@/components/Table/body";
import { IoMdDownload } from "react-icons/io";
import { IntegrationKitFileTypeEnum } from "@/types/intranet";
import { RiFileVideoFill } from "react-icons/ri";
import { Modal } from "@mui/material";
import {
  parseAsBoolean,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { getYouTubeVideoId } from "@/utils/video.utils";
import { IntegrationKitVideoModal } from "../modals/integration-kit-video-modal";

export function IntegrationKitTable() {
  const [state, setState] = useQueryStates({
    videoModalOpen: parseAsBoolean.withDefault(false),
    selectedVideoId: parseAsString.withDefault(""),
  });
  const handleCloseVideoModal = () =>
    setState({
      videoModalOpen: false,
      selectedVideoId: "",
    });

  const handleOpenVideoPlayer = (fileUrl: string) => {
    const videoId = getYouTubeVideoId(fileUrl);

    if (videoId && videoId !== "") {
      setState({
        videoModalOpen: true,
        selectedVideoId: videoId,
      });
    }
  };

  const data = getData();
  const columns = getColumns({ handleOpenVideoPlayer });

  return (
    <>
      <CustomizedTable
        columns={columns}
        data={data}
        cellStyles={{ fontSize: "12px" }}
      />
      <Modal open={state.videoModalOpen} onClose={handleCloseVideoModal}>
        <IntegrationKitVideoModal selectedVideoId={state.selectedVideoId} />
      </Modal>
    </>
  );
}

const getData = () => {
  return [
    {
      id: "Kit-01",
      name: "Código Conduta e Ética Ramax Group",
      fileType: IntegrationKitFileTypeEnum.DOCUMENT,
      fileTypeName: "Documento",
      fileUrl: "/Código Conduta e Ética Ramax Group (1).pdf",
    },
    {
      id: "Kit-02",
      name: "Lista de contatos",
      fileType: IntegrationKitFileTypeEnum.DOCUMENT,
      fileTypeName: "Documento",
      fileUrl: "/Lista de contatos.xlsx",
    },
    {
      id: "Kit-03",
      name: "Treinamento RAMAX Group",
      fileType: IntegrationKitFileTypeEnum.VIDEO,
      fileTypeName: "Vídeo",
      fileUrl: "https://www.youtube.com/watch?v=a2njB7V-nsw",
    },
  ];
};

const getColumns = ({
  handleOpenVideoPlayer,
}: {
  handleOpenVideoPlayer: (fileUrl: string) => void;
}) => {
  const downloadButton = (row: any) => (
    <a
      className={"linkButton"}
      href={row.fileUrl}
      download
      style={{
        backgroundColor: "white",
        color: "#3E63DD",
        fontSize: "14px",
        textAlign: "center",
        padding: "4px 24px",
        borderRadius: "4px",
      }}
    >
      <IoMdDownload />
    </a>
  );

  const openVideoButton = (row: any) => (
    <span
      onClick={() => handleOpenVideoPlayer(row.fileUrl)}
      className={"linkButton"}
      style={{
        backgroundColor: "white",
        color: "#3E63DD",
        fontSize: "14px",
        textAlign: "center",
        padding: "4px 24px",
        borderRadius: "4px",
      }}
    >
      <RiFileVideoFill />
    </span>
  );

  return [
    {
      headerName: "Identificador",
      type: "string",
      value: {
        first: {
          value: "id",
        },
      },
    },
    {
      headerName: "Nome Kit Integração",
      type: "string",
      value: {
        first: {
          value: "name",
        },
      },
    },
    {
      headerName: "Tipo documento",
      type: "string",
      value: {
        first: {
          value: "fileTypeName",
        },
      },
    },
    {
      headerName: "Ação",
      type: "action",
      value: {
        first: {
          value: (row: any) => {
            switch (row.fileType) {
              case IntegrationKitFileTypeEnum.DOCUMENT: {
                return downloadButton(row);
              }
              case IntegrationKitFileTypeEnum.VIDEO: {
                return openVideoButton(row);
              }
              default: {
                return "";
              }
            }
          },
        },
      },
    },
  ];
};
