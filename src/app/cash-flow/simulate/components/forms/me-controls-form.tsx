import { FloatInput } from "@/components/Inputs/FloatInput";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { DEFAULT_ME_CONTROLS_FORM_VALUES } from "@/app/cash-flow/simulate/constants/cash-flow";
import {
  MeControls,
  MiControls,
  Operation,
  RawMaterialControls,
} from "@/types/cash-flow";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// schema do zod
const meFormSchema = z.object({
  vendasMeDias: z.coerce.number(),
  pAntecipacaoMe: z.coerce.number(),
  diasPosicao: z.coerce
    .number()
    .refine((value) => value > 0, "Insira qtd de dias maior que 0"),
  ptax: z.coerce
    .number()
    .refine((value) => value > 0, "Insira valor maior que 0"),
  precoFreteRodoviario: z.coerce
    .number()
    .refine((value) => value > 0, "Insira valor maior que 0"),
  precoPorto: z.coerce
    .number()
    .refine((value) => value > 0, "Insira valor maior que 0"),
  precoFreteInter: z.coerce
    .number()
    .refine((value) => value > 0, "Insira valor maior que 0"),
  precoFinanc: z.coerce
    .number()
    .refine((value) => value > 0, "Insira valor maior que 0"),
});

export type MeFormSchema = z.infer<typeof meFormSchema>;

interface MeInputsProps {
  setMeValores: React.Dispatch<React.SetStateAction<MeControls>>;
  onSimulate: () => Promise<void>;
  isSubmitting: boolean;
}
export interface MeFormRef {
  resetForm: () => void;
}
export const MeInputs = forwardRef<MeFormRef, MeInputsProps>(
  ({ setMeValores, isSubmitting, onSimulate }, ref) => {
    const formMethods = useForm<MeFormSchema>({
      resolver: zodResolver(meFormSchema),
      defaultValues: DEFAULT_ME_CONTROLS_FORM_VALUES,
    });

    const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
    } = formMethods;

    useImperativeHandle(ref, () => ({
      resetForm: () => reset(),
    }));

    const onSubmitMeForm = async (data: MeFormSchema) => {
      setMeValores(data);
    };

    return (
      <Grid
        container
        sx={{
          border: "1px solid #3E63DD",
          paddingX: "12px",
          paddingY: "8px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        rowGap={2}
        columnGap={1}
      >
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight={700} color={"#3E63DD"}>
            Dados de ME
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Vendas dias'
            size='small'
            name='vendasMeDias'
            control={control}
            error={errors.vendasMeDias}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Antecip.'
            size='small'
            name='pAntecipacaoMe'
            control={control}
            error={errors.pAntecipacaoMe}
            endAdornment={<InputAdornment position='end'>%</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <NumberInput
            label='Dias posição'
            size='small'
            name='diasPosicao'
            control={control}
            error={errors.diasPosicao}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='PTAX'
            size='small'
            name='ptax'
            control={control}
            error={errors.ptax}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Rodov. KG'
            size='small'
            name='precoFreteRodoviario'
            control={control}
            error={errors.precoFreteRodoviario}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Financ. KG'
            size='small'
            name='precoFinanc'
            control={control}
            error={errors.precoFinanc}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Porto KG'
            size='small'
            name='precoPorto'
            control={control}
            error={errors.precoPorto}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={5}>
          <FloatInput
            label='Marit KG'
            size='small'
            name='precoFreteInter'
            control={control}
            error={errors.precoFreteInter}
            endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
          />
        </Grid>

        <Button onClick={handleSubmit(onSubmitMeForm)} disabled={isSubmitting}>
          SIMULAR
        </Button>
      </Grid>
    );
  }
);
