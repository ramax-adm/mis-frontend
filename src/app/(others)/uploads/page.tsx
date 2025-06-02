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
import dynamic from 'next/dynamic'
import { report } from 'process'
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = dynamic(() => import('./components/page'), {
  ssr: false,
})

export default function UploadPage() {
  return <Page />
}
