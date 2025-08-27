import { DisplayItem } from "@/components/Info/display-item";
import { UncontrolledFormFileInput } from "@/components/Inputs/FormFileInput";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { UncontroledSelect } from "@/components/Inputs/Select/Customized";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import { useCreateDocumentVersion } from "@/services/react-query/mutations/intranet";
import { useGetIntranetDocument } from "@/services/react-query/queries/intranet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const addNewDocumentVersionFormSchema = z.object({
  documentId: z.string().optional(),
  key: z.string(),
  version: z.string(),
  reviewNumber: z.coerce.number(),
  majorChanges: z.string(),
  type: z.string(),
  file: z.any(),
});

type AddNewDocumentVersionFormSchema = z.infer<
  typeof addNewDocumentVersionFormSchema
>;

interface IntranetDocumentAddNewVersionModalProps {
  id: string;
  defaultDisabled?: boolean;
  onClose: () => void;
}
export function IntranetDocumentAddNewVersionModal({
  id,
  defaultDisabled = true,
  onClose,
}: IntranetDocumentAddNewVersionModalProps) {
  const formMethods = useForm<AddNewDocumentVersionFormSchema>({
    resolver: zodResolver(addNewDocumentVersionFormSchema),
  });

  const { data: document, isFetching } = useGetIntranetDocument({ id });
  const {
    mutateAsync: createNewDocumentVersion,
    isPending: isCreatingDocumentVersion,
  } = useCreateDocumentVersion();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: AddNewDocumentVersionFormSchema) => {
    await createNewDocumentVersion({
      ...data,
      documentId: data.documentId ?? id,
    });

    onClose();
  };

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "inline-flex", gap: 1 }}>
          {isFetching && (
            <Skeleton variant='rectangular' width={"100%"} height={60} />
          )}

          {!isFetching && (
            <Grid container>
              <Grid item xs={3}>
                <DisplayItem title='Nome' content={document?.name} />
              </Grid>
              <Grid item xs={3}>
                <DisplayItem
                  title='Descrição'
                  content={document?.description}
                />
              </Grid>
              <Grid item xs={3}>
                <DisplayItem title='Tipo' content={document?.type} />
              </Grid>
            </Grid>
          )}
        </Box>

        {!defaultDisabled && (
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            default disabled = false
          </Box>
        )}
        <Box sx={{ display: "inline-flex", gap: 1 }}>
          <TextInput
            label='Identificador'
            control={control}
            name='key'
            error={errors.key}
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
                label: "Documento",
                value: "document",
                key: "document",
              },
              {
                label: "Video",
                value: "video",
                key: "video",
              },
            ]}
          />
        </Box>
        <Box sx={{ display: "inline-flex", gap: 1 }}>
          <TextInput
            label='Versão'
            control={control}
            name='version'
            error={errors.version}
            size='small'
          />
          <NumberInput
            label='N° Revisão'
            control={control}
            name='reviewNumber'
            error={errors.reviewNumber}
            size='small'
          />
        </Box>
        <Box sx={{ display: "inline-flex", gap: 1 }}>
          <TextInput
            label='Mudanças'
            control={control}
            name='majorChanges'
            error={errors.version}
            size='small'
          />
        </Box>
        <Box sx={{ width: "99%", marginY: 1 }}>
          <UncontrolledFormFileInput formField='file' multiple={false} />
        </Box>
        <Box
          sx={{ display: "inline-flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            variant='contained'
            onClick={handleSubmit(onSubmit)}
            disabled={isCreatingDocumentVersion}
          >
            Adicionar
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
