import { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DisplayItem } from "@/components/Info/display-item";
import { COLORS } from "@/constants/styles/colors";
import { calculateTotalStockPrice } from "../../../_utils/calculate-total-stock-price";
import { calculateTotalStockWeight } from "../../../_utils/calculate-total-stock-weight";
import { StockCard } from "../../../_components/cards/stock-card";
import { StockToExpireCard } from "../../../_components/cards/stock-to-expire-card";
import { useGetAllStocks } from "@/services/react-query/queries/stock";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { MultipleSelectInputControlled } from "../../../_components/customized/multiple-select-input";
import { useGetFilteredStockData } from "../../../_hooks/use-get-filtered-stock-data";
import { useGetProductLines } from "@/services/react-query/queries/sensatta";
import { useSetSelectedProductLinesInitialState } from "../../hooks/use-set-selected-product-lines-initial-state";
import { useSelectProductLinesFilters } from "../../hooks/use-select-product-lines-filters";
import { storeStockProductLineFilters } from "../../utils/store-stock-product-line-filters";
import { SelectedProductLinesByCompany, StockMarket } from "@/types/stock";
import { LoaderIcon } from "@/app/stock/_components/customized/loader-icon";

// Ref Interface
export interface ResumeSectionRef {
  getSelectedProductLines: () => SelectedProductLinesByCompany[];
  resetSelectedProductLines: () => void;
}

interface ResumeSectionProps {}

export const ResumeSection = forwardRef<ResumeSectionRef, ResumeSectionProps>(
  (_, ref) => {
    // Queries
    const { data, isFetching } = useGetAllStocks();
    const { data: productLines } = useGetProductLines({
      market: StockMarket.MI,
    });

    // States
    const [selectedProductLinesByCompany, setSelectedProductLinesByCompany] =
      useState<SelectedProductLinesByCompany[]>([]);

    // Hooks
    useSetSelectedProductLinesInitialState({
      data,
      productLines,
      setSelectedProductLinesByCompany,
    });

    const filteredData = useGetFilteredStockData({
      data,
      selectedProductLinesByCompany,
    });
    const { preset: presetProductLineFilters, reset: resetProductLineFilters } =
      useSelectProductLinesFilters({
        data,
        productLines,
        setSelectedProductLinesByCompany,
      });

    // Functions
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

    const handleProductLineFilter = (companyCode: string) => {
      const relatedFilter = selectedProductLinesByCompany.find(
        (i) => i.companyCode === companyCode
      );

      if (!relatedFilter) {
        return presetProductLineFilters(companyCode);
      }

      const haveSomeSelectedFilter = relatedFilter.values.length > 0;
      if (haveSomeSelectedFilter) {
        return resetProductLineFilters(companyCode);
      }

      return presetProductLineFilters(companyCode);
    };

    // Ref expose
    useImperativeHandle(
      ref,
      () => ({
        getSelectedProductLines: () => selectedProductLinesByCompany,
        resetSelectedProductLines: () => setSelectedProductLinesByCompany([]),
      }),
      [selectedProductLinesByCompany]
    );

    return (
      <Box
        sx={{
          width: { xs: "350px", sm: "100%" },
          marginTop: 1,
        }}
      >
        <Grid container spacing={0.5} columns={12}>
          {isFetching && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "grid",
                  height: "calc(100vh - 200px)",
                  placeContent: "center",
                }}
              >
                <LoaderIcon size={64} />
              </Box>
            </Grid>
          )}
          {!isFetching &&
            filteredData.map((item) => (
              <Grid key={item.companyCode} item xs={12} md={6}>
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
                      fontSize={"12px"}
                    >
                      {item.companyName}
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DisplayItem
                        title='Σ KG estoque'
                        content={calculateTotalStockWeight(item.stockData)}
                        headerFontSize='9px'
                        contentFontSize='14px'
                      />
                      <DisplayItem
                        title='Σ R$ estoque'
                        content={calculateTotalStockPrice(item.stockData)}
                        headerFontSize='9px'
                        contentFontSize='14px'
                        sx={{
                          paddingX: "4px",
                          paddingY: "2px",
                          borderRadius: "8px",
                          backgroundColor: COLORS.FUNDO_PRIMARIO,
                          color: COLORS.TEXTO,
                        }}
                      />

                      <Box
                        sx={{
                          width: "200px",
                          marginLeft: "auto",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <MultipleSelectInputControlled
                          key={item.companyCode}
                          size='small'
                          options={
                            productLines?.map((item) => ({
                              key: item.acronym,
                              label: item.name,
                            })) ?? []
                          }
                          companyCode={item.companyCode}
                          selectedCategoryByCompany={
                            selectedProductLinesByCompany
                          }
                          setSelectedCategoryByCompany={
                            handleUpdateSelectedProductLines
                          }
                          label='Classificações'
                        />
                        <Typography
                          fontSize={"10px"}
                          sx={{
                            marginX: "auto",
                            "&:hover": {
                              color: COLORS.TEXTO,
                              cursor: "pointer",
                            },
                          }}
                          onClick={() =>
                            handleProductLineFilter(item.companyCode)
                          }
                        >
                          Selecionar/Deselecionar tudo
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Grid container spacing={0.5} columns={16}>
                    <Grid item xs={16} lg={8}>
                      <StockCard
                        isFetching={isFetching}
                        data={item?.stockData}
                      />
                    </Grid>
                    <Grid item xs={16} lg={8}>
                      <StockToExpireCard
                        isFetching={isFetching}
                        data={item?.toExpiresData}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
);

ResumeSection.displayName = "ResumeSection";
