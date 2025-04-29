import { FloatInput } from '@/components/Inputs/FloatInput'
import {
  DEFAULT_MI_INCOMES_FORM_VALUES,
  DEFAULT_MI_PRICES_FORM_VALUES,
} from '@/constants/app/cash-flow'
import { MiIncomes, MiPrices } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, InputAdornment, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const miIncomesFormSchema = z.object({
  dt: z.object({
    pAcem: z.coerce.number({ message: 'Insira uma % valida' }),
    pPaleta: z.coerce.number({ message: 'Insira uma % valida' }),
    pCupim: z.coerce.number({ message: 'Insira uma % valida' }),
    pPeito: z.coerce.number({ message: 'Insira uma % valida' }),
    pMusculo: z.coerce.number({ message: 'Insira uma % valida' }),
    pRecortes: z.coerce.number({ message: 'Insira uma % valida' }),
  }),
  pa: z.object({
    pCostela: z.coerce.number({ message: 'Insira uma % valida' }),
    pBifeVazio: z.coerce.number({ message: 'Insira uma % valida' }),
  }),
  tr: z.object({
    pBananinha: z.coerce.number({ message: 'Insira uma % valida' }),
    pCapaFile: z.coerce.number({ message: 'Insira uma % valida' }),
    pContraFile: z.coerce.number({ message: 'Insira uma % valida' }),
    pCorAlcatra: z.coerce.number({ message: 'Insira uma % valida' }),
    pCoxaoDuro: z.coerce.number({ message: 'Insira uma % valida' }),
    pCoxaoMole: z.coerce.number({ message: 'Insira uma % valida' }),
    pFileMignon: z.coerce.number({ message: 'Insira uma % valida' }),
    pFralda: z.coerce.number({ message: 'Insira uma % valida' }),
    pLagarto: z.coerce.number({ message: 'Insira uma % valida' }),
    pMaminha: z.coerce.number({ message: 'Insira uma % valida' }),
    pMusculo: z.coerce.number({ message: 'Insira uma % valida' }),
    pPatinho: z.coerce.number({ message: 'Insira uma % valida' }),
    pPicanha: z.coerce.number({ message: 'Insira uma % valida' }),
    pRecAlcatra: z.coerce.number({ message: 'Insira uma % valida' }),
    pRecortes: z.coerce.number({ message: 'Insira uma % valida' }),
    pGordura: z.coerce.number({ message: 'Insira uma % valida' }),
  }),
})

export type MiIncomesFormSchema = z.infer<typeof miIncomesFormSchema>

interface MiIncomesInputsProps {
  setRendimentosMi: React.Dispatch<React.SetStateAction<MiIncomes>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface MiIncomesFormRef {
  resetForm: () => void
}
export const MiIncomesInputs = forwardRef<MiIncomesFormRef, MiIncomesInputsProps>(
  ({ setRendimentosMi, isSubmitting, onSimulate }, ref) => {
    const formMethods = useForm<MiIncomesFormSchema>({
      resolver: zodResolver(miIncomesFormSchema),
      defaultValues: DEFAULT_MI_INCOMES_FORM_VALUES,
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

    const onSubmitMeIncomesForm = async (data: MiIncomesFormSchema) => {
      setRendimentosMi(data)
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
            Rendimentos de cortes MI (em %)
          </Typography>
        </Grid>
        <>
          <Grid item xs={12}>
            <Typography variant='subtitle2' fontWeight={700} color={'#3E63DD'}>
              Dianteiro
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Acem'
              name='dt.pAcem'
              error={errors.dt?.pAcem}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Paleta'
              name='dt.pPaleta'
              error={errors.dt?.pPaleta}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Cupim'
              name='dt.pCupim'
              error={errors.dt?.pCupim}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo'
              name='dt.pMusculo'
              error={errors.dt?.pMusculo}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Peito'
              name='dt.pPeito'
              error={errors.dt?.pPeito}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Recortes'
              name='dt.pRecortes'
              error={errors.dt?.pRecortes}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
        </>
        <>
          <Grid item xs={12}>
            <Typography variant='subtitle2' fontWeight={700} color={'#3E63DD'}>
              Ponta Agulha
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Costela'
              name='pa.pCostela'
              error={errors.pa?.pCostela}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Bife Vazio'
              name='pa.pBifeVazio'
              error={errors.pa?.pBifeVazio}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
        </>
        <>
          <Grid item xs={12}>
            <Typography variant='subtitle2' fontWeight={700} color={'#3E63DD'}>
              Traseiro
            </Typography>
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Bananinha'
              name='tr.pBananinha'
              error={errors.tr?.pBananinha}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Capa File'
              name='tr.pCapaFile'
              error={errors.tr?.pCapaFile}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Contra File'
              name='tr.pContraFile'
              error={errors.tr?.pContraFile}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Cor. Alcatra'
              name='tr.pCorAlcatra'
              error={errors.tr?.pCorAlcatra}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Duro'
              name='tr.pCoxaoDuro'
              error={errors.tr?.pCoxaoDuro}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Mole'
              name='tr.pCoxaoMole'
              error={errors.tr?.pCoxaoMole}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='File Mignon'
              name='tr.pFileMignon'
              error={errors.tr?.pFileMignon}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Fralda'
              name='tr.pFralda'
              error={errors.tr?.pFralda}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Lagarto'
              name='tr.pLagarto'
              error={errors.tr?.pLagarto}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Maminha'
              name='tr.pMaminha'
              error={errors.tr?.pMaminha}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo'
              name='tr.pMusculo'
              error={errors.tr?.pMusculo}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Patinho'
              name='tr.pPatinho'
              error={errors.tr?.pPatinho}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Picanha'
              name='tr.pPicanha'
              error={errors.tr?.pPicanha}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Rec Alcatra'
              name='tr.pRecAlcatra'
              error={errors.tr?.pRecAlcatra}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Recortes'
              name='tr.pRecortes'
              error={errors.tr?.pRecortes}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Gordura'
              name='tr.pGordura'
              error={errors.tr?.pGordura}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
            />
          </Grid>
        </>
        <Button onClick={handleSubmit(onSubmitMeIncomesForm)} disabled={isSubmitting}>
          SIMULAR
        </Button>
      </Grid>
    )
  },
)
