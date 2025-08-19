import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
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
      id: "POP-ORG-001-01",
      name: "Procedimento Originação",
      fileUrl: "/(POP-ORG-001-01) Procedimento Originação.pdf",
    },
    {
      id: "POP-COM-004-01",
      name: "Procedimento Cancelamento de Pedidos",
      fileUrl: "/(POP-COM-004-01) Procedimento Cancelamento de Pedidos.pdf",
    },
    {
      id: "POP-COM-005-01",
      name: "Procedimento Pedido Web",
      fileUrl: "/(POP-COM-005-01) Pedido Web.pdf",
    },
    {
      id: "POP-LOG-003-01",
      name: "Procedimento de Pré-embarque e Embarque",
      fileUrl: "/(POP-LOG-003-01) Procedimento de Pré-embarque e Embarque.pdf",
    },
    {
      id: "POP-RON-001-01",
      name: "Procedimento Uso Veiculos Rondon",
      fileUrl: "/(POP-RON-001-01) Procedimento_Uso_Veiculos_Rondon.pdf",
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
