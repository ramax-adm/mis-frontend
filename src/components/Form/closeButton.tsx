import { Button, ButtonProps, Typography } from '@mui/material'

interface FormCloseButtonProps extends ButtonProps {
  closeMessage?: string
  onClose: () => void
}
export function FormCloseButton({
  closeMessage = 'Fechar',
  onClose,
  ...props
}: FormCloseButtonProps) {
  return (
    <Button type='button' variant='outlined' color='error' onClick={onClose} {...props}>
      <Typography>{closeMessage}</Typography>
    </Button>
  )
}
