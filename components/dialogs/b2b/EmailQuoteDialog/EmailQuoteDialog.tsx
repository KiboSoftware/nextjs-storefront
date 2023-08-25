import React, { useState } from 'react'

import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'

interface EmailQuoteActionsProps {
  isSendDisabled: boolean
  onSend: () => void
  onCancel: () => void
}

interface EmailQuoteContentProps {
  emails: string[]
  onValidInput: (values: string[]) => void
}

interface EmailQuoteDialogProps {
  onEmailSend: (emails: string[]) => void
  closeModal: () => void
}

const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

const EmailQuoteContent = (props: EmailQuoteContentProps) => {
  const { emails: values, onValidInput } = props
  const [inputValue, setInputValue] = useState('')

  const { t } = useTranslation('common')

  return (
    <Autocomplete
      multiple
      data-testid="autocomplete"
      id="emails"
      options={[]}
      value={values}
      defaultValue={[inputValue]}
      freeSolo
      inputValue={inputValue}
      onChange={(_, value) => {
        if (emailPattern.test(inputValue)) {
          onValidInput(value)
          setInputValue('')
        }
      }}
      onInputChange={(_event: any, value: string, reason: string) => {
        if (reason === 'reset') {
          emailPattern.test(inputValue) && onValidInput([...values, inputValue])
        } else if (reason === 'clear') {
          onValidInput([])
        } else {
          setInputValue(value)
        }
      }}
      renderTags={(value: readonly string[], getTagProps) => {
        const handleDelete = (index: number) => {
          const newValues = [...values]
          newValues.splice(index, 1)
          onValidInput(newValues)
        }

        return value.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
            onDelete={() => handleDelete(index)}
          />
        ))
      }}
      renderInput={(params) => (
        <FormControl fullWidth>
          <FormControlLabel
            label={
              <Typography variant="caption" color="grey.600">
                {t('email-addresses')}
              </Typography>
            }
            labelPlacement="top"
            sx={{
              marginInline: 0,
              // '& .MuiFormControlLabel-root': {
              alignItems: 'flex-start',
              // },
            }}
            control={
              <TextField
                {...params}
                id="kibo-input"
                variant="outlined"
                helperText={t('email-input-placeholder')}
              />
            }
          />
        </FormControl>
      )}
    />
  )
}

const EmailQuoteActions = (props: EmailQuoteActionsProps) => {
  const { isSendDisabled, onSend, onCancel } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const tabAndDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Stack gap={2} width="100%" direction={tabAndDesktop ? 'row' : 'column'}>
      <Button
        name="cancel"
        sx={{ width: '100%' }}
        variant="contained"
        color="secondary"
        onClick={onCancel}
      >
        {t('cancel')}
      </Button>
      <Button
        name="confirm"
        sx={{ width: '100%' }}
        variant="contained"
        onClick={onSend}
        {...(isSendDisabled && { disabled: true })}
        type="submit"
      >
        {t('send')}
      </Button>
    </Stack>
  )
}

// Component
const EmailQuoteDialog = (props: EmailQuoteDialogProps) => {
  const { onEmailSend, closeModal } = props
  const { t } = useTranslation('common')

  const [emails, setEmails] = useState<string[]>([])

  const handleEmailSend = () => {
    onEmailSend(emails)
    setEmails([])
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  const DialogArgs = {
    Title: t('email-quote'),
    Content: <EmailQuoteContent emails={emails} onValidInput={setEmails} />,
    showContentTopDivider: true,
    showContentBottomDivider: false,
    Actions: (
      <EmailQuoteActions
        onSend={handleEmailSend}
        onCancel={handleCancel}
        isSendDisabled={!emails.length}
      />
    ),
    isDialogCentered: true,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default EmailQuoteDialog
