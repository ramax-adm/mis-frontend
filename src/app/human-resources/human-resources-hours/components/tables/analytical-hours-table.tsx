import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { HumanResourceHoursAnalyticalParsedDataItem } from "@/types/api/human-resources-hours";
import { Box } from "@mui/material";

interface AnalyticalHoursTableProps {
  data: HumanResourceHoursAnalyticalParsedDataItem[];
}
export function AnalyticalHoursTable({ data }: AnalyticalHoursTableProps) {
  const columns = getColumns();

  return (
    <Box sx={{ marginTop: 2 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: "calc(100vh - 250px);",
          width: "100%",
        }}
        cellStyles={{}}
        headCellStyles={{}}
        columns={columns}
        data={data}
      />
    </Box>
  );
}
const getColumns = (): Column<HumanResourceHoursAnalyticalParsedDataItem>[] => {
  return [
    {
      headerName: "Data",
      type: "string",
      value: {
        first: {
          value: "date",
        },
      },
    },
    {
      headerName: "Empresa",
      // maxWidth: '80px',
      type: "string",
      value: {
        first: {
          value: "companyName",
        },
      },
    },
    // {
    //   headerName: 'N° Folha',
    //   // maxWidth: '80px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'payrollNumber',
    //     },
    //   },
    // },
    {
      headerName: "Funcionario",
      type: "string",
      value: {
        first: {
          value: "employeeName",
        },
      },
    },
    {
      headerName: "Departamento",
      type: "string",
      value: {
        first: {
          value: "department",
        },
      },
    },
    {
      headerName: "Hs. Normais",
      type: "string",
      value: {
        first: {
          value: "normalHours",
        },
      },
    },
    {
      headerName: "Hs. Folgas",
      type: "string",
      value: {
        first: {
          value: "hoursOff",
        },
      },
    },
    {
      headerName: "Hs. Extras",
      type: "string",
      value: {
        first: {
          value: "extraHours",
        },
      },
    },
    {
      headerName: "Hs.Faltas",
      type: "string",
      value: {
        first: {
          value: "absenceHours",
        },
      },
    },
  ];
};
