import { FormControl, TextField } from "@mui/material";

interface TextInputControlledProps {
  label: string;
  value: string | null;
  setValue: (value: string | null) => void;
  size?: "small" | "medium";
}
export function TextInputControlled({
  label,
  setValue,
  value,
  size = "small",
}: TextInputControlledProps) {
  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        variant='outlined'
        value={value}
        size={size}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
}
