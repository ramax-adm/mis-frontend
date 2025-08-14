import { Column, CustomizedTable } from "@/components/Table/body";
import { IoMdDownload } from "react-icons/io";
import "@/app/globals.css";

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

const getData = () => {
  return [
    {
      id: "Kit-01",
      name: "Código Conduta e Ética Ramax Group",
      fileUrl: "/Código Conduta e Ética Ramax Group (1).pdf",
    },
  ];
};

const getColumns = () => [
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
    headerName: "Download",
    type: "action",
    value: {
      first: {
        value: (row: any) => (
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
        ),
      },
    },
  },
];
