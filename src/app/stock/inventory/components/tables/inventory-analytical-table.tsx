import { LoaderIcon } from "@/app/business-audit/components/customized/loader-icon";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { InventoryGetAnalitycalDataResponse } from "@/types/api/inventory";
import { Alert, Box, Typography } from "@mui/material";

type InventoryAnalyticalParsedData = {
  inventoryId: string;
  warehouseCode: string;
  productCode: string;
  productName: string;
  boxNumber: string;
  weightInKg: number;
};

interface InventoryAnalyticalTableProps {
  data?: InventoryGetAnalitycalDataResponse["data"];
  isFetching: boolean;
}
export function InventoryAnalyticalTable({
  data,
  isFetching,
}: InventoryAnalyticalTableProps) {
  const columns = getColumns({ data });
  const parsedData = getData({ data });

  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 250px);",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "550px",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <Alert severity='info'> Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <PaginatedTable<InventoryAnalyticalParsedData>
      columns={columns}
      rows={parsedData}
      tableStyles={{
        height: "calc(100vh - 250px);",
      }}
    />
  );
}

const getColumns = ({
  data = [],
}: {
  data?: InventoryGetAnalitycalDataResponse["data"];
}): PaginatedTableColumn<InventoryAnalyticalParsedData>[] => {
  // 🧠 Passo 1: Encontrar o item que tem mais eventos
  const itemWithMostEvents = data.reduce(
    (max, current) => {
      const currentEventsCount = Object.keys(current.events || {}).length;
      const maxEventsCount = Object.keys(max.events || {}).length;
      return currentEventsCount > maxEventsCount ? current : max;
    },
    data[0] ?? { events: {} as Record<string, string> }
  );

  // Se não houver dados, retorna apenas as colunas fixas
  if (!itemWithMostEvents) {
    return [];
  }

  // 🏗️ Passo 3: Montar as colunas fixas
  const columns: PaginatedTableColumn<InventoryAnalyticalParsedData>[] = [
    {
      headerKey: "inventoryId",
      headerName: "Inventário",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    {
      headerKey: "warehouseCode",
      headerName: "Cod. Almoxarifado",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    {
      headerKey: "productCode",
      headerName: "Cod. Produto",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    {
      headerKey: "productName",
      headerName: "Produto",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    {
      headerKey: "boxNumber",
      headerName: "Nº Caixa",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    {
      headerKey: "weightInKg",
      headerName: "Peso (KG)",
      sx: { paddingX: 1, fontSize: 10 },
      cellSx: { paddingX: 1 },
    },
    ...Object.keys(itemWithMostEvents.events).map(
      (eventKey, index) =>
        ({
          headerKey: eventKey,
          headerName: `Evento ${index + 1}`,
          cellSx: { maxWidth: "180px" },
        }) as PaginatedTableColumn<InventoryAnalyticalParsedData>
    ),
  ];

  // 🧾 Passo 5: Retornar todas as colunas combinadas
  return columns;
};

const getData = ({
  data = [],
}: {
  data?: InventoryGetAnalitycalDataResponse["data"];
}) => {
  // 🧩 Mapeia cada item do inventário para uma linha da tabela
  const rows = data.map((item) => {
    // 🧠 Base fixa (dados principais do item)
    const baseData = {
      inventoryId: item.inventoryId,
      warehouseCode: item.warehouseCode,
      productCode: item.productCode,
      productName: item.productName,
      boxNumber: item.boxNumber,
      weightInKg: item.weightInKg,
    };

    // 🔄 Eventos dinâmicos (ex: event_1, event_2, ...)
    const eventData = Object.entries(item.events || {}).reduce(
      (acc, [eventKey, eventValue]) => {
        acc[eventKey] = eventValue;
        return acc;
      },
      {} as Record<string, string>
    );

    // 🧱 Combina os dados fixos + eventos dinâmicos
    return {
      ...baseData,
      ...eventData,
    };
  });

  return rows;
};
