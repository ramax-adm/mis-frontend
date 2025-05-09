import { FloatInput } from '@/components/Inputs/FloatInput'
import { FloatInputControlled } from '@/components/Inputs/FloatInput/controlled'
import { NumberInput } from '@/components/Inputs/NumberInput'
import { NumberInputControlled } from '@/components/Inputs/NumberInput/controlled'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { TextInput } from '@/components/Inputs/TextInput/uncontrolled'
import {
  DEFAULT_OPERATION_FORM_VALUES,
  DEFAULT_RAW_MATERIAL_FORM_VALUES,
} from '@/constants/app/cash-flow-champion-cattle'
import { useGetArrendTypes } from '@/services/react-query/queries/cash-flow'
import { Operation, RawMaterialControls } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const operationFormSchema = z.object({
  arredKg: z.coerce.number({ message: 'Insira um numero valido' }),
  precoEmbalagem: z.coerce
    .number({ message: 'Insira um numero valido' })
    .refine((value) => value > 0, 'Insira um preço maior que 0'),
  precoMod: z.coerce
    .number({ message: 'Insira um numero valido' })
    .refine((value) => value > 0, 'Insira um preço maior que 0'),
  tipoArrend: z.string(),
  diasPagamentoProdutos: z.coerce
    .number({ message: 'Insira um numero valido' })
    .refine((value) => value > 0, 'Insira qtd de dias maior que 0'),
})

export type OperationFormSchema = z.infer<typeof operationFormSchema>

interface OperationInputsProps {
  setOperacaoValores: React.Dispatch<React.SetStateAction<Operation>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface OperationFormRef {
  resetForm: () => void
}
export const OperationInputs = forwardRef<OperationFormRef, OperationInputsProps>(
  ({ setOperacaoValores, isSubmitting, onSimulate }, ref) => {
    const formMethods = useForm<OperationFormSchema>({
      resolver: zodResolver(operationFormSchema),
      defaultValues: DEFAULT_OPERATION_FORM_VALUES,
    })

    const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
    } = formMethods

    useImperativeHandle(ref, () => ({
      resetForm: () => reset(),
    }))

    const onSubmitOperationForm = async (data: OperationFormSchema) => {
      setOperacaoValores(data)
    }

    const { data: tiposArrend } = useGetArrendTypes()

    return (
      <Grid
        container
        sx={{
          border: '1px solid #3E63DD',
          paddingX: '12px',
          paddingY: '8px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        rowGap={2}
        columnGap={1}
      >
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight={700} color={'#3E63DD'}>
            Dados de operação
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Arrend'
            size='small'
            name='arredKg'
            control={control}
            error={errors.arredKg}
          />
        </Grid>
        <Grid item xs={5}>
          <UncontroledSelect
            id='tipoArrend'
            label='Tipo Arrend'
            size='small'
            name='tipoArrend'
            control={control}
            error={errors.tipoArrend}
            options={tiposArrend?.map((item, index) => ({
              key: index,
              label: item.label,
              value: item.value,
            }))}
          />
        </Grid>

        <Grid item xs={5}>
          <FloatInput
            label='Dias PGT'
            size='small'
            name='diasPagamentoProdutos'
            control={control}
            error={errors.diasPagamentoProdutos}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Embalagem'
            size='small'
            name='precoEmbalagem'
            control={control}
            error={errors.precoEmbalagem}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>

        <Grid item xs={5}>
          <FloatInput
            label='Mod. KG'
            size='small'
            name='precoMod'
            control={control}
            error={errors.precoMod}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Button onClick={handleSubmit(onSubmitOperationForm)} disabled={isSubmitting}>
          SIMULAR
        </Button>
      </Grid>
    )
  },
)
