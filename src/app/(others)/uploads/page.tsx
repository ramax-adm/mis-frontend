'use client'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import {
  useGetUploadFiles,
  useGetUploadFileWithInputs,
} from '@/services/react-query/queries/upload'
import { UploadTypeEnum } from '@/types/upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { register } from 'module'
import { report } from 'process'
import { Controller, FieldError, useForm } from 'react-hook-form'
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
  const { data: uploadFile } = useGetUploadFileWithInputs({ type: uploadTypeSelected })

  const handleUpload = (data: Record<string, any>) => {
    alert(JSON.stringify(data, null, 2))
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
          <Typography fontSize={12} fontWeight={700} sx={{ marginBottom: 0.5 }}>
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

        {uploadFile?.inputs && (
          <form
            style={{
              width: '100%',
              marginTop: '16px',
            }}
            onSubmit={handleSubmit(handleUpload)}
          >
            <Typography variant='body1' sx={{ fontWeight: '500' }}>
              Inputs
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr);',
                gap: 2,
                alignItems: 'center',
                marginY: 2,
              }}
            >
              {/* {uploadFile?.inputs.map((input) => {
                const filterName = filter.id
                switch (input.type) {
                  case 'select':
                    return (
                      <UncontroledSelect
                        id={filterName}
                        name={filterName}
                        label={input.label}
                        control={control}
                        options={input.options}
                        error={errors[filterName] as FieldError}
                      />
                    )
                  case 'date':
                    return (
                      <FormControl>
                        <Controller
                          name={filterName}
                          control={control}
                          render={({ field }) => {
                            return (
                              <DatePicker
                                {...field}
                                label={input.label}
                                format='DD/MM/YYYY'
                                slotProps={{
                                  textField: { size: 'medium' },
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
                        {errors[filterName] && (
                          <FormHelperText style={{ fontSize: 12, color: '#dc2626' }}>
                            {errors[filterName]?.message as string}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )
                  case 'text':
                  default:
                    return (
                      <FormControl>
                        <TextField
                          {...register(filterName)}
                          label={filter.label}
                          error={!!errors[filterName]}
                          required={filter.required}
                        />
                        {errors[filterName] && (
                          <FormHelperText style={{ fontSize: 12, color: '#dc2626' }}>
                            {errors[filterName]?.message as string}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )
                }
              })} */}
            </Box>
          </form>
        )}
      </PageContainer>
    </>
  )
}
