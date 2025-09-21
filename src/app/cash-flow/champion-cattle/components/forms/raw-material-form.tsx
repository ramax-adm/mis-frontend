import { FloatInput } from "@/components/Inputs/FloatInput";
import { FloatInputControlled } from "@/components/Inputs/FloatInput/controlled";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { NumberInputControlled } from "@/components/Inputs/NumberInput/controlled";
import { DEFAULT_RAW_MATERIAL_FORM_VALUES } from "@/app/cash-flow/champion-cattle/constants/cash-flow-champion-cattle";
import { RawMaterialControls } from "@/types/cash-flow-champion-cattle";
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
  cbs: z.coerce.number({ message: "Insira um numero valido" }),
  pDt: z.coerce.number({ message: "Insira um numero valido" }),
  pPa: z.coerce.number({ message: "Insira um numero valido" }),
  pTr: z.coerce.number({ message: "Insira um numero valido" }),
  pesoArroba: z.number({ message: "Insira um numero valido" }),
  precoArroba: z.coerce.number({ message: "Insira um numero valido" }),
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
          label='Cbs'
          size='small'
          name='cbs'
          control={control}
          error={errors.cbs}
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
        <FloatInput
          label='R$ @'
          size='small'
          name='precoArroba'
          control={control}
          error={errors.precoArroba}
          endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
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
