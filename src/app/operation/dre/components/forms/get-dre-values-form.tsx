'use client'
import { Form } from '@/components/Form'
import { FormActionButtons } from '@/components/Form/actionButtons'
import { DateInput } from '@/components/Inputs/DateInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { TextInput } from '@/components/Inputs/TextInput/uncontrolled'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const getDREValuesFormSchema = z.object({
  companyId: z.string(),
  baseDate: z.date(),
})

type GetDREValuesFormSchema = z.infer<typeof getDREValuesFormSchema>
export function GetDREValuesForm() {
  const formMethods = useForm<GetDREValuesFormSchema>({
    resolver: zodResolver(getDREValuesFormSchema),
  })

  const { control } = formMethods

  const onSearchDREValues = ({ companyId }: GetDREValuesFormSchema) => {}
  return (
    <Form.Root
      methods={{ ...formMethods }}
      onSubmit={onSearchDREValues}
      style={{ marginTop: '8px' }}
    >
      <Typography variant='body1' fontWeight={700}>
        Dados de busca
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Form.Input>
            <UncontroledSelect
              size='small'
              id='conpanyId'
              label='Empresa'
              name='companyId'
              control={control}
            />
          </Form.Input>
        </Grid>
        <Grid item xs={1}>
          <Form.Input>
            <DateInput size='small' label='Dt. Inicio' name='baseDate' control={control} />
          </Form.Input>
        </Grid>
        <Grid item xs={1}>
          <Form.Input>
            <DateInput size='small' label='Dt. Fim' name='baseDate' control={control} />
          </Form.Input>
        </Grid>
        <Grid item xs={1}>
          <Form.Action>
            <Form.SubmitButton submitMessage='Buscar' sx={{ justifyContent: 'flex-start' }} />
          </Form.Action>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}></Grid>
    </Form.Root>
  )
}
