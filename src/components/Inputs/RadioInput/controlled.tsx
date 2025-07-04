import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SxProps,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useId } from "react";

type Option = {
  key?: string | number;
  value: Date | string | number;
  label: string;
};

type Props = {
  emptyMessage: string;
  name: string;
  label: string;
  value: string | number | Date;
  onChange: (value: string | number | Date) => void;
  error?: string;
  sx?: SxProps;
  shrink?: boolean;
  options?: Option[];
  disabled?: boolean;
  row?: boolean;
};

export function RadioInputControlled({
  emptyMessage,
  name,
  label,
  value,
  onChange,
  options,
  error,
  sx,
  disabled = false,
  row = true,
}: Props) {
  const id = useId();

  return (
    <FormControl sx={sx} error={!!error}>
      <FormLabel
        id={`${id}-label`}
        sx={{
          fontSize: "12px",
          color: "#000",
          fontWeight: 700,
          opacity: disabled ? "0.2" : "1",
        }}
      >
        {label}
      </FormLabel>

      {(!options || options.length === 0) && (
        <Typography>{emptyMessage}</Typography>
      )}

      {options && options.length > 0 && (
        <RadioGroup
          aria-labelledby={`${id}-label`}
          name={name}
          row={row}
          value={value}
          onChange={(e) => {
            const selected = e.target.value;
            // tenta manter o tipo original (number/date/string)
            const match = options.find((opt) => String(opt.value) === selected);
            onChange(match?.value ?? selected);
          }}
        >
          {options.map((item) => (
            <FormControlLabel
              key={item.key}
              value={item.value}
              disabled={disabled}
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
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

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
