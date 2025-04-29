import { forwardRef, useImperativeHandle, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import { calculateTotalStockPrice } from '../../utils/calculate-total-stock-price'
import { calculateTotalStockWeight } from '../../utils/calculate-total-stock-weight'
import { StockCard } from '../cards/stock-card'
import { StockToExpireCard } from '../cards/stock-to-expire-card'
import { useGetAllStocks } from '@/services/react-query/queries/stock'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { MultipleSelectInputControlled } from '../customized/multiple-select-input'
import { useGetFilteredStockData } from '../../hooks/use-get-filtered-stock-data'
import { useGetProductLines } from '@/services/react-query/queries/sensatta'
import { SelectedProductLinesByCompany } from '../../types/selected-product-lines-by-company'
import { useSetSelectedProductLinesInitialState } from '../../hooks/use-set-selected-product-lines-initial-state'
import { useSelectProductLinesFilters } from '../../hooks/use-select-product-lines-filters'

// Ref Interface
export interface ResumeSectionRef {
  getSelectedProductLines: () => SelectedProductLinesByCompany[]
  resetSelectedProductLines: () => void
}

interface ResumeSectionProps {}

export const ResumeSection = forwardRef<ResumeSectionRef, ResumeSectionProps>((_, ref) => {
  // Queries
  const { data, isFetching } = useGetAllStocks()
  const { data: productLines } = useGetProductLines()

  // States
  const [selectedProductLinesByCompany, setSelectedProductLinesByCompany] = useState<
    SelectedProductLinesByCompany[]
  >([])

  // Hooks
  useSetSelectedProductLinesInitialState({
    data,
    productLines,
    setSelectedProductLinesByCompany,
  })

  const filteredData = useGetFilteredStockData({ data, selectedProductLinesByCompany })
  const { preset: presetProductLineFilters, reset: resetProductLineFilters } =
    useSelectProductLinesFilters({
      data,
      productLines,
      setSelectedProductLinesByCompany,
    })

  // Functions
  const handleUpdateSelectedProductLines = (params: { companyCode: string; values: string[] }) => {
    setSelectedProductLinesByCompany((state) => {
      const alreadyExists = state.some((s) => s.companyCode === params.companyCode)

      if (alreadyExists) {
        return state.map((s) => (s.companyCode === params.companyCode ? params : s))
      }

      return [...state, params]
    })
  }

  const handleProductLineFilter = (companyCode: string) => {
    const relatedFilter = selectedProductLinesByCompany.find((i) => i.companyCode === companyCode)
    if (!relatedFilter) {
      return
    }

    const haveSomeSelectedFilter = relatedFilter.values.length > 0
    if (haveSomeSelectedFilter) {
      return resetProductLineFilters(companyCode)
    }

    return presetProductLineFilters()
  }

  // Ref expose
  useImperativeHandle(
    ref,
    () => ({
      getSelectedProductLines: () => selectedProductLinesByCompany,
      resetSelectedProductLines: () => setSelectedProductLinesByCompany([]),
    }),
    [selectedProductLinesByCompany],
  )

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <Box
      sx={{
        width: { xs: '350px', sm: '430px', md: '820px', xl: '100%' },
        marginTop: 2,
      }}
    >
      <Grid container gap={1} columns={16}>
        {filteredData.map((item) => (
          <Grid key={item.companyCode} item xs={16} lg={7.9}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                backgroundColor: 'white',
                paddingX: 1,
                paddingY: 2,
                border: `1px solid ${COLORS.BORDAS}`,
                borderRadius: 3,
              }}
            >
              <Box>
                <Typography variant='body2' fontWeight={700} color={'#3E63DD'} fontSize={'16px'}>
                  {item.companyName}
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <DisplayItem
                    title='Total KG estoque'
                    content={calculateTotalStockWeight(item.stockData)}
                    headerFontSize='10px'
                    contentFontSize='16px'
                  />
                  <DisplayItem
                    title='Total R$ estoque'
                    content={calculateTotalStockPrice(item.stockData)}
                    headerFontSize='10px'
                    contentFontSize='16px'
                    sx={{
                      paddingX: '4px',
                      paddingY: '2px',
                      borderRadius: '8px',
                      backgroundColor: COLORS.FUNDO_PRIMARIO,
                      color: COLORS.TEXTO,
                    }}
                  />
                  <Box
                    key={item.companyCode}
                    sx={{
                      width: '300px',
                      marginLeft: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
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
                      selectedCategoryByCompany={selectedProductLinesByCompany}
                      setSelectedCategoryByCompany={handleUpdateSelectedProductLines}
                      label='Classificações'
                    />
                    <Typography
                      fontSize={'12px'}
                      sx={{
                        marginLeft: '4px',
                        '&:hover': {
                          color: COLORS.TEXTO,
                          cursor: 'pointer',
                        },
                      }}
                      onClick={() => handleProductLineFilter(item.companyCode)}
                    >
                      Selecionar/Deselecionar tudo
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Grid container gap={1} columns={16}>
                <Grid item xs={16} lg={7.9}>
                  <StockCard data={item.stockData} />
                </Grid>
                <Grid item xs={16} lg={7.8}>
                  <StockToExpireCard data={item.toExpiresData} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
})

ResumeSection.displayName = 'ResumeSection'
