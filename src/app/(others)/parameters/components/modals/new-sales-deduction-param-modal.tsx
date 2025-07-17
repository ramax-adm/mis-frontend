import { Form } from "@/components/Form";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { UncontroledSelect } from "@/components/Inputs/Select/Customized";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import {
  useGetCompanies,
  useGetMarkets,
} from "@/services/react-query/queries/sensatta";
import { useGetUnitTypes } from "@/services/react-query/queries/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newSalesDeductionParamFormSchema = z.object({
  name: z.string(),
  companyCode: z.string(),
  value: z.coerce.number(),
  market: z.string(),
  unitType: z.string(),
});
type NewSalesDeductionParamFormSchema = z.infer<
  typeof newSalesDeductionParamFormSchema
>;
export function NewSalesDeductionParamModal() {
  const formMethods = useForm<NewSalesDeductionParamFormSchema>({
    resolver: zodResolver(newSalesDeductionParamFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: companies } = useGetCompanies({});
  const { data: unitTypes } = useGetUnitTypes();
  const { data: markets } = useGetMarkets();

  const { control } = formMethods;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        height: "40%",
      }}
    >
      <Typography color={"#3E63DD"} fontSize={"16px"} fontWeight={700}>
        Adição de novo parametro
      </Typography>
      <Form.Root methods={formMethods} onSubmit={() => ""}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Form.Input>
              <TextInput
                label='Nome do parâmetro'
                name='name'
                control={control}
              />
            </Form.Input>
          </Grid>
          <Grid item xs={12}>
            <Form.Input>
              <UncontroledSelect
                id='company'
                name='companyCode'
                label='Empresa'
                control={control}
                options={companies?.map((c) => ({
                  label: c.name,
                  key: c.sensattaCode,
                  value: c.sensattaCode,
                }))}
              />
            </Form.Input>
          </Grid>
          <Grid item xs={4}>
            <Form.Input>
              <UncontroledSelect
                id='market'
                name='market'
                label='Mercado'
                control={control}
                options={markets}
              />
            </Form.Input>
          </Grid>
          <Grid item xs={4}>
            <Form.Input>
              <NumberInput
                label='Valor do parâmetro'
                name='value'
                control={control}
              />
            </Form.Input>
          </Grid>

          <Grid item xs={4}>
            <Form.Input>
              <UncontroledSelect
                id='unitType'
                name='unitType'
                label='Unidade'
                control={control}
                options={unitTypes}
              />
            </Form.Input>
          </Grid>
        </Grid>
        <Form.Action sx={{ marginTop: "12px" }}>
          <Form.SubmitButton submitMessage='CADASTRAR' variant='contained' />
        </Form.Action>
      </Form.Root>
    </Box>
  );
}
