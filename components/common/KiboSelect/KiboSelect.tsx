import { MenuItem, OutlinedInput } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'

interface KiboSelectProps {
  name: string
  value?: string
  errorHelperText?: string
  error?: boolean
  placeholder?: string
  children: any
  handleChange: (value: string) => void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function KiboSelect({
  name = 'kibo-select',
  value = '',
  errorHelperText = '',
  error = false,
  placeholder = 'Select option',
  children,
  handleChange,
}: KiboSelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth variant="outlined">
      <Select
        displayEmpty
        defaultValue={value}
        name={name}
        onChange={(event) => handleChange(event.target.value as string)}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'kibo-select', 'data-testid': 'kibo-select' }}
        error={error}
        data-testid="kibo-select"
      >
        <MenuItem value={''} disabled hidden>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
      {error && (
        <FormHelperText error={error} data-testid="helper-text">
          {errorHelperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
