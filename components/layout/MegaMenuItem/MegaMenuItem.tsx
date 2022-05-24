import React from 'react'

import { List, ListItem, ListItemText, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import type { PrCategory, Maybe } from '@/lib/gql/types'

interface MegaMenuItemProps {
  title: string
  categoryChildren: Maybe<PrCategory>[]
  categoryCode: string
}

const MegaMenuItem = (props: MegaMenuItemProps) => {
  const { title, categoryChildren, categoryCode } = props
  const { t } = useTranslation('common')
  const router = useRouter()

  const handleClick = (code: string) => {
    router.push('/product/' + code)
  }

  return (
    <Stack alignItems={'flex-start'}>
      <List dense>
        <ListItem>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
          />
        </ListItem>
        <ListItem
          button
          sx={{ cursor: 'pointer' }}
          onClick={() => handleClick(categoryCode || '')}
          data-testid="shopAllLink"
        >
          <ListItemText primary={t('shop-all')} primaryTypographyProps={{ variant: 'subtitle2' }} />
        </ListItem>
        {categoryChildren?.map((cat) => (
          <ListItem
            button
            key={cat?.categoryId}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleClick(cat?.categoryCode || '')}
          >
            <ListItemText
              primary={cat?.content?.name}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MegaMenuItem
