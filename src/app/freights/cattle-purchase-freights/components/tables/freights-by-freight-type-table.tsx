import { Column, CustomizedTable } from '@/components/Table/body'
import { FreightByFreightCompanyItem, FreightByFreightTypeItem } from '@/types/api/freights'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'

interface FreightByFreightTypeTableProps {
  data: FreightByFreightTypeItem[]
}
export function FreightByFreightTypeTable({ data }: FreightByFreightTypeTableProps) {
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
const getColumns = (): Column<FreightByFreightTypeItem>[] => {
  return [
    {
      headerName: 'Tipo Transporte',
      maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'freightType',
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
