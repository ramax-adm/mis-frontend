import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { useGetSalesDeductionParams } from "@/services/react-query/queries/parameters";
import { GetSalesDeductionsParametersResponseItem } from "@/types/api/parameters";
import { MarketEnum } from "@/types/sensatta";
import { Alert } from "@mui/material";

interface SalesDeductionsParamsTableProps {
  companyCode: string | null;
  market: MarketEnum;
  name: string;
}
export function SalesDeductionsParamsTable({
  companyCode,
  market,
  name,
}: SalesDeductionsParamsTableProps) {
  const { data: params, isFetching } = useGetSalesDeductionParams({
    companyCode,
    market,
    name,
  });

  const columns = getColumns();
  const haveSomeData = params && params.length > 0;

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {haveSomeData && (
        <CustomizedTable<any>
          columns={columns}
          data={params}
          cellStyles={{ fontSize: "12px" }}
        />
      )}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 2, marginX: "auto" }}>
          Sem Dados
        </Alert>
      )}
    </>
  );
}

const getColumns = (): Column<GetSalesDeductionsParametersResponseItem>[] => {
  return [
    {
      headerName: "Empresa",
      type: "string",
      value: {
        first: {
          value: "companyCode",
        },
      },
    },
    {
      headerName: "Imposto",
      type: "string",
      value: {
        first: {
          value: "name",
        },
      },
    },
    {
      headerName: "Mercado",
      type: "string",
      value: {
        first: {
          value: "market",
        },
      },
    },
    {
      headerName: "Valor",
      type: "string",
      value: {
        first: {
          value: "value",
        },
      },
    },
  ];
};
