import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import {
  HumanResourceHoursAnalyticalParsedDataItem,
  MoreThanTwoExtraHoursRegistriesItem,
} from "@/types/api/human-resources-hours";
import { Box } from "@mui/material";

interface AnalysesMoreThanTwoExtraHoursTableProps {
  data: MoreThanTwoExtraHoursRegistriesItem[];
}
export function AnalysesMoreThanTwoExtraHoursTable({
  data,
}: AnalysesMoreThanTwoExtraHoursTableProps) {
  const columns = getColumns();

  data.sort((a, b) => b.extraHoursInSeconds - a.extraHoursInSeconds);

  return (
    <Box sx={{ marginTop: 2 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: "170px",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "9px",
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "10px",
        }}
        columns={columns}
        data={data}
      />
    </Box>
  );
}
const getColumns = (): Column<MoreThanTwoExtraHoursRegistriesItem>[] => {
  return [
    {
      headerName: "Data",
      maxWidth: "40px",
      type: "date",
      value: {
        first: {
          value: "date",
        },
      },
    },
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
      headerName: "Dept.",
      type: "string",
      value: {
        first: {
          value: "department",
        },
      },
    },
    {
      headerName: "Hs",
      type: "string",
      value: {
        first: {
          value: "extraHours",
        },
      },
    },
  ];
};
