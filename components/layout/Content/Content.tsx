import React from 'react'

import { ListItem, ListItemText, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'

const style = {
  listItem: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  listItemText: {
    fontSize: (theme: Theme) => theme.typography.body2,
    margin: 0,
  } as SxProps<Theme> | undefined,
}

interface ListItemProps {
  heading?: string
  code?: string
  name?: string
}

const Content = (props: ListItemProps) => {
  const { code, name } = props
  const router = useRouter()

  const handleClick = () => {
    router.push('/product/' + code)
  }

  return (
    <ListItem button key={code} onClick={handleClick}>
      <ListItemText primary={name} sx={{ ...style.listItemText }} />
    </ListItem>
  )
}

export default Content
