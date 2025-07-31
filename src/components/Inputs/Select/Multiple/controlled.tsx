import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface MultipleSelectInputControlledProps {
  label?: string;
  size?: "small" | "medium";

  options: { label: string; key: string }[];
  value: string[];
  onChange: (values: string[]) => void;
}

export function MultipleSelectInputControlled({
  label = "",
  options,
  value,
  onChange,
  size = "medium",
}: MultipleSelectInputControlledProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: selected },
    } = event;
    const values =
      typeof selected === "string" ? selected.split(",") : selected;
    onChange(values);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id='multiple-select-label'
        size={size === "medium" ? undefined : size}
      >
        {label}
      </InputLabel>
      <Select
        labelId='multiple-select-label'
        id='multiple-select'
        multiple
        size={size}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} size={size} />}
        renderValue={(selected) => selected.join(", ")}
        inputProps={{
          style: {
            height: size === "small" ? "32px" : "",
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
      >
        {options.map(({ label, key }) => (
          <MenuItem key={key} value={key}>
            <Checkbox size={size} checked={value.includes(key)} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
