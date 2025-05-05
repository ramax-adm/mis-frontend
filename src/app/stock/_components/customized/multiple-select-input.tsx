import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { SelectedProductLinesByCompany } from '@/types/stock'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

interface MultipleSelectInputControlledProps {
  label?: string
  size?: 'small' | 'medium'

  // Input
  options: { label: string; key: string }[]
  selectedCategoryByCompany: SelectedProductLinesByCompany[]
  setSelectedCategoryByCompany: (params: SelectedProductLinesByCompany) => void
  companyCode: string
}

export function MultipleSelectInputControlled({
  label = '',
  options,
  companyCode,
  selectedCategoryByCompany,
  setSelectedCategoryByCompany,
  size = 'medium',
}: MultipleSelectInputControlledProps) {
  const selectedValues =
    selectedCategoryByCompany.find((i) => i.companyCode === companyCode)?.values ?? []
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    const values = typeof value === 'string' ? value.split(',') : value

    setSelectedCategoryByCompany({ companyCode, values })
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-multiple-checkbox-label' size={size === 'medium' ? 'normal' : size}>
        {label}
      </InputLabel>
      <Select
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        size={size}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} size={size} />}
        renderValue={(selected) => selected.join(', ')}
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
            <Checkbox size={size} checked={selectedValues?.includes(key)} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
