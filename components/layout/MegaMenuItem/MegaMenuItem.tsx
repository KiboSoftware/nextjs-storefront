import React from 'react'

import { Link, List, ListItem, ListItemText, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import type { PrCategory, Maybe } from '@/lib/gql/types'

interface MegaMenuItemProps {
  title: string
  categoryChildren: Maybe<PrCategory>[]
  categoryCode: string
}

const MegaMenuItem = (props: MegaMenuItemProps) => {
  const { title, categoryChildren, categoryCode } = props
  const { t } = useTranslation('common')

  return (
    <Stack alignItems={'flex-start'}>
      <List dense>
        <ListItem>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
          />
        </ListItem>
        <ListItem button sx={{ cursor: 'pointer' }}>
          <Link
            href={`/category/${categoryCode}`}
            data-testid="shopAllLink"
            underline="none"
            color="grey.900"
          >
            {t('shop-all')}
          </Link>
        </ListItem>
        {categoryChildren?.map((cat) => (
          <ListItem key={cat?.categoryId} role="group">
            <Link
              href={`/category/${cat?.categoryCode}`}
              data-testid="categoryLink"
              underline="none"
              color="grey.900"
            >
              {cat?.content?.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MegaMenuItem
