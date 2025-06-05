import { Column, CustomizedTable } from '@/components/Table/body'
import { FreightByFreightCompanyItem } from '@/types/api/freights'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'

interface FreightByFreightCompanyTableProps {
  data: FreightByFreightCompanyItem[]
}
export function FreightByFreightCompanyTable({ data }: FreightByFreightCompanyTableProps) {
  const parsedData = data.map((item) => ({
    ...item,
    negotiatedPrice: toLocaleString(item.negotiatedPrice),
    tablePrice: toLocaleString(item.tablePrice),
    difPrice: toLocaleString(item.difPrice),
  }))
  const columns = getColumns()

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: '270px',
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
        data={parsedData}
      />
    </Box>
  )
}
const getColumns = (): Column<FreightByFreightCompanyItem>[] => {
  return [
    {
      headerName: 'Transportadora',
      maxWidth: '100px',
      type: 'string',
      value: {
        first: {
          value: 'freightCompany',
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
      headerName: 'Dif.',
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
