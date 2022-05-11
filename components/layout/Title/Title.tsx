import React from 'react'

import { ListItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const style = {
  listItem: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}

interface ListItemProps {
  heading?: string
  code?: string
  name?: string
}

const Title = (props: ListItemProps) => {
  const { heading } = props
  const { t } = useTranslation('common')

  return (
    <ListItem key="Suggestions" sx={{ ...style.listItem }}>
      <Typography fontWeight={600} variant="subtitle1">
        {t(heading as string)}
      </Typography>
    </ListItem>
  )
}
export default Title
