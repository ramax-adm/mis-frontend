import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { Column, CustomizedTable } from '@/components/Table/body'
import { useHttpState } from '@/hooks/use-http-state'
import { useGetAnalyticalCattlePurchaseFreights } from '@/services/react-query/queries/freights'
import { GetAnalyticalCattlePurchaseFreightsResponse } from '@/types/api/freights'
import { Box, Typography } from '@mui/material'

interface CattleFreightsTableProps {
  companyCode: string | null
  startDate: Date | null
  endDate: Date | null
}
export function CattleFreightsTable({ companyCode, startDate, endDate }: CattleFreightsTableProps) {
  const columns = getColumns()
  const { data: cattleFreights, isFetching: isFetchingCattleFreights } =
    useGetAnalyticalCattlePurchaseFreights({
      companyCode,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    })

  console.log({ isFetchingCattleFreights })

  if (isFetchingCattleFreights) {
    return <LoadingOverlay />
  }

  if (!cattleFreights) {
    return null
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Box
          sx={{
            marginTop: 2,
            padding: '2px',
            borderRadius: '4px',
            backgroundColor: 'rgba(190, 23, 23, 0.2)',
            color: '#BE1717',
          }}
        >
          <Typography fontWeight={700} fontSize={'12px'}>
            Fretes em aberto
          </Typography>
          <Box sx={{ display: 'inline-flex', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={'9px'}>Qtd.</Typography>
              <Typography fontSize={'14px'} fontWeight={700}>
                {cattleFreights.totals.openFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={'9px'}>Σ Cbs</Typography>
              <Typography fontSize={'14px'} fontWeight={700}>
                {cattleFreights.totals.openFreights.cattleQuantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            padding: '2px',
            borderRadius: '4px',
            backgroundColor: 'rgba(27, 94, 32, 0.2)',
            color: '#1B5E20',
          }}
        >
          <Typography fontWeight={700} fontSize={'12px'}>
            Fretes Fechados
          </Typography>
          <Box sx={{ display: 'inline-flex', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={'9px'}>Qtd.</Typography>
              <Typography fontSize={'14px'} fontWeight={700}>
                {cattleFreights.totals.closedFreights.amount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={'9px'}>Σ Cbs</Typography>
              <Typography fontSize={'14px'} fontWeight={700}>
                {cattleFreights.totals.closedFreights.cattleQuantity}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontSize={'9px'}>Σ R$ Frete</Typography>
              <Typography fontSize={'14px'} fontWeight={700}>
                {cattleFreights.totals.closedFreights.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: '600px', marginTop: 2 }}>
        <CustomizedTable<any>
          tableStyles={{
            height: '100%',
            width: '100%',
          }}
          cellStyles={{
            paddingX: 1,
            fontSize: '10px',
            paddingY: 0.2,
          }}
          headCellStyles={{
            paddingX: 1,
            fontSize: '11px',
          }}
          columns={columns}
          data={cattleFreights.parsedData}
        />
      </Box>
    </>
  )
}
const getColumns = (): Column<GetAnalyticalCattlePurchaseFreightsResponse>[] => {
  return [
    {
      headerName: 'Data',
      maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'slaughterDate',
        },
      },
    },
    {
      headerName: 'Empresa',
      maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'companyName',
        },
      },
    },
    {
      headerName: 'Cod OC',
      maxWidth: '40px',
      type: 'string',
      value: {
        first: {
          value: 'purchaseCattleOrderId',
        },
      },
    },
    {
      headerName: 'Status',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'status',
        },
      },
    },
    {
      headerName: 'Transportadora',
      maxWidth: '90px',
      type: 'string',
      value: {
        first: {
          value: 'freightCompanyName',
        },
      },
    },
    {
      headerName: 'Fornecedor',
      maxWidth: '90px',
      type: 'string',
      value: {
        first: {
          value: 'supplierName',
        },
      },
    },
    {
      headerName: 'Assessor',
      maxWidth: '90px',
      type: 'string',
      value: {
        first: {
          value: 'cattleAdvisorName',
        },
      },
    },
    {
      headerName: 'Fazenda',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'feedlotName',
        },
      },
    },
    {
      headerName: 'KMs',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'negotiatedKmDistance',
        },
      },
    },
    {
      headerName: 'Cbs',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'nfCattleQuantity',
        },
      },
    },
    {
      headerName: 'R$ Tabela',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'referenceFreightTablePrice',
        },
      },
    },
    {
      headerName: 'R$ Frete',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'negotiatedFreightPrice',
        },
      },
    },
    {
      headerName: 'R$/KM',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'priceKm',
        },
      },
    },
    {
      headerName: 'R$/KM/CBS',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'priceKmCattleQuantity',
        },
      },
    },
    {
      headerName: 'NF Complemento',
      //   maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'complementNf',
        },
      },
    },
  ]
}
