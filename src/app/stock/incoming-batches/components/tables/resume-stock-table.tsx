import { Column, CustomizedTable } from "@/components/Table/body";
import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { toLocaleString } from "@/utils/string.utils";

interface StockIncomingBatchesResumeTableProps {
  data: GetStockInconingBatchesResumeResponse["data"];
}
export function StockIncomingBatchesResumeTable({
  data,
}: StockIncomingBatchesResumeTableProps) {
  const columns = getColumns({ data });
  const parsedData = getData({ data });

  return <CustomizedTable columns={columns} data={parsedData} />;
}

const getColumns = ({ data }: StockIncomingBatchesResumeTableProps) => {
  const byExpireRangeData = Object.values(data).map(
    (i) => i.totals.byExpireRange
  );
  const byCompanyData = Object.values(data).map((i) => i.totals.byCompany);

  const totalsKeys = [
    ...Object.keys(byExpireRangeData),
    ...Object.keys(byCompanyData),
  ];
  return [
    {
      headerName: "Mercado",
      type: "string",
      value: { first: { value: "market" } },
    },
    {
      headerName: "Cod Linha",
      type: "string",
      value: { first: { value: "productLineCode" } },
    },
    {
      headerName: "Linha",
      type: "string",
      value: { first: { value: "productLineName" } },
    },
    {
      headerName: "Cod Produto",
      type: "string",
      value: { first: { value: "productCode" } },
    },
    {
      headerName: "Produto",
      type: "string",
      value: { first: { value: "productName" } },
    },
    {
      headerName: "Kg",
      type: "string",
      value: { first: { value: "totalWeightInKg" } },
    },
    {
      headerName: "Kg Vencido",
      type: "string",
      value: { first: { value: "totalExpiredWeightInKg" } },
    },
    ...totalsKeys.map((k) => ({
      headerName: k,
      type: "string",
      value: { first: { value: k } },
    })),
  ];
};

const getData = ({ data }: StockIncomingBatchesResumeTableProps) => {
  const dataValues = Object.values(data);

  return dataValues.map((item) => {
    // formata os prazos
    const expireRangeFormatted = Object.fromEntries(
      Object.entries(item.totals.byExpireRange).map(([key, value]) => [
        key,
        toLocaleString(value),
      ])
    );

    // formata as empresas
    const byCompanyFormatted = Object.fromEntries(
      Object.entries(item.totals.byCompany).map(([key, value]) => [
        key,
        toLocaleString(value),
      ])
    );

    return {
      market: item.market,
      productLineCode: item.productLineCode,
      productLineName: item.productLineName,
      product: `${item.productCode} - ${item.productName}`,
      totalWeightInKg: toLocaleString(item.totals.weightInKg),
      totalExpiredWeightInKg: toLocaleString(item.totals.expiredWeightInKg),
      ...expireRangeFormatted,
      ...byCompanyFormatted,
    };
  });
};
