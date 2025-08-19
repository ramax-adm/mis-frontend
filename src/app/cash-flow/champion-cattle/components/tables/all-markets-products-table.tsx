import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import {
  PostSimulateCashFlowChampionCattleResponse,
  SimulateCashFlowChampionCattleItem,
} from "@/types/api/cash-flow-champion-cattle";
import {
  fromLocaleStringToNumber,
  nb2,
  toLocaleString,
} from "@/utils/number.utils";
import { toCurrency } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface AllMarketsProductsTableProps {
  dailyProducts?: Pick<
    PostSimulateCashFlowChampionCattleResponse["day"],
    "bothMarketProducts"
  >;
  projectedProducts?: Pick<
    PostSimulateCashFlowChampionCattleResponse["projected"],
    "bothMarketProducts"
  >;
}
export function AllMarketsProductsTable({
  dailyProducts,
  projectedProducts,
}: AllMarketsProductsTableProps) {
  const columns = getColumns();
  const totals = sumProductTotals(dailyProducts?.bothMarketProducts);
  return (
    <Box
      sx={{
        width: "100%",
        height: "350px",
        display: "grid",
        backgroundColor: "white",
        border: `1px solid ${COLORS.BORDAS}`,
        borderRadius: 3,
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        paddingY: 1,
        paddingX: 0.5,
        gap: 1,
      }}
    >
      <Typography variant='body2' fontWeight={700} color={"#3E63DD"}>
        Produtos ME/MI
      </Typography>
      {/** TODO */}
      <CustomizedTable<any>
        data={dailyProducts?.bothMarketProducts ?? []}
        columns={columns}
        tableStyles={{}}
        cellStyles={{
          paddingX: 1,
          fontSize: "9.5px",
          paddingY: 0.5,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "10px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>KG Prod ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toLocaleString(totals.totalMeKgProducted)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>KG Prod MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toLocaleString(totals.totalMiKgProducted)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Receitas ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeInbound)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Receitas MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiInbound)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Compra Gado ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeBuy)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Compra Gado MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiBuy)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Operação ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeOperationCosts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Operação Mi</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiOperationCosts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Vendas ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeSalles)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Vendas MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiSalles)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Custo Total ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeCosts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Custo Total MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiCosts)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Resultado ME</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMeResult)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography fontSize={"10px"}>Resultado MI</Typography>
          <Typography fontSize={"12px"} fontWeight={700}>
            {toCurrency(totals.totalMiResult)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const getColumns = (): Column<SimulateCashFlowChampionCattleItem>[] => {
  return [
    {
      headerName: "Produto",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      maxWidth: "50px",
      type: "string",
      value: {
        first: {
          value: "productName",
        },
      },
    },
    {
      headerName: "Quarteio",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      maxWidth: "30px",
      type: "string",
      value: {
        first: {
          value: "productQuarter",
        },
      },
    },
    {
      headerName: "% Rend ME",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: "string",
      value: {
        first: {
          value: "incomeMe",
        },
      },
    },
    {
      headerName: "% Rend MI",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: "string",
      value: {
        first: {
          value: "incomeMi",
        },
      },
    },
    {
      headerName: "R$ ME",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: "string",
      value: {
        first: {
          value: "productPriceMe",
        },
      },
    },
    {
      headerName: "R$ MI",
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: "string",
      value: {
        first: {
          value: "productPriceMi",
        },
      },
    },
    {
      headerName: "KG Prod. ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_AZUL,
      headerColor: COLORS.TABELAS.FUNDO_AZUL_HEADER,
      type: "string",
      value: {
        first: {
          value: "meProduction",
        },
      },
    },
    {
      headerName: "KG Prod. MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_AZUL,
      headerColor: COLORS.TABELAS.FUNDO_AZUL_HEADER,
      type: "string",
      value: {
        first: {
          value: "miProduction",
        },
      },
    },
    {
      headerName: "Receitas ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      headerColor: COLORS.TABELAS.FUNDO_VERDE_HEADER,
      type: "string",
      value: {
        first: {
          value: "meTotalInbound",
        },
      },
    },
    {
      headerName: "Receitas MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      headerColor: COLORS.TABELAS.FUNDO_VERDE_HEADER,
      type: "string",
      value: {
        first: {
          value: "miTotalInbound",
        },
      },
    },
    {
      headerName: "Compra Gado ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "meBuyCosts",
        },
      },
    },
    {
      headerName: "Compra Gado MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "miBuyCosts",
        },
      },
    },
    {
      headerName: "Operação ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "meOperationCosts",
        },
      },
    },
    {
      headerName: "Operação MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "miOperationCosts",
        },
      },
    },
    {
      headerName: "Vendas ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "totalMeSalles",
        },
      },
    },
    {
      headerName: "Vendas MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "totalMiSalles",
        },
      },
    },
    {
      headerName: "Custo Total ME",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "meTotalCosts",
        },
      },
    },
    {
      headerName: "Custo Total MI",
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: "string",
      value: {
        first: {
          value: "miTotalCosts",
        },
      },
    },
    {
      headerName: "Resultado ME",

      type: "string",
      value: {
        first: {
          value: "finalResultMe",
        },
      },
    },
    {
      headerName: "Resultado ME/KG",
      conditionalColor: (row: SimulateCashFlowChampionCattleItem) => {
        const meResultKg = fromLocaleStringToNumber(
          row.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) =>
            match.includes("-") ? "-" : ""
          )
        );
        const miResultKg = fromLocaleStringToNumber(
          row.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) =>
            match.includes("-") ? "-" : ""
          )
        );

        return meResultKg > miResultKg ? "rgba(0, 146, 13, 0.5)" : "";
      },
      conditionalFontColor: (row: SimulateCashFlowChampionCattleItem) => {
        const result = fromLocaleStringToNumber(
          row.finalResultMeKg
            .replace(/\s/g, "") // remove espaços
            .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
            .replace(/^R\$/, "") // remove só "R$" (sem sinal)
        );

        return result < 0 ? "rgba(255, 0, 0, 1)" : "";
      },
      type: "string",
      value: {
        first: {
          value: "finalResultMeKg",
        },
      },
    },
    {
      headerName: "Resultado MI",
      type: "string",
      value: {
        first: {
          value: "finalResultMi",
        },
      },
    },
    {
      headerName: "Resultado MI/KG",
      conditionalColor: (row: SimulateCashFlowChampionCattleItem) => {
        const meResultKg = fromLocaleStringToNumber(
          row.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) =>
            match.includes("-") ? "-" : ""
          )
        );
        const miResultKg = fromLocaleStringToNumber(
          row.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) =>
            match.includes("-") ? "-" : ""
          )
        );

        return miResultKg > meResultKg ? "rgba(0, 146, 13, 0.5)" : "";
      },
      conditionalFontColor: (row: SimulateCashFlowChampionCattleItem) => {
        const result = fromLocaleStringToNumber(
          row.finalResultMiKg
            .replace(/\s/g, "") // remove espaços
            .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
            .replace(/^R\$/, "") // remove só "R$" (sem sinal)
        );

        return result < 0 ? "rgba(255, 0, 0, 1)" : "";
      },
      type: "string",
      value: {
        first: {
          value: "finalResultMiKg",
        },
      },
    },
  ];
};

const sumProductTotals = (data: SimulateCashFlowChampionCattleItem[] = []) => {
  const parsedData = data.map((item) => ({
    meProduction: fromLocaleStringToNumber(item.meProduction),
    miProduction: fromLocaleStringToNumber(item.miProduction),
    meTotalInbound: fromLocaleStringToNumber(
      item.meTotalInbound
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    miTotalInbound: fromLocaleStringToNumber(
      item.miTotalInbound
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    meBuyCosts: fromLocaleStringToNumber(
      item.meBuyCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    miBuyCosts: fromLocaleStringToNumber(
      item.miBuyCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    meOperationCosts: fromLocaleStringToNumber(
      item.meOperationCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    miOperationCosts: fromLocaleStringToNumber(
      item.miOperationCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    totalMeSalles: fromLocaleStringToNumber(
      item.totalMeSalles
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    totalMiSalles: fromLocaleStringToNumber(
      item.totalMiSalles
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    meTotalCosts: fromLocaleStringToNumber(
      item.meTotalCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    miTotalCosts: fromLocaleStringToNumber(
      item.miTotalCosts
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    finalResultMe: fromLocaleStringToNumber(
      item.finalResultMe
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
    finalResultMi: fromLocaleStringToNumber(
      item.finalResultMi
        .replace(/\s/g, "") // remove espaços
        .replace(/^-\s*R\$/, "-") // trata apenas "- R$"
        .replace(/^R\$/, "") // remove só "R$" (sem sinal)
    ),
  }));

  return {
    totalMeKgProducted: nb2(
      parsedData.reduce((acc, item) => acc + item.meProduction, 0)
    ),
    totalMiKgProducted: nb2(
      parsedData.reduce((acc, item) => acc + item.miProduction, 0)
    ),
    totalMeInbound: nb2(
      parsedData.reduce((acc, item) => acc + item.meTotalInbound, 0)
    ),
    totalMiInbound: nb2(
      parsedData.reduce((acc, item) => acc + item.miTotalInbound, 0)
    ),
    totalMeBuy: nb2(parsedData.reduce((acc, item) => acc + item.meBuyCosts, 0)),
    totalMiBuy: nb2(parsedData.reduce((acc, item) => acc + item.miBuyCosts, 0)),
    totalMeOperationCosts: nb2(
      parsedData.reduce((acc, item) => acc + item.meOperationCosts, 0)
    ),
    totalMiOperationCosts: nb2(
      parsedData.reduce((acc, item) => acc + item.miOperationCosts, 0)
    ),
    totalMeSalles: nb2(
      parsedData.reduce((acc, item) => acc + item.totalMeSalles, 0)
    ),
    totalMiSalles: nb2(
      parsedData.reduce((acc, item) => acc + item.totalMiSalles, 0)
    ),
    totalMeCosts: nb2(
      parsedData.reduce((acc, item) => acc + item.meTotalCosts, 0)
    ),
    totalMiCosts: nb2(
      parsedData.reduce((acc, item) => acc + item.miTotalCosts, 0)
    ),
    totalMeResult: nb2(
      parsedData.reduce((acc, item) => acc + item.finalResultMe, 0)
    ),
    totalMiResult: nb2(
      parsedData.reduce((acc, item) => acc + item.finalResultMi, 0)
    ),
  };
};
