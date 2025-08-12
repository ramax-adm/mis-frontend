import { Column, CustomizedTable } from "@/components/Table/body";
import { IoMdDownload } from "react-icons/io";
import "@/app/globals.css";

export function PopsTable() {
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
      id: "POP-01",
      name: "Manual de Procedimento Operacional Padrão [Sensatta]",
      fileUrl: "/Manual de Procedimento Operacional Padrão [Sensatta] (1).pdf",
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
    headerName: "Nome Pop",
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
