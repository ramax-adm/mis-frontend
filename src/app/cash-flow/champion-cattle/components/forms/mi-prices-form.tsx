import { FloatInput } from '@/components/Inputs/FloatInput'
import { DEFAULT_MI_PRICES_FORM_VALUES } from '@/constants/app/cash-flow-champion-cattle'
import { MiPrices } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, InputAdornment, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const miPricesFormSchema = z.object({
  dt: z.object({
    pAcem: z.coerce.number({ message: 'Insira um valor valido' }),
    pPaleta: z.coerce.number({ message: 'Insira um valor valido' }),
    pCupim: z.coerce.number({ message: 'Insira um valor valido' }),
    pPeito: z.coerce.number({ message: 'Insira um valor valido' }),
    pMusculo: z.coerce.number({ message: 'Insira um valor valido' }),
    pRecortes: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
  pa: z.object({
    pCostela: z.coerce.number({ message: 'Insira um valor valido' }),
    pBifeVazio: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
  tr: z.object({
    pBananinha: z.coerce.number({ message: 'Insira um valor valido' }),
    pCapaFile: z.coerce.number({ message: 'Insira um valor valido' }),
    pContraFile: z.coerce.number({ message: 'Insira um valor valido' }),
    pCorAlcatra: z.coerce.number({ message: 'Insira um valor valido' }),
    pCoxaoDuro: z.coerce.number({ message: 'Insira um valor valido' }),
    pCoxaoMole: z.coerce.number({ message: 'Insira um valor valido' }),
    pFileMignon: z.coerce.number({ message: 'Insira um valor valido' }),
    pFralda: z.coerce.number({ message: 'Insira um valor valido' }),
    pLagarto: z.coerce.number({ message: 'Insira um valor valido' }),
    pMaminha: z.coerce.number({ message: 'Insira um valor valido' }),
    pMusculo: z.coerce.number({ message: 'Insira um valor valido' }),
    pPatinho: z.coerce.number({ message: 'Insira um valor valido' }),
    pPicanha: z.coerce.number({ message: 'Insira um valor valido' }),
    pRecAlcatra: z.coerce.number({ message: 'Insira um valor valido' }),
    pRecortes: z.coerce.number({ message: 'Insira um valor valido' }),
    pGordura: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
})

export type MiPricesFormSchema = z.infer<typeof miPricesFormSchema>

interface MiPricesInputsProps {
  setPrecosMi: React.Dispatch<React.SetStateAction<MiPrices>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface MiPricesFormRef {
  resetForm: () => void
}
export const MiPricesInputs = forwardRef<MiPricesFormRef, MiPricesInputsProps>(
  ({ setPrecosMi, isSubmitting, onSimulate }, ref) => {
    const formMethods = useForm<MiPricesFormSchema>({
      resolver: zodResolver(miPricesFormSchema),
      defaultValues: DEFAULT_MI_PRICES_FORM_VALUES,
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

    const onSubmitMePricesForm = async (data: MiPricesFormSchema) => {
      setPrecosMi(data)
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
            Dados de preços MI (em R$)
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
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Paleta'
              name='dt.pPaleta'
              error={errors.dt?.pPaleta}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Cupim'
              name='dt.pCupim'
              error={errors.dt?.pCupim}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo'
              name='dt.pMusculo'
              error={errors.dt?.pMusculo}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Peito'
              name='dt.pPeito'
              error={errors.dt?.pPeito}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Recortes'
              name='dt.pRecortes'
              error={errors.dt?.pRecortes}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
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
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Bife Vazio'
              name='pa.pBifeVazio'
              error={errors.pa?.pBifeVazio}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
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
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Capa File'
              name='tr.pCapaFile'
              error={errors.tr?.pCapaFile}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Contra File'
              name='tr.pContraFile'
              error={errors.tr?.pContraFile}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Cor. Alcatra'
              name='tr.pCorAlcatra'
              error={errors.tr?.pCorAlcatra}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Duro'
              name='tr.pCoxaoDuro'
              error={errors.tr?.pCoxaoDuro}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Mole'
              name='tr.pCoxaoMole'
              error={errors.tr?.pCoxaoMole}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='File Mignon'
              name='tr.pFileMignon'
              error={errors.tr?.pFileMignon}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Fralda'
              name='tr.pFralda'
              error={errors.tr?.pFralda}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Lagarto'
              name='tr.pLagarto'
              error={errors.tr?.pLagarto}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Maminha'
              name='tr.pMaminha'
              error={errors.tr?.pMaminha}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo'
              name='tr.pMusculo'
              error={errors.tr?.pMusculo}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Patinho'
              name='tr.pPatinho'
              error={errors.tr?.pPatinho}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Picanha'
              name='tr.pPicanha'
              error={errors.tr?.pPicanha}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Rec Alcatra'
              name='tr.pRecAlcatra'
              error={errors.tr?.pRecAlcatra}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Recortes'
              name='tr.pRecortes'
              error={errors.tr?.pRecortes}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>

          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Gordura'
              name='tr.pGordura'
              error={errors.tr?.pGordura}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
            />
          </Grid>
        </>
        <Button onClick={handleSubmit(onSubmitMePricesForm)} disabled={isSubmitting}>
          SIMULAR
        </Button>
      </Grid>
    )
  },
)
