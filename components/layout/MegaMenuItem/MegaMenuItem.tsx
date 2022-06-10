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
        <Link
          href={'/category/' + categoryCode}
          data-testid="shopAllLink"
          underline="none"
          color="grey.900"
        >
          <ListItem button sx={{ cursor: 'pointer' }}>
            <ListItemText
              primary={t('shop-all')}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
          </ListItem>
        </Link>
        {categoryChildren?.map((cat) => (
          <Link
            href={'/category/' + cat?.categoryCode}
            key={cat?.categoryId}
            underline="none"
            color="grey.900"
          >
            <ListItem button sx={{ cursor: 'pointer' }}>
              <ListItemText
                primary={cat?.content?.name}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Stack>
  )
}

export default MegaMenuItem
