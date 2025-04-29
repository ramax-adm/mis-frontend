'use client'

import { FeedbackAlert } from '@/components/FeedbackAlert'
import { Box, Chip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from 'react'

type Props = {
  onChange: (files: File[]) => void
  multiple?: boolean
}

export function ControlledFormFileInput({ onChange, multiple }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    if (files) {
      onChange(files)
    }
  }, [files, onChange])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const dataTransfer = new DataTransfer()
    const newFiles = Array.from(e.target.files || [])
    if (multiple) {
      setFiles((files) => {
        const allFiles = [...files, ...newFiles]
        allFiles.forEach((file) => dataTransfer.items.add(file))
        return allFiles
      })
      return
    }
    setFiles(newFiles)
    newFiles.forEach((file) => dataTransfer.items.add(file))

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()

    const dataTransfer = new DataTransfer()
    const newFiles = Array.from(e.dataTransfer?.files)

    if (!multiple) {
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 1) {
        setError('Não é possível selecionar mais de 1 arquivo.')
        return
      }
      setFiles(newFiles)
      newFiles.forEach((file) => dataTransfer.items.add(file))
    } else {
      setFiles((files) => {
        const allFiles = [...files, ...newFiles]
        allFiles.forEach((file) => dataTransfer.items.add(file))

        return allFiles
      })
    }

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }

  const handleRemoveFile = (index: number) => {
    const dataTransfer = new DataTransfer()
    setFiles((prevFiles) => {
      const files = prevFiles.filter((_, i) => i !== index)
      files.forEach((file) => dataTransfer.items.add(file))
      return files
    })

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

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `3px dashed ${blue[100]}`,
        width: '100%',
        borderRadius: 2,
        paddingTop: 3,
      }}
    >
      <Box
        sx={{
          width: '80%',
          minHeight: '10rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onDragEnter={handleDragEnter}
        onSubmit={(e: FormEvent) => e.preventDefault()}
        onDrop={handleDrop}
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
                  padding: 2,
                  borderRadius: 3,
                  backgroundColor: blue[500],
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Adicione
              </Typography>
            </Box>
            <input
              style={{ display: 'none' }}
              placeholder='fileInput'
              ref={inputRef}
              multiple={multiple}
              type='file'
              onChange={handleChange}
              accept='.xlsx,.xls,image/*,.doc,.docx,.txt,.pdf'
            />
          </label>
          <Box sx={{ padding: 2 }}> ou arraste arquivos para upload</Box>
        </Box>
        <FeedbackAlert.Root>
          <FeedbackAlert.Content mutationState={error ? 'error' : 'idle'}>
            {error}
          </FeedbackAlert.Content>
        </FeedbackAlert.Root>

        {files && files.length > 0 && (
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
            {Array.from(files).map((file: File, index: number) => (
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
    </Box>
  )
}
