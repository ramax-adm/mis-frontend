import { FormControl, SxProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  label: string;
  value: dayjs.Dayjs | null | undefined;
  setValue: (date: Date) => void;
  sx?: SxProps;
  size: "small" | "medium";
  readonly?: boolean;
  disabled?: boolean;
};
export function DateInputControlled({
  label,
  value,
  size,
  sx,
  readonly = false,
  disabled = false,
  setValue,
}: Props) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <DatePicker
        label={label}
        value={value}
        readOnly={readonly}
        onChange={(date: Dayjs | null) => {
          return date ? setValue(date.toDate()) : null;
        }}
        slotProps={{
          textField: { size, disabled },
        }}
        format='DD/MM/YYYY'
      />
    </FormControl>
  );
}
