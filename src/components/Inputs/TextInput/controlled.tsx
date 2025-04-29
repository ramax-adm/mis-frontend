import { FormControl, TextField } from '@mui/material'

interface TextInputControlledProps {
  label: string
  value: string | null
  setValue: (value: string | null) => void
}
export function TextInputControlled({ label, setValue, value }: TextInputControlledProps) {
  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        variant='outlined'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  )
}
