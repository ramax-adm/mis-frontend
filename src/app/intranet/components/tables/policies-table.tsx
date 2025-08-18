import { Column, CustomizedTable } from "@/components/Table/body";
import { IoMdDownload } from "react-icons/io";
import "@/app/globals.css";

export function PoliciesTable() {
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
      id: "GC-001-01",
      name: "Politica de Viagem",
      fileUrl: "/(GC-001-01) - Política de Viagem V1.1.pdf",
    },
    {
      id: "GC-002-01",
      name: "Politica de Cadastro",
      fileUrl: "/(GC-002-01) - Política de Cadastro.pdf",
    },
    {
      id: "GC-003-01",
      name: "Politica de Inventário",
      fileUrl: "/(GC-003-01) - Política de Inventário.pdf",
    },
    {
      id: "GC-004-01",
      name: "Politica de Compras",
      fileUrl: "/(GC-004-01) - Política de Compras.pdf",
    },
    {
      id: "GC-005-01",
      name: "Politica de Devolução Atacado",
      fileUrl: "/(GC-005-01) - Política de Devolução Atacado.pdf",
    },
    {
      id: "GC-006-01",
      name: "Politica de Fretes",
      fileUrl: "/(GC-006-01) - Política de Fretes.pdf",
    },
    {
      id: "GC-007-01",
      name: "Politica de Cobrança",
      fileUrl: "/(GC-007-01) - Política de Cobrança.pdf",
    },
    {
      id: "GC-008-01",
      name: "Política de Acerto de Pecuarista",
      fileUrl: "/(GC-008-01) - Política de Acerto de Pecuarista.pdf",
    },
    {
      id: "RH-001-01",
      name: "Política de Contratação de Colaborador",
      fileUrl:
        "/(RH-001-01) - Política de Contratação de Colaborador (MOBILIDADE).pdf",
    },
    {
      id: "RH-002-01",
      name: "Politica Home Office",
      fileUrl: "/(RH-002-01) Política Home_Office.pdf",
    },
    {
      id: "RON-001-01",
      name: "Política de Classificação e Premiação Pecuaristas",
      fileUrl:
        "/(RON-001-01) Política de Classificação e Premiação Pecuaristas.pdf",
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
    headerName: "Nome Politica",
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
