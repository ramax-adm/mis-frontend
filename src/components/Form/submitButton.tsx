import { Button, ButtonProps, Typography } from '@mui/material'

interface FormSubmitButtonProps extends ButtonProps {
  submitMessage?: string
}
export function FormSubmitButton({ submitMessage = 'Cadastrar', ...props }: FormSubmitButtonProps) {
  return (
    <Button type='submit' variant='outlined' {...props}>
      <Typography>{submitMessage}</Typography>
    </Button>
  )
}
