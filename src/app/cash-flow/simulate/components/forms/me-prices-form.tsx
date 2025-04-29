import { FloatInput } from '@/components/Inputs/FloatInput'
import { DEFAULT_ME_PRICES_FORM_VALUES } from '@/constants/app/cash-flow'
import { MePrices } from '@/types/cash-flow'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, InputAdornment, Typography } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// schema do zod
const mePricesFormSchema = z.object({
  dt: z.object({
    pAcem: z.coerce.number({ message: 'Insira um valor valido' }),
    pGorduraExt: z.coerce.number({ message: 'Insira um valor valido' }),
    pGorduraInt: z.coerce.number({ message: 'Insira um valor valido' }),
    pMusculo: z.coerce.number({ message: 'Insira um valor valido' }),
    pPaleta: z.coerce.number({ message: 'Insira um valor valido' }),
    pPeito: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
  pa: z.object({
    pCostela: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
  tr: z.object({
    pBananinha: z.coerce.number({ message: 'Insira um valor valido' }),
    pContraFile: z.coerce.number({ message: 'Insira um valor valido' }),
    pCoxaoDuro: z.coerce.number({ message: 'Insira um valor valido' }),
    pCoxaoMole: z.coerce.number({ message: 'Insira um valor valido' }),
    pFileMignon: z.coerce.number({ message: 'Insira um valor valido' }),
    pFileCostela: z.coerce.number({ message: 'Insira um valor valido' }),
    pCorAlcatra: z.coerce.number({ message: 'Insira um valor valido' }),
    pPicanha: z.coerce.number({ message: 'Insira um valor valido' }),
    pLagarto: z.coerce.number({ message: 'Insira um valor valido' }),
    pMusculoMole: z.coerce.number({ message: 'Insira um valor valido' }),
    pMusculoDuro: z.coerce.number({ message: 'Insira um valor valido' }),
    pPatinho: z.coerce.number({ message: 'Insira um valor valido' }),
    pRecortes: z.coerce.number({ message: 'Insira um valor valido' }),
    pRoubado: z.coerce.number({ message: 'Insira um valor valido' }),
    pMaminha: z.coerce.number({ message: 'Insira um valor valido' }),
    pFralda: z.coerce.number({ message: 'Insira um valor valido' }),
  }),
})

export type MePricesFormSchema = z.infer<typeof mePricesFormSchema>

interface MePricesInputsProps {
  setPrecosMe: React.Dispatch<React.SetStateAction<MePrices>>
  onSimulate: () => Promise<void>
  isSubmitting: boolean
}
export interface MePricesFormRef {
  resetForm: () => void
}
export const MePricesInputs = forwardRef<MePricesFormRef, MePricesInputsProps>(
  ({ setPrecosMe, isSubmitting, onSimulate }, ref) => {
    const formMethods = useForm<MePricesFormSchema>({
      resolver: zodResolver(mePricesFormSchema),
      defaultValues: DEFAULT_ME_PRICES_FORM_VALUES,
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

    const onSubmitMePricesForm = async (data: MePricesFormSchema) => {
      setPrecosMe(data)
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
            Dados de preços ME (em USD)
          </Typography>
        </Grid>
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
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3.5}>
          <FloatInput
            control={control}
            size={'small'}
            label='Peito'
            name='dt.pPeito'
            error={errors.dt?.pPeito}
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3.5}>
          <FloatInput
            control={control}
            size={'small'}
            label='Gordura Ext.'
            name='dt.pGorduraExt'
            error={errors.dt?.pGorduraExt}
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3.5}>
          <FloatInput
            control={control}
            size={'small'}
            label='Gordura Int.'
            name='dt.pGorduraInt'
            error={errors.dt?.pGorduraInt}
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3.5}>
          <FloatInput
            control={control}
            size={'small'}
            label='Musculo Dt.'
            name='dt.pMusculo'
            error={errors.dt?.pMusculo}
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={3.5}>
          <FloatInput
            control={control}
            size={'small'}
            label='Paleta'
            name='dt.pPaleta'
            error={errors.dt?.pPaleta}
            endAdornment={<InputAdornment position='end'>$</InputAdornment>}
          />
        </Grid>
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
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
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
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Lagarto'
              name='tr.pLagarto'
              error={errors.tr?.pLagarto}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Contra File'
              name='tr.pContraFile'
              error={errors.tr?.pContraFile}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo mole'
              name='tr.pMusculoMole'
              error={errors.tr?.pMusculoMole}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Duro'
              name='tr.pCoxaoDuro'
              error={errors.tr?.pCoxaoDuro}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Musculo Duro'
              name='tr.pMusculoDuro'
              error={errors.tr?.pMusculoDuro}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Coxão Mole'
              name='tr.pCoxaoMole'
              error={errors.tr?.pCoxaoMole}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Patinho'
              name='tr.pPatinho'
              error={errors.tr?.pPatinho}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='File Mignon'
              name='tr.pFileMignon'
              error={errors.tr?.pFileMignon}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Recortes'
              name='tr.pRecortes'
              error={errors.tr?.pRecortes}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='File Costela'
              name='tr.pFileCostela'
              error={errors.tr?.pFileCostela}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Roubado'
              name='tr.pRoubado'
              error={errors.tr?.pRoubado}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Cor. Alcatra'
              name='tr.pCorAlcatra'
              error={errors.tr?.pCorAlcatra}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Maminha'
              name='tr.pMaminha'
              error={errors.tr?.pMaminha}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Picanha'
              name='tr.pPicanha'
              error={errors.tr?.pPicanha}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
            />
          </Grid>
          <Grid item xs={3.5}>
            <FloatInput
              control={control}
              size={'small'}
              label='Fralda'
              name='tr.pFralda'
              error={errors.tr?.pFralda}
              endAdornment={<InputAdornment position='end'>$</InputAdornment>}
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
