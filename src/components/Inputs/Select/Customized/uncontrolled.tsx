import { Autocomplete, FormControl, SxProps, TextField, Typography } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

type SelectOption = {
  key?: string | number
  label: string
  value: string | number
}

type Props<T extends FieldValues> = {
  id: string
  name: Path<T>
  label: string
  control?: Control<T>
  error?: FieldError
  options?: SelectOption[]
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  required?: boolean
  sx?: SxProps
  size?: 'small' | 'medium'
}

export function UncontroledSelect<T extends FieldValues>({
  id,
  name,
  label,
  options,
  control,
  error,
  disabled,
  readonly,
  loading,
  required,
  sx,
  size = 'medium',
}: Props<T>) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <Controller
        name={name}
        control={control}
        disabled={disabled ?? false}
        rules={{
          required: {
            value: required ?? false,
            message: 'Campo obrigatório',
          },
        }}
        render={({ field }) => {
          return (
            <Autocomplete
              {...field}
              freeSolo={true}
              id={id}
              size={size}
              sx={{ flexGrow: 1 }}
              getOptionLabel={(option) => {
                const selectedOption = options?.find((opt) => opt.value === option)
                return selectedOption ? selectedOption.label : ''
              }}
              isOptionEqualToValue={(option: string | number, value) => {
                return value === '' || value === undefined || option === value
              }}
              disablePortal
              loading={loading}
              options={options?.map((option) => option.value) || []}
              onChange={(_, data: string | number | (string | number)[] | null) => {
                field.onChange(data)
              }}
              renderInput={(params) => <TextField {...params} label={label} error={!!error} />}
              readOnly={readonly ?? false}
              aria-required={required ?? false}
            />
          )
        }}
      />
      {error && (
        <Typography
          sx={{ fontWeight: 400, fontSize: '0.75rem', marginX: '14px', marginTop: '3px' }}
          color='danger'
        >
          {error.message}
        </Typography>
      )}
    </FormControl>
  )
}
