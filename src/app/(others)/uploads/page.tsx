'use client'
import { UncontrolledFormFileInput } from '@/components/Inputs/FormFileInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { useUploadFile } from '@/services/react-query/mutations/upload'
import {
  useGetUploadFiles,
  useGetUploadFileWithInputs,
} from '@/services/react-query/queries/upload'
import { UploadTypeEnum } from '@/types/upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { register } from 'module'
import { report } from 'process'
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UploadsPage() {
  const formMethods = useForm({})
  const {
    control,
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods
  const uploadTypeSelected = watch('uploadType') as UploadTypeEnum

  const { data: uploadFiles } = useGetUploadFiles()
  const { data: uploadFileWithInputs } = useGetUploadFileWithInputs({ type: uploadTypeSelected })
  const { mutateAsync: uploadFile, isPending: isUploadingFile } = useUploadFile({
    uploadFileWithInputs,
  })

  const inputs = uploadFileWithInputs?.inputs

  const handleUpload = async (data: Record<string, any>) => {
    await uploadFile(data)
  }

  return (
    <>
      <PageContainer>
        <PageContainerHeader title='Uploads'></PageContainerHeader>

        <Box
          sx={{
            marginTop: 1,
          }}
        >
          <Typography fontSize={12} fontWeight={700} sx={{ marginBottom: 1 }}>
            Selecione um tipo de arquivo
          </Typography>
          <UncontroledSelect
            id='upload-type'
            label='Tipo de arquivo'
            size='small'
            control={control}
            name='uploadType'
            options={uploadFiles?.map((item) => ({
              key: item.type,
              label: item.name,
              value: item.type,
            }))}
          />
        </Box>

        {inputs && (
          <form
            style={{
              width: '100%',
              marginTop: '16px',
            }}
            onSubmit={handleSubmit(handleUpload)}
          >
            <FormProvider {...formMethods}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr);',
                  gap: 1,
                  alignItems: 'center',
                  marginY: 2,
                }}
              >
                <Box sx={{ gridColumn: '1/4' }}>
                  <Typography fontSize={12} fontWeight={700} sx={{ marginBottom: 0.5 }}>
                    Inputs
                  </Typography>
                </Box>
                {inputs.map((input) => {
                  const inputName = input.id
                  switch (input.type) {
                    case 'select':
                      return (
                        <UncontroledSelect
                          id={inputName}
                          name={inputName}
                          label={input.label}
                          control={control}
                          options={input.options}
                          size='small'
                          error={errors[inputName] as FieldError}
                        />
                      )
                    case 'date':
                      return (
                        <FormControl>
                          <Controller
                            name={inputName}
                            control={control}
                            render={({ field }) => {
                              return (
                                <DatePicker
                                  {...field}
                                  label={input.label}
                                  format='DD/MM/YYYY'
                                  slotProps={{
                                    textField: { size: 'small' },
                                  }}
                                  onChange={(value) => {
                                    if (!value || isNaN(new Date(value).getTime())) {
                                      field.onChange(null)
                                      return
                                    }

                                    field.onChange(value)
                                  }}
                                />
                              )
                            }}
                          />
                          {errors[inputName] && (
                            <FormHelperText style={{ fontSize: 12, color: '#dc2626' }}>
                              {errors[inputName]?.message as string}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )
                    case 'text':
                    default:
                      return (
                        <FormControl>
                          <TextField
                            {...register(inputName)}
                            label={input.label}
                            error={!!errors[inputName]}
                            size='small'
                          />
                          {errors[inputName] && (
                            <FormHelperText style={{ fontSize: 12, color: '#dc2626' }}>
                              {errors[inputName]?.message as string}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )
                  }
                })}
              </Box>
              <Box sx={{ width: '99%', marginY: 1 }}>
                <UncontrolledFormFileInput formField='files' multiple={false} />
              </Box>
              <Box>
                <Button variant='contained' size='small' type='submit' disabled={isUploadingFile}>
                  Fazer Upload
                </Button>
              </Box>
            </FormProvider>
          </form>
        )}
      </PageContainer>
    </>
  )
}
