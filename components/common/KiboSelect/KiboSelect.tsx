import { MenuItem, OutlinedInput } from '@mui/material'
import { FormControl, FormHelperText, Select } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface KiboSelectProps {
  name?: string
  value?: string
  helperText?: string
  error?: boolean
  placeholder?: string
  children: any
  onChange: (name: string, value: string) => void
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

const KiboSelect = (props: KiboSelectProps) => {
  const { t } = useTranslation('common')

  const {
    name = 'kibo-select',
    value = '',
    helperText = '',
    error = false,
    placeholder = t('select-option'),
    children,
    onChange,
    ...rest
  } = props

  return (
    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth variant="outlined">
      <Select
        size="small"
        displayEmpty
        name={name}
        error={error}
        defaultValue={value}
        MenuProps={MenuProps}
        sx={{ height: '34px' }}
        inputProps={{ 'aria-hidden': false }}
        input={<OutlinedInput size="small" />}
        onChange={(event) => onChange(event.target.name, event.target.value as string)}
        {...rest}
      >
        <MenuItem value={''} disabled sx={{ display: 'none' }}>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
      {error && (
        <FormHelperText error={error} data-testid="helper-text" sx={{ margin: '3px 0' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default KiboSelect
