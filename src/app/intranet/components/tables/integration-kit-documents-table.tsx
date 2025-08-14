import { Column, CustomizedTable } from "@/components/Table/body";
import { IoMdDownload } from "react-icons/io";
import "@/app/globals.css";
import { IntegrationKitFileTypeEnum } from "@/types/intranet";
import { RiFileVideoFill } from "react-icons/ri";

export function IntegrationKitTable() {
  const data = getData();
  const columns = getColumns();

  return (
    <CustomizedTable
      columns={columns}
      data={data}
      cellStyles={{ fontSize: "12px" }}
    />
  );
}

const handleOpenVideoPlayer = () => {};

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
      name: "Teste (SEM FUNCIONALIDADE)",
      fileType: IntegrationKitFileTypeEnum.VIDEO,
      fileTypeName: "Vídeo",
      fileUrl: "",
    },
  ];
};

const getColumns = () => {
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
      headerName: "Download",
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
