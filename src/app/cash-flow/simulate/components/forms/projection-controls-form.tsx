import { FloatInput } from '@/components/Inputs/FloatInput'
import { FloatInputControlled } from '@/components/Inputs/FloatInput/controlled'
import { NumberInput } from '@/components/Inputs/NumberInput'
import { NumberInputControlled } from '@/components/Inputs/NumberInput/controlled'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { TextInput } from '@/components/Inputs/TextInput/uncontrolled'
import {
  DEFAULT_OPERATION_FORM_VALUES,
  DEFAULT_PROJECTION_FORM_VALUES,
  DEFAULT_RAW_MATERIAL_FORM_VALUES,
} from '@/constants/app/cash-flow'
import { useGetArrendTypes } from '@/services/react-query/queries/cash-flow'
import { Operation, ProjectionControls, RawMaterialControls } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormControl, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const projectionControlsFormSchema = z.object({
  diasProjecao: z.coerce.number({ message: 'Insira a qtd de dias.' }),
})

export type ProjectionControlsFormSchema = z.infer<typeof projectionControlsFormSchema>

interface ProjectionControlsInputsProps {
  setProjecaoValores: React.Dispatch<React.SetStateAction<ProjectionControls>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface ProjectionControlsFormRef {
  resetForm: () => void
}
export const ProjectionControlsInputs = forwardRef<
  ProjectionControlsFormRef,
  ProjectionControlsInputsProps
>(({ setProjecaoValores, isSubmitting, onSimulate }, ref) => {
  const formMethods = useForm<ProjectionControlsFormSchema>({
    resolver: zodResolver(projectionControlsFormSchema),
    defaultValues: DEFAULT_PROJECTION_FORM_VALUES,
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

  const onSubmitOperationForm = async (data: ProjectionControlsFormSchema) => {
    setProjecaoValores(data)
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
          Dados de projeção
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='Dias Projeção'
          size='small'
          name='diasProjecao'
          control={control}
          error={errors.diasProjecao}
        />
      </Grid>
      <Button onClick={handleSubmit(onSubmitOperationForm)} disabled={isSubmitting}>
        SIMULAR
      </Button>
    </Grid>
  )
})
