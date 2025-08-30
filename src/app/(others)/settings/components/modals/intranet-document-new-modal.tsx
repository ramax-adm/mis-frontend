import { UncontroledSelect } from "@/components/Inputs/Select/Customized";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import { useCreateDocument } from "@/services/react-query/mutations/intranet";
import { IntranetDocumentTypeEnum } from "@/types/intranet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const addNewDocumentFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
});

type AddNewDocumentFormSchema = z.infer<typeof addNewDocumentFormSchema>;

interface IntranetDocumentAddNewModalProps {
  onClose: () => void;
}
export function IntranetDocumentAddNewModal({
  onClose,
}: IntranetDocumentAddNewModalProps) {
  const formMethods = useForm<AddNewDocumentFormSchema>({
    resolver: zodResolver(addNewDocumentFormSchema),
  });

  const { mutateAsync: createNewDocument, isPending: isCreatingDocument } =
    useCreateDocument();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: AddNewDocumentFormSchema) => {
    await createNewDocument(data);

    onClose();
  };

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextInput
          label='Nome'
          control={control}
          name='name'
          error={errors.name}
          size='small'
        />
        <TextInput
          label='Descrição'
          control={control}
          name='description'
          error={errors.description}
          size='small'
        />
        <UncontroledSelect
          id='type'
          label='Tipo'
          name='type'
          control={control}
          size='small'
          options={[
            {
              label: "Kit Integração",
              value: IntranetDocumentTypeEnum.INTEGRATION_KIT,
              key: IntranetDocumentTypeEnum.INTEGRATION_KIT,
            },
            {
              label: "Politica",
              value: IntranetDocumentTypeEnum.POLICY,
              key: IntranetDocumentTypeEnum.POLICY,
            },
            {
              label: "POP",
              value: IntranetDocumentTypeEnum.POP,
              key: IntranetDocumentTypeEnum.POP,
            },
          ]}
        />
      </Box>

      <Box sx={{ display: "inline-flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={isCreatingDocument}
        >
          Adicionar
        </Button>
      </Box>
    </FormProvider>
  );
}
