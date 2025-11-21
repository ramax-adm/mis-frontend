import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { DisplayItem } from "@/components/Info/display-item";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { COLORS } from "@/constants/styles/colors";
import {
  useGetCompanies,
  useGetProductLines,
} from "@/services/react-query/queries/sensatta";
import { useGetAnalyticalAllStocks } from "@/services/react-query/queries/stock";
import { Box, Grid, Typography } from "@mui/material";
import { useHttpState } from "@/hooks/use-http-state";
import { SelectedProductLinesByCompany, StockMarket } from "@/types/stock";
import { MultipleSelectInputControlled } from "@/app/stock/_components/customized/multiple-select-input";
import { AnalyticalStockTable } from "@/app/stock/_components/tables/analytical-stock-table";
import { useGetFilteredAnalyticalStockData } from "@/app/stock/_hooks/use-get-filtered-analytical-stock-data";
import { calculateTotalStockPrice } from "@/app/stock/_utils/calculate-total-stock-price";
import { calculateTotalStockWeight } from "@/app/stock/_utils/calculate-total-stock-weight";
import { calculateTotalStockWeightToExpires } from "@/app/stock/_utils/calculate-total-stock-weight-to-expires";
import { useSetSelectedProductLinesInitialState } from "../../hooks/use-set-selected-product-lines-initial-state";
import { useSelectProductLinesFilters } from "../../hooks/use-select-product-lines-filters";
import { AnalyticalStockToExpiresTable } from "@/app/stock/_components/tables/analytical-stock-to-expires-table";
import { storeStockProductLineFilters } from "../../utils/store-stock-product-line-filters";
import { useAuthContext } from "@/contexts/auth";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { calculateTotalStockPriceToExpires } from "@/app/stock/_utils/calculate-total-stock-price-to-expires";
import { grey, red, orange, green, indigo } from "@mui/material/colors";

export interface AnalyticalSectionRef {
  getSelectedCompany: () => string | undefined;
  getSelectedProductLines: () => SelectedProductLinesByCompany[];
}

interface AnalyticalSectionProps {
  selectCompanyInputError: boolean;
}
export const AnalyticalSection = forwardRef<
  AnalyticalSectionRef,
  AnalyticalSectionProps
>(({ selectCompanyInputError }, ref) => {
  const { user } = useAuthContext();
  // States
  const [selectedProductLinesByCompany, setSelectedProductLinesByCompany] =
    useState<SelectedProductLinesByCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  const { data: companies } = useGetUserCompanies({
    isConsideredOnStock: true,
  });
  const { data: productLines } = useGetProductLines({ market: StockMarket.ME });
  const { data, isFetching } = useGetAnalyticalAllStocks({
    companyCode: selectedCompany,
  });

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getSelectedCompany: () => selectedCompany,
      getSelectedProductLines: () => selectedProductLinesByCompany,
    }),
    [selectedCompany, selectedProductLinesByCompany]
  );

  // Hooks
  const { getState, setState } = useHttpState();
  useEffect(() => {
    const company = getState("selectedCompany");
    if (company) {
      setSelectedCompany(company);
    }
  }, []);

  useSetSelectedProductLinesInitialState({
    data,
    productLines,
    setSelectedProductLinesByCompany,
  });

  const filteredData = useGetFilteredAnalyticalStockData({
    data,
    selectedProductLinesByCompany,
  });
  const { preset: presetProductLineFilters, reset: resetProductLineFilters } =
    useSelectProductLinesFilters({
      data,
      productLines,
      setSelectedProductLinesByCompany,
    });

  // functions
  const handleSelectCompany = (value: string = "") => {
    setSelectedCompany(value);
    setState("selectedCompany", value);
  };

  const handleUpdateSelectedProductLines = (params: {
    companyCode: string;
    values: string[];
  }) => {
    setSelectedProductLinesByCompany((prevState) => {
      let updatedState;

      const alreadyExists = prevState.some(
        (s) => s.companyCode === params.companyCode
      );

      if (alreadyExists) {
        updatedState = prevState.map((s) =>
          s.companyCode === params.companyCode ? params : s
        );
      } else {
        updatedState = [...prevState, params];
      }

      storeStockProductLineFilters(updatedState);
      return updatedState;
    });
  };

  const handleProductLineFilter = (companyCode?: string) => {
    if (!companyCode) {
      return;
    }

    const relatedFilter = selectedProductLinesByCompany.find(
      (i) => i.companyCode === companyCode
    );
    if (!relatedFilter) {
      return;
    }

    const haveSomeSelectedFilter = relatedFilter.values.length > 0;
    if (haveSomeSelectedFilter) {
      return resetProductLineFilters(companyCode);
    }

    return presetProductLineFilters(companyCode);
  };

  return (
    <Box
      sx={{
        width: { xs: "350px", sm: "98%" },
        marginTop: 1,
      }}
    >
      {/* {isFetching && <LoadingOverlay />} */}
      <Box sx={{ width: "200px" }}>
        <ControlledSelect
          id='company'
          label='Empresa'
          name='company'
          size='small'
          value={selectedCompany}
          error={selectCompanyInputError}
          errorMessage='Por favor, selecione uma empresa'
          onChange={handleSelectCompany}
          options={companies?.map((item) => ({
            key: item.sensattaCode,
            label: `${item.sensattaCode} - ${item.name}`,
            value: item.sensattaCode,
          }))}
        />
      </Box>

      <Grid
        key={filteredData?.companyCode.concat("section")}
        container
        spacing={1}
        columns={16}
        marginTop={1}
      >
        <Grid
          key={filteredData?.companyCode.concat("stock")}
          item
          xs={16}
          lg={8}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              padding: 1,
              border: `1px solid ${COLORS.BORDAS}`,
              borderRadius: 3,
            }}
          >
            <Box>
              <Typography
                variant='body2'
                fontWeight={700}
                color={"#3E63DD"}
                fontSize={12}
              >
                ESTOQUE
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: 1,
                }}
              >
                <Grid
                  container
                  sx={{
                    columnGap: 1,
                    backgroundColor: indigo["50"],
                    color: indigo["A700"],
                    p: 0.5,
                    borderRadius: 1,
                    width: "24%",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={10}>Totais</Typography>
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='KGs'
                      content={calculateTotalStockWeight(
                        filteredData?.stockData
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='$ Valor'
                      content={calculateTotalStockPrice(
                        filteredData?.stockData
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    width: "200px",
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <MultipleSelectInputControlled
                    size='small'
                    options={
                      productLines?.map((item) => ({
                        key: item.acronym,
                        label: item.name,
                      })) ?? []
                    }
                    companyCode={selectedCompany ?? ""}
                    selectedCategoryByCompany={selectedProductLinesByCompany}
                    setSelectedCategoryByCompany={
                      handleUpdateSelectedProductLines
                    }
                    label='Classificações'
                  />
                  <Typography
                    fontSize={"12px"}
                    sx={{
                      marginX: "auto",
                      "&:hover": {
                        color: COLORS.TEXTO,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleProductLineFilter(selectedCompany)}
                  >
                    Selecionar/Deselecionar tudo
                  </Typography>
                </Box>
              </Box>
            </Box>
            <AnalyticalStockTable
              isFetching={isFetching}
              data={filteredData?.stockData}
            />
          </Box>
        </Grid>
        <Grid
          key={filteredData?.companyCode.concat("to-expires")}
          item
          xs={16}
          lg={8}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              backgroundColor: "white",
              padding: 1,
              border: `1px solid ${COLORS.BORDAS}`,
              borderRadius: 3,
            }}
          >
            <Box>
              <Typography
                variant='body2'
                fontWeight={700}
                color={"#3E63DD"}
                fontSize={12}
              >
                VENCIMENTOS
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  gap: 1,
                }}
              >
                <Grid
                  container
                  sx={{
                    columnGap: 1,
                    backgroundColor: grey["900"],
                    color: "#fff",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={10}>Vencido</Typography>
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='KGs'
                      content={calculateTotalStockWeightToExpires(
                        filteredData?.toExpiresData,
                        -10000, // ficticio para ele pegar todos os fifos
                        -1
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='$ Valor'
                      content={calculateTotalStockPriceToExpires(
                        filteredData?.toExpiresData,
                        -10000, // ficticio para ele pegar todos os fifos
                        -1
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    columnGap: 1,
                    backgroundColor: red["900"],
                    color: "#fff",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={10}>FIFO 0-15 dias</Typography>
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='KGs'
                      content={calculateTotalStockWeightToExpires(
                        filteredData?.toExpiresData,
                        0,
                        15
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='$ Valor'
                      content={calculateTotalStockPriceToExpires(
                        filteredData?.toExpiresData,
                        0,
                        15
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    columnGap: 1,
                    backgroundColor: orange["700"],
                    color: "#fff",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={10}>Alerta 16-30 dias</Typography>
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='KGs'
                      content={calculateTotalStockWeightToExpires(
                        filteredData?.toExpiresData,
                        16,
                        30
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='$ Valor'
                      content={calculateTotalStockPriceToExpires(
                        filteredData?.toExpiresData,
                        16,
                        30
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    columnGap: 1,
                    backgroundColor: green["700"],
                    color: "#fff",
                    borderRadius: 1,
                    p: 0.5,
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={10}>OK +30 dias</Typography>
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='KGs'
                      content={calculateTotalStockWeightToExpires(
                        filteredData?.toExpiresData,
                        31,
                        10000 // ficticio só para nao ficar vazio
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                  <Grid item>
                    <DisplayItem
                      title='$ Valor'
                      content={calculateTotalStockPriceToExpires(
                        filteredData?.toExpiresData,
                        31,
                        10000 // ficticio só para nao ficar vazio
                      )}
                      headerFontSize='9px'
                      contentFontSize='14px'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <AnalyticalStockToExpiresTable
              isFetching={isFetching}
              data={filteredData?.toExpiresData}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

AnalyticalSection.displayName = "AnalyticalSection";
