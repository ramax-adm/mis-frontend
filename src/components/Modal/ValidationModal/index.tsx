import { Box, Typography, Button } from '@mui/material'

interface ValidationModalProps {
  onClose: () => void
  handleSubmit: () => void
  isSubmitting: boolean
}

export default function ValidationModal({
  onClose,
  handleSubmit,
  isSubmitting,
}: ValidationModalProps) {
  return (
    <>
      <Box>
        <div
          style={{
            padding: '16px 24px',
            borderRadius: '8px 8px 0 0',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant='h6' component='h2'>
            Confirmação
          </Typography>
          <Typography variant='body1'>Realmente deseja continuar?</Typography>
        </div>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: '8px',
            padding: '30px',
          }}
        >
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant='contained'
            type='submit'
            color={'success'}
          >
            <Typography color={'#fff'}>Confirmar</Typography>
          </Button>
          <Button
            type='button'
            disabled={isSubmitting}
            variant='outlined'
            color='warning'
            onClick={() => onClose()}
          >
            <Typography>Fechar</Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}
