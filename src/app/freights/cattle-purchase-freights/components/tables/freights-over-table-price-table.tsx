import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { Column, CustomizedTable } from '@/components/Table/body'
import { useGetAnalyticalCattlePurchaseFreights } from '@/services/react-query/queries/freights'
import {
  FreightOverPriceTableItem,
  GetAnalyticalCattlePurchaseFreightsResponse,
} from '@/types/api/freights'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'

interface FreightsOverPriceTableProps {
  data: FreightOverPriceTableItem[]
}
export function FreightsOverPriceTable({ data }: FreightsOverPriceTableProps) {
  const columns = getColumns()
  const parsedData = data
    .sort((a, b) => b.difPrice - a.difPrice)
    .map((item) => ({
      ...item,
      negotiatedPrice: toLocaleString(item.negotiatedPrice),
      tablePrice: toLocaleString(item.tablePrice),
      difPrice: toLocaleString(item.difPrice),
    }))

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: '270px',
          width: '100%',
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: '9px',
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: '10px',
        }}
        columns={columns}
        data={parsedData}
      />
    </Box>
  )
}
const getColumns = (): Column<FreightOverPriceTableItem>[] => {
  return [
    {
      headerName: 'Data',
      maxWidth: '80px',
      type: 'date',
      value: {
        first: {
          value: 'date',
        },
      },
    },
    {
      headerName: 'Cbs',
      // maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'cattleQuantity',
        },
      },
    },
    {
      headerName: 'R$ Frete',
      maxWidth: '40px',
      type: 'string',
      value: {
        first: {
          value: 'negotiatedPrice',
        },
      },
    },
    {
      headerName: 'R$ Tabela',
      maxWidth: '40px',
      type: 'string',
      value: {
        first: {
          value: 'tablePrice',
        },
      },
    },
    {
      headerName: 'Dif. R$',
      type: 'string',
      value: {
        first: {
          value: 'difPrice',
        },
      },
    },
    // {
    //   headerName: 'NF Complemento',
    //   maxWidth: '50px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'complementNf',
    //     },
    //   },
    // },
  ]
}
