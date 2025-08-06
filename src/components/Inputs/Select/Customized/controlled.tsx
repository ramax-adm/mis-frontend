import {
  Autocomplete,
  FormControl,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { FieldError } from "react-hook-form";

type SelectOption<TValue = string> = {
  key?: string | number;
  label: string;
  value: TValue;
};

type Props<TValue = string> = {
  id: string;
  name: string;
  label: string;
  value: TValue;
  options?: SelectOption<TValue>[];
  loading?: boolean;
  disabled?: boolean;
  noDataText?: string;
  sx?: SxProps;
  size?: "small" | "medium";
  onChange?: (value: TValue) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: SelectOption<TValue>
  ) => React.ReactNode;
  error?: boolean;
  errorMessage?: string;
};

export function ControlledSelect<TValue>({
  id,
  name,
  label,
  value,
  options,
  loading,
  disabled,
  noDataText,
  size = "medium",
  sx,
  onChange,
  renderOption,
  error,
  errorMessage,
}: Props<TValue>) {
  if (noDataText && options?.length === 0) {
    return <Typography color='danger'>{noDataText}</Typography>;
  }
  return (
    <FormControl fullWidth sx={{ margin: 0, ...sx }} size={size}>
      <Autocomplete
        id={id}
        sx={{ flexGrow: 1 }}
        size={size}
        value={options?.find((opt) => opt.value === value) || null}
        getOptionLabel={(option: SelectOption<TValue>) => option.label || ""}
        isOptionEqualToValue={(options, value) => options.value === value.value}
        disablePortal
        loading={loading}
        disabled={disabled}
        options={options || []}
        renderOption={
          renderOption
            ? (props, option) => renderOption(props, option)
            : undefined
        }
        onChange={(
          _,
          data: SelectOption<TValue> | SelectOption<TValue>[] | null
        ) => {
          if (!data) {
            onChange && onChange("" as TValue);
            return;
          }
          if (Array.isArray(data)) {
            onChange && onChange(data[0].value);
            return;
          }
          onChange && onChange(data.value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={label}
            helperText={error && errorMessage}
          />
        )}
      />
    </FormControl>
  );
}
