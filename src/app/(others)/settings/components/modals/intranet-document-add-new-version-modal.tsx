import { DisplayItem } from "@/components/Info/display-item";
import { UncontrolledFormFileInput } from "@/components/Inputs/FormFileInput";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { UncontroledSelect } from "@/components/Inputs/Select/Customized";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import { useCreateDocumentVersion } from "@/services/react-query/mutations/intranet";
import {
  useGetIntranetDocument,
  useGetIntranetDocuments,
} from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentCategoryEnum,
  IntranetDocumentTypeEnum,
} from "@/types/intranet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { getDocumentType } from "../../utils/get-document-type";

const addNewDocumentVersionFormSchema = z.object({
  documentId: z.string().optional(),
  key: z.string(),
  version: z.string(),
  reviewNumber: z.coerce.number().optional(),
  majorChanges: z.string(),
  category: z.string(),
  file: z.any(),
  storageKey: z.string().optional(),
});

type AddNewDocumentVersionFormSchema = z.infer<
  typeof addNewDocumentVersionFormSchema
>;

interface IntranetDocumentAddNewVersionModalProps {
  id?: string;
  defaultDisabled?: boolean;
  onClose: () => void;
}
export function IntranetDocumentAddNewVersionModal({
  id,
  defaultDisabled = false,
  onClose,
}: IntranetDocumentAddNewVersionModalProps) {
  const formMethods = useForm<AddNewDocumentVersionFormSchema>({
    resolver: zodResolver(addNewDocumentVersionFormSchema),
    defaultValues: {
      documentId: id,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = formMethods;

  const documentId = watch("documentId");
  const documentCategorySelected = watch("category");

  const { data: documents } = useGetIntranetDocuments();
  const { data: document, isFetching } = useGetIntranetDocument({
    id: documentId,
  });
  const {
    mutateAsync: createNewDocumentVersion,
    isPending: isCreatingDocumentVersion,
    error: errorCreatingDocumentVersion,
  } = useCreateDocumentVersion();

  const onSubmit = async (data: AddNewDocumentVersionFormSchema) => {
    if (!documentId) {
      return;
    }
    await createNewDocumentVersion({
      ...data,
      documentId,
    });

    onClose();
  };

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {!defaultDisabled && (
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <UncontroledSelect
              id='documentId'
              label='Documento'
              name='documentId'
              control={control}
              size='small'
              options={documents?.map((i) => ({
                label: i.name,
                value: i.id,
                key: i.id,
              }))}
              required
            />
          </Box>
        )}
        <Box sx={{ display: "inline-flex", gap: 1 }}>
          {isFetching && (
            <Skeleton variant='rectangular' width={"100%"} height={60} />
          )}

          {!isFetching && (
            <Grid container spacing={1}>
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
                <DisplayItem
                  title='Tipo'
                  content={getDocumentType(document?.type)}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        <Box sx={{ display: "inline-flex", gap: 1 }}>
          <TextInput
            label='Identificador'
            control={control}
            name='key'
            error={errors.key}
            size='small'
          />
          <UncontroledSelect
            id='category'
            label='Tipo'
            name='category'
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
            disabled={
              documentCategorySelected === IntranetDocumentCategoryEnum.VIDEO
            }
            size='small'
          />
        </Box>
        {documentCategorySelected === IntranetDocumentCategoryEnum.VIDEO && (
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <TextInput
              label='Url video'
              control={control}
              name='storageKey'
              error={errors.storageKey}
              size='small'
            />
          </Box>
        )}

        <Box sx={{ display: "inline-flex", gap: 1 }}>
          <TextInput
            label='Mudanças'
            control={control}
            name='majorChanges'
            error={errors.majorChanges}
            size='small'
          />
        </Box>
        {documentCategorySelected !== IntranetDocumentCategoryEnum.VIDEO && (
          <Box sx={{ width: "99%", marginY: 1 }}>
            <UncontrolledFormFileInput
              formField='file'
              multiple={false}
              accept='.pdf'
            />
          </Box>
        )}

        {errorCreatingDocumentVersion && (
          <Alert severity='error'>{errorCreatingDocumentVersion.message}</Alert>
        )}

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
