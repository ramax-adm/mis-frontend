import { Form } from '@/components/Form'
import { DateInput } from '@/components/Inputs/DateInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const stockFiltersFormSchema = z.object({
  date: z.date(),
})

type StockFiltersFormSchema = z.infer<typeof stockFiltersFormSchema>
export default function StockFiltersForm() {
  const formMethods = useForm<StockFiltersFormSchema>({
    resolver: zodResolver(stockFiltersFormSchema),
  })

  const { control } = formMethods

  return (
    <Box sx={{ width: '450px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='subtitle2' fontWeight={700}>
        Dados de busca
      </Typography>
      <>
        <Form.Root<StockFiltersFormSchema>
          methods={{ ...formMethods }}
          onSubmit={() => alert('submit')}
          style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}
        >
          <Form.Input sx={{ width: '170px' }}>
            <DateInput control={control} size='small' label='Dt. Base' name='date' />
          </Form.Input>
          <Form.Action sx={{ marginLeft: 2 }}>
            <Form.SubmitButton submitMessage='Buscar' variant='contained' />
            <Button variant='contained'>Exportar XLSX</Button>
          </Form.Action>
        </Form.Root>
      </>
    </Box>
  )
}
