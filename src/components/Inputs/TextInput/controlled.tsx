import { FormControl, TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

interface TextInputControlledProps {
  id?: string;
  label: string;
  value: string | null;
  setValue: (value: string | null) => void;
  type?: HTMLInputTypeAttribute | undefined;
  size?: "small" | "medium";
  autoComplete?: string;
}
export function TextInputControlled({
  id,
  label,
  setValue,
  value,
  size = "small",
  type,
  autoComplete,
}: TextInputControlledProps) {
  return (
    <FormControl fullWidth>
      <TextField
        id={id}
        label={label}
        variant='outlined'
        value={value}
        size={size}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        autoComplete={autoComplete}
        InputProps={{
          autoComplete,
        }}
      />
    </FormControl>
  );
}
