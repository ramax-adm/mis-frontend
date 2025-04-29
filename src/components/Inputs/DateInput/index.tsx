import { FormControl, FormHelperText, SxProps } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  control?: Control<T>
  error?: FieldError
  sx?: SxProps
  size?: 'small' | 'medium'
  disabled?: boolean
  readonly?: boolean
}
export function DateInput<T extends FieldValues>({
  name,
  label,
  control,
  error,
  sx,
  size = 'medium',
  disabled = false,
  readonly = false,
}: Props<T>) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        render={({ field }) => {
          const value = field.value ? dayjs(field.value) : null
          return (
            <DatePicker
              label={label}
              value={value}
              readOnly={readonly}
              onChange={(date: Dayjs | null) => field.onChange(date ? date.toDate() : null)}
              slotProps={{
                textField: { size, disabled },
              }}
              format='DD/MM/YYYY'
            />
          )
        }}
      />
      {error && (
        <FormHelperText style={{ fontSize: 12, color: '#dc2626' }}>{error.message}</FormHelperText>
      )}
    </FormControl>
  )
}
