import { forwardRef, useImperativeHandle, useState } from 'react'
import { DisplayItem } from '@/components/Info/display-item'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { COLORS } from '@/constants/styles/colors'
import { useGetCompanies, useGetProductLines } from '@/services/react-query/queries/sensatta'
import { useGetAnalyticalAllStocks } from '@/services/react-query/queries/stock'
import { Box, Grid, Typography } from '@mui/material'
import { calculateTotalStockWeight } from '../../utils/calculate-total-stock-weight'
import { calculateTotalStockPrice } from '../../utils/calculate-total-stock-price'
import { AnalyticalStockTable } from '../tables/analytical-stock-table'
import { AnalyticalStockToExpiresTable } from '../tables/analytical-stock-to-expires-table'
import { SelectedProductLinesByCompany } from '../../types/selected-product-lines-by-company'
import { MultipleSelectInputControlled } from '../customized/multiple-select-input'
import { useSetSelectedProductLinesInitialState } from '../../hooks/use-set-selected-product-lines-initial-state'
import { useGetFilteredAnalyticalStockData } from '../../hooks/use-get-filtered-analytical-stock-data'

export interface AnalyticalSectionRef {
  getSelectedCompany: () => string | undefined
  getSelectedProductLines: () => SelectedProductLinesByCompany[]
}

interface AnalyticalSectionProps {
  selectCompanyInputError: boolean
}
export const AnalyticalSection = forwardRef<AnalyticalSectionRef, AnalyticalSectionProps>(
  ({ selectCompanyInputError }, ref) => {
    // States
    const [selectedProductLinesByCompany, setSelectedProductLinesByCompany] = useState<
      SelectedProductLinesByCompany[]
    >([])
    const [selectedCompany, setSelectedCompany] = useState<string | undefined>()
    const { data: companies } = useGetCompanies()
    const { data: productLines } = useGetProductLines()
    const { data, isFetching } = useGetAnalyticalAllStocks({
      companyCode: selectedCompany,
    })

    // Imperative handlers
    useImperativeHandle(
      ref,
      () => ({
        getSelectedCompany: () => selectedCompany,
        getSelectedProductLines: () => selectedProductLinesByCompany,
      }),
      [selectedCompany, selectedProductLinesByCompany],
    )

    // Hooks
    useSetSelectedProductLinesInitialState({
      data,
      productLines,
      setSelectedProductLinesByCompany,
    })

    const filteredData = useGetFilteredAnalyticalStockData({ data, selectedProductLinesByCompany })

    const handleUpdateSelectedProductLines = (params: {
      companyCode: string
      values: string[]
    }) => {
      setSelectedProductLinesByCompany((state) => {
        const alreadyExists = state.some((s) => s.companyCode === params.companyCode)

        if (alreadyExists) {
          // substitui o valor existente
          return state.map((s) => (s.companyCode === params.companyCode ? params : s))
        }

        // adiciona novo valor
        return [...state, params]
      })
    }

    return (
      <Box
        sx={{
          width: { xs: '350px', sm: '430px', md: '820px', xl: '100%' },
          marginTop: 2,
        }}
      >
        {isFetching && <LoadingOverlay />}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '200px' }}>
            <ControlledSelect
              id='company'
              label='Empresa'
              name='company'
              size='small'
              value={selectedCompany}
              error={selectCompanyInputError}
              errorMessage='Por favor, selecione uma empresa'
              onChange={(value) => setSelectedCompany(value)}
              options={companies?.map((item) => ({
                key: item.sensattaCode,
                label: item.name,
                value: item.sensattaCode,
              }))}
            />
          </Box>
        </Box>

        {filteredData && (
          <Grid key={filteredData.companyCode} container gap={1} columns={16} marginTop={1}>
            <Grid key={filteredData.companyCode} item xs={16} lg={8.9}>
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
                    Estoque
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DisplayItem
                      title='Total KG estoque'
                      content={calculateTotalStockWeight(filteredData.stockData)}
                      headerFontSize='10px'
                      contentFontSize='16px'
                    />
                    <DisplayItem
                      title='Total R$ estoque'
                      content={calculateTotalStockPrice(filteredData.stockData)}
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

                    <Box sx={{ width: '300px', marginLeft: 'auto' }}>
                      <MultipleSelectInputControlled
                        size='small'
                        options={
                          productLines?.map((item) => ({
                            key: item.acronym,
                            label: item.name,
                          })) ?? []
                        }
                        companyCode={selectedCompany ?? ''}
                        selectedCategoryByCompany={selectedProductLinesByCompany}
                        setSelectedCategoryByCompany={handleUpdateSelectedProductLines}
                        label='Classificações'
                      />
                    </Box>
                  </Box>
                </Box>
                <AnalyticalStockTable data={filteredData.stockData} />
              </Box>
            </Grid>
            <Grid key={filteredData.companyCode} item xs={16} lg={6.9}>
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
                    Vencimentos
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DisplayItem
                      title='Total KG estoque'
                      content={calculateTotalStockWeight(filteredData.stockData)}
                      headerFontSize='10px'
                      contentFontSize='16px'
                    />
                    <DisplayItem
                      title='Total R$ estoque'
                      content={calculateTotalStockPrice(filteredData.stockData)}
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
                  </Box>
                </Box>
                <AnalyticalStockToExpiresTable data={filteredData.toExpiresData} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    )
  },
)

AnalyticalSection.displayName = 'AnalyticalSection'
