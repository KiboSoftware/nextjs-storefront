import { FormControlLabel, InputLabel, Switch } from '@mui/material'

import kiboSwitchStyle from './KiboSwitch.styles'

export interface KiboSwitchProps {
  checked: boolean
  onLabel: string
  offLabel: string
  title?: string
  onChange: (value: boolean) => void
}

const KiboSwitch = (props: KiboSwitchProps) => {
  const { checked, onLabel, offLabel, onChange, title } = props
  const classes = kiboSwitchStyle()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <>
      <InputLabel style={{ fontSize: '12px' }}>{title}</InputLabel>
      <FormControlLabel
        control={
          <Switch
            sx={{ m: 1 }}
            checked={checked}
            onChange={handleChange}
            className={classes.switch}
            focusVisibleClassName=".Mui-focusVisible"
            disableRipple
          />
        }
        label={checked ? onLabel : offLabel}
      />
    </>
  )
}

export default KiboSwitch
