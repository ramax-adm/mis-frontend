import { UncontroledSelect } from "@/components/Inputs/Select/Customized";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import {
  useCreateDocument,
  useUpdateDocument,
} from "@/services/react-query/mutations/intranet";
import { useGetIntranetDocument } from "@/services/react-query/queries/intranet";
import { IntranetDocumentTypeEnum } from "@/types/intranet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderIcon } from "../customized/loader-icon";

const editNewDocumentFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
});

type EditNewDocumentFormSchema = z.infer<typeof editNewDocumentFormSchema>;

interface IntranetDocumentEditNewModalProps {
  id: string;
  onClose: () => void;
}
export function IntranetDocumentEditNewModal({
  id,
  onClose,
}: IntranetDocumentEditNewModalProps) {
  const formMethods = useForm<EditNewDocumentFormSchema>({
    resolver: zodResolver(editNewDocumentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
    },
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formMethods;

  const { data: document, isFetching } = useGetIntranetDocument({ id });
  const {
    mutateAsync: updateNewDocument,
    isPending: isUpdatingDocument,
    error: errorUpdatingDocument,
  } = useUpdateDocument(id);

  const onSubmit = async (data: EditNewDocumentFormSchema) => {
    await updateNewDocument(data);

    onClose();
  };

  useEffect(() => {
    if (document) {
      setValue("name", document?.name);
      setValue("description", document?.description);
      setValue("type", document?.type);
    }
  }, [document]);

  if (isFetching) {
    return (
      <Box sx={{ width: "100%", height: "150px" }}>
        <LoaderIcon />
      </Box>
    );
  }

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

      {errorUpdatingDocument && (
        <Alert severity='error'>{errorUpdatingDocument.message}</Alert>
      )}
      <Box sx={{ display: "inline-flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={isUpdatingDocument}
        >
          Atualizar
        </Button>
      </Box>
    </FormProvider>
  );
}
