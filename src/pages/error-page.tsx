import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ErrorMessage = () => {
  const { t } = useTranslation('common')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const error = queryParams.get('error')
    setErrorMessage(error)
  }, [])

  return (
    <Typography variant="subtitle2" fontWeight={'bold'}>
      {errorMessage ? t(errorMessage) : t('error-cartTakeover')}
    </Typography>
  )
}

export default ErrorMessage
