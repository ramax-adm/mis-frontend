import { FloatInput } from '@/components/Inputs/FloatInput'
import { FloatInputControlled } from '@/components/Inputs/FloatInput/controlled'
import { NumberInput } from '@/components/Inputs/NumberInput'
import { NumberInputControlled } from '@/components/Inputs/NumberInput/controlled'
import { TextInput } from '@/components/Inputs/TextInput/uncontrolled'
import {
  DEFAULT_MI_CONTROLS_FORM_VALUES,
  DEFAULT_OPERATION_FORM_VALUES,
  DEFAULT_RAW_MATERIAL_FORM_VALUES,
} from '@/constants/app/cash-flow'
import { MiControls, Operation, RawMaterialControls } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const miFormSchema = z.object({
  pComissoesMi: z.coerce.number({ message: 'Insira uma % valida' }),
  pImpostosMi: z.coerce.number({ message: 'Insira uma % valida' }),
  precoFreteMi: z.coerce
    .number({ message: 'Insira um numero valido' })
    .refine((value) => value > 0, 'Insira um preço maior que 0'),
  vendasMiDias: z.coerce
    .number({ message: 'Insira um numero valido' })
    .refine((value) => value > 0, 'Insira qtd de dias maior que 0'),
})

export type MiFormSchema = z.infer<typeof miFormSchema>

interface MiInputsProps {
  setMiValores: React.Dispatch<React.SetStateAction<MiControls>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface MiFormRef {
  resetForm: () => void
}
export const MiInputs = forwardRef<MiFormRef, MiInputsProps>(
  ({ setMiValores, onSimulate, isSubmitting }, ref) => {
    const formMethods = useForm<MiFormSchema>({
      resolver: zodResolver(miFormSchema),
      defaultValues: DEFAULT_MI_CONTROLS_FORM_VALUES,
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

    const onSubmitMiForm = async (data: MiFormSchema) => {
      setMiValores(data)
    }

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
            Dados de MI
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Comiss.'
            size='small'
            name='pComissoesMi'
            control={control}
            error={errors.pComissoesMi}
            endAdornment={<InputAdornment position='end'>%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Imp.'
            size='small'
            name='pImpostosMi'
            control={control}
            error={errors.pImpostosMi}
            endAdornment={<InputAdornment position='end'>%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Frete'
            size='small'
            name='precoFreteMi'
            control={control}
            error={errors.precoFreteMi}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <NumberInput
            label='Vendas dias'
            size='small'
            name='vendasMiDias'
            control={control}
            error={errors.vendasMiDias}
          />
        </Grid>

        <Button onClick={handleSubmit(onSubmitMiForm)} disabled={isSubmitting}>
          SIMULAR
        </Button>
      </Grid>
    )
  },
)
