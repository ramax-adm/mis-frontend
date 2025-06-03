import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SxProps,
  FormHelperText,
  Typography,
} from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

type Option = {
  key?: string | number
  value: Date | string | number
  label: string
}

type Props<T extends FieldValues> = {
  emptyMessage: string
  name: Path<T>
  label: string
  control: Control<T>
  error?: FieldError
  sx?: SxProps
  shrink?: boolean
  options?: Option[]
  disabled?: boolean
  row?: boolean
}

export function RadioInput<T extends FieldValues>({
  emptyMessage,
  name,
  label,
  options,
  control,
  error,
  sx,
  disabled = false,
  row = true,
}: Props<T>) {
  return (
    <FormControl sx={sx} error={!!error}>
      <FormLabel
        id={`${name}-label`}
        sx={{
          fontSize: '12px',
          color: '#000',
          fontWeight: 700,
          opacity: disabled ? '0.2' : '1',
        }}
      >
        {label}
      </FormLabel>
      {(!options || options.length === 0) && <Typography>{emptyMessage}</Typography>}
      {options && options.length > 0 && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} aria-labelledby={`${name}-label`} row={row}>
              {options.map((item) => (
                <FormControlLabel
                  key={item.key}
                  value={item.value}
                  disabled={disabled}
                  control={
                    <Radio
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 18,
                        },
                      }}
                    />
                  }
                  label={item.label}
                />
              ))}
            </RadioGroup>
          )}
        />
      )}

      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  )
}
