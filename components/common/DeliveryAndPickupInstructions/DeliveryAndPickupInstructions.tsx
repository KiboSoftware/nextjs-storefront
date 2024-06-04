/** @format */

import { useState } from 'react'

import { Button, Stack, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'

export interface DeliveryAndPickupInstructionsProps {
  placeHolder?: string
  onAddInstructions: (instructions: string) => void
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
    width: '100%',
  },
  buttonStyle: { width: '5rem', height: '2.20rem' },
}

const DeliveryAndPickupInstructions = (props: DeliveryAndPickupInstructionsProps) => {
  const { t } = useTranslation('common')
  const { placeHolder, onAddInstructions } = props
  const [instructions, setInstructions] = useState<string>('')
  const handleChange = (event: any) => {
    setInstructions(event.target.value)
  }
  const handleAddInstructions = () => {
    onAddInstructions(instructions)
    setInstructions('')
  }

  return (
    <Stack direction="row" mb={2}>
      <TextField
        name="delivery-and-pickup-instructions"
        value={instructions}
        placeholder={placeHolder}
        sx={styles.textBoxStyle}
        multiline={true}
        rows={2}
        maxRows={4}
        onChange={handleChange}
      />
      <Button
        onClick={handleAddInstructions}
        disabled={instructions?.length > 0 ? false : true}
        sx={styles.buttonStyle}
        variant="contained"
        data-testid="add-instruction-button"
      >
        {t('add')}
      </Button>
    </Stack>
  )
}

export default DeliveryAndPickupInstructions
