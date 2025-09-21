import { FloatInput } from "@/components/Inputs/FloatInput";
import { FloatInputControlled } from "@/components/Inputs/FloatInput/controlled";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { NumberInputControlled } from "@/components/Inputs/NumberInput/controlled";
import { DEFAULT_RAW_MATERIAL_FORM_VALUES } from "@/app/cash-flow/simulate/constants/cash-flow";
import { RawMaterialControls } from "@/types/cash-flow";
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
const rawMaterialFormSchema = z.object({
  cbsMe: z.coerce.number({ message: "Insira um numero valido" }),
  cbsMi: z.coerce.number({ message: "Insira um numero valido" }),
  diasPagamento: z.coerce.number({ message: "Insira um numero valido" }),
  diasPagamentoFrete: z.coerce
    .number({ message: "Insira um numero valido" })
    .refine((value) => value > 0, "Insira a quantidade de dias maior que 0"),
  pDt: z.coerce.number({ message: "Insira um numero valido" }),
  pPa: z.coerce.number({ message: "Insira um numero valido" }),
  pTr: z.coerce.number({ message: "Insira um numero valido" }),
  pesoArroba: z.number({ message: "Insira um numero valido" }),
  precoArrobaMe: z.coerce.number({ message: "Insira um numero valido" }),
  precoArrobaMi: z.coerce.number({ message: "Insira um numero valido" }),
  precoFreteKg: z.coerce.number({ message: "Insira um numero valido" }),
});

export type RawMaterialFormSchema = z.infer<typeof rawMaterialFormSchema>;

interface RawMaterialInputsProps {
  setMatPrimaValores: React.Dispatch<React.SetStateAction<RawMaterialControls>>;
  onSimulate: () => Promise<void>;
  isSubmitting: boolean;
}
export interface RawMaterialFormRef {
  resetForm: () => void;
}
export const RawMaterialInputs = forwardRef<
  RawMaterialFormRef,
  RawMaterialInputsProps
>(({ setMatPrimaValores, onSimulate, isSubmitting }, ref) => {
  const formMethods = useForm<RawMaterialFormSchema>({
    resolver: zodResolver(rawMaterialFormSchema),
    defaultValues: DEFAULT_RAW_MATERIAL_FORM_VALUES,
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

  const onSubmitRawMaterialForm = async (data: RawMaterialFormSchema) => {
    setMatPrimaValores(data);
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
          Dados de materia prima
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <NumberInput
          label='Cbs ME'
          size='small'
          name='cbsMe'
          control={control}
          error={errors.cbsMe}
        />
      </Grid>
      <Grid item xs={5}>
        <NumberInput
          label='Cbs MI'
          size='small'
          name='cbsMi'
          control={control}
          error={errors.cbsMi}
        />
      </Grid>

      <Grid item xs={5}>
        <FloatInput
          label='Peso'
          size='small'
          name='pesoArroba'
          control={control}
          error={errors.pesoArroba}
          endAdornment={<InputAdornment position='end'>@</InputAdornment>}
        />
      </Grid>
      <Grid item xs={5}>
        <NumberInput
          label='Dias PGT Cmp.'
          size='small'
          name='diasPagamento'
          control={control}
          error={errors.diasPagamento}
        />
      </Grid>

      <Grid item xs={5}>
        <FloatInput
          label='Frt. KG'
          size='small'
          name='precoFreteKg'
          control={control}
          error={errors.precoFreteKg}
          endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
        />
      </Grid>
      <Grid item xs={5}>
        <NumberInput
          label='Dias PGT Frt.'
          size='small'
          name='diasPagamentoFrete'
          control={control}
          error={errors.diasPagamentoFrete}
        />
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='R$ @ - ME'
          size='small'
          name='precoArrobaMe'
          control={control}
          error={errors.precoArrobaMe}
        />
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='R$ @ - MI'
          size='small'
          name='precoArrobaMi'
          control={control}
          error={errors.precoArrobaMi}
        />
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='TR'
          size='small'
          name='pTr'
          control={control}
          error={errors.pTr}
          endAdornment={<InputAdornment position='end'>%</InputAdornment>}
        />
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='DT'
          size='small'
          name='pDt'
          control={control}
          error={errors.pDt}
          endAdornment={<InputAdornment position='end'>%</InputAdornment>}
        />
      </Grid>
      <Grid item xs={5}>
        <FloatInput
          label='PA'
          size='small'
          name='pPa'
          control={control}
          error={errors.pPa}
          endAdornment={<InputAdornment position='end'>%</InputAdornment>}
        />
      </Grid>
      <Button
        onClick={handleSubmit(onSubmitRawMaterialForm)}
        disabled={isSubmitting}
      >
        SIMULAR
      </Button>
    </Grid>
  );
});
