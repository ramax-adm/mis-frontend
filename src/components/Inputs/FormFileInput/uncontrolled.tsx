import { Box, Chip, FormControl, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { Path, useFormContext } from 'react-hook-form'
import { FeedbackAlert } from '@/components/FeedbackAlert'
import { COLORS } from '@/constants/styles/colors'

interface FileValues {
  [key: string]: any[]
}
interface FormFileInputProps {
  formField: Path<FileValues>
  placeholder?: string
  multiple?: boolean
  defaultFiles?: any[]
  onRemoveExistingFile?: (file: any) => void
}
export function UncontrolledFormFileInput({
  placeholder,
  formField,
  multiple,
  defaultFiles = [],
  onRemoveExistingFile,
}: FormFileInputProps) {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<FileValues>()
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const attachments: any[] = watch(formField)
  const [savedFiles, setSavedFiles] = useState(defaultFiles ?? [])
  const allFiles = [...savedFiles, ...Array.from(attachments ?? [])]

  const handleRemoveFile = (idx: number): void => {
    const currentFile = allFiles[idx]

    // if (currentFile instanceof CustomFile) {
    //   setSavedFiles((files) => files.filter((f) => f.id !== currentFile.id))
    //   onRemoveExistingFile && onRemoveExistingFile(currentFile)
    // } else {
    const dataTransfer = new DataTransfer()
    const newFileList = allFiles.filter((_, i) => i !== idx)
    newFileList.forEach((file) => dataTransfer.items.add(file))

    setValue(formField, newFileList)

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
    // }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const dataTransfer = new DataTransfer()
    const droppedFiles = Array.from(e.dataTransfer?.files)
    const currentValues = getValues(formField)

    if (!multiple) {
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 1) {
        setError('Não é possível selecionar mais de 1 arquivo.')
        return
      }
      setValue(formField, droppedFiles)
      droppedFiles.forEach((file) => dataTransfer.items.add(file))
    } else {
      const newFileList = [...currentValues, ...droppedFiles]
      newFileList.forEach((file) => dataTransfer.items.add(file))
      setValue(formField, newFileList)
    }

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const dataTransfer = new DataTransfer()
    const newFiles = Array.from(e.target.files || [])
    const currentValues = getValues(formField)
    if (multiple) {
      const allFiles = [...currentValues, ...newFiles]
      allFiles.forEach((file) => dataTransfer.items.add(file))
      setValue(formField, allFiles)
      return
    }
    setValue(formField, newFiles)
    newFiles.forEach((file) => dataTransfer.items.add(file))

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `4px dashed rgba(62, 99, 221, 1)`,
        width: '100%',
        borderRadius: 2,
        paddingTop: 3,
      }}
    >
      <FormControl
        sx={{
          width: '80%',
          minHeight: '8rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onSubmit={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label>
            <Box
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              <Typography
                sx={{
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: 'rgba(62, 99, 221, 1)',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Adicione
              </Typography>
            </Box>
            <input
              style={{ display: 'none' }}
              placeholder={placeholder}
              multiple={multiple}
              type='file'
              accept='.xlsx,.xls,image/*,.doc,.docx,.txt,.pdf'
              {...register(formField)}
              onChange={handleChange}
            />
          </label>
          <Box sx={{ padding: 2, fontFamily: 'roboto', fontSize: '12px' }}>
            {' '}
            ou arraste arquivos para upload
          </Box>
        </Box>
        <FeedbackAlert.Root sx={{ marginY: 2 }}>
          <FeedbackAlert.Content mutationState={error ? 'error' : 'idle'}>
            {error || errors[formField]?.message}
          </FeedbackAlert.Content>
        </FeedbackAlert.Root>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: 3,
          }}
        >
          {allFiles && allFiles.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
                padding: 3,
                gap: 2,
              }}
            >
              {allFiles.map((file: File, index: number) => (
                <Chip
                  key={file.name}
                  label={file.name}
                  variant='outlined'
                  onDelete={() => handleRemoveFile(index)}
                />
              ))}
            </Box>
          )}
        </Box>
      </FormControl>
    </Box>
  )
}
