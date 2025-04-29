import { Alert, Box } from '@mui/material'

interface TableNoContentMessageProps {
  isEmpty: boolean
  isError: boolean
  errorMessage?: string
}
export function TableNoContentMessage({ isEmpty, isError }: TableNoContentMessageProps) {
  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          margin: 3,
        }}
      >
        <Alert severity='error'>Ocorreu um erro ao buscar os dados!</Alert>
      </Box>
    )
  }

  if (isEmpty) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          margin: 3,
        }}
      >
        <Alert severity='info'>Não foram encontrados itens</Alert>
      </Box>
    )
  }
}
