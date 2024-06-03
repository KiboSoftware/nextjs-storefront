/** @format */

import { useState } from 'react'

import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboTextBox } from '@/components/common'

export interface TipProps {
  onAddTip: (amount: string) => void
}
const styles = {
  boxStyle: {
    display: 'inline-block',
    mr: '0.5rem',
    px: '0.5rem',
    mb: '0.5rem',
    backgroundColor: 'grey.500',
  },
  textBoxStyle: {
    minWidth: '10rem',
    mr: '0.5rem',
  },
  buttonStyle: { width: '5rem', height: '2.20rem' },
}

const Tip = (props: TipProps) => {
  const { t } = useTranslation('common')
  const { onAddTip } = props
  const [tip, setTip] = useState<string>('')
  const handleAddTip = () => {
    onAddTip(tip)
    setTip('')
  }

  return (
    <Stack direction="row">
      <KiboTextBox
        name="tip"
        type="number"
        value={tip}
        placeholder="Enter your tip amount here"
        sx={styles.textBoxStyle}
        onChange={(_name, value) => setTip(value)}
        data-testid="tip-input"
      />
      <Button
        onClick={handleAddTip}
        disabled={tip?.length > 0 ? false : true}
        sx={styles.buttonStyle}
        variant="contained"
        data-testid="tip-button"
      >
        {t('add')}
      </Button>
    </Stack>
  )
}

export default Tip
