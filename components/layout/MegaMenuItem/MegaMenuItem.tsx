import React from 'react'

import { Link as MuiLink, List, ListItem, ListItemText, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { uiHelpers } from '@/lib/helpers'

import type { PrCategory, Maybe } from '@/lib/gql/types'

interface MegaMenuItemProps {
  title: string
  categoryChildren: Maybe<PrCategory>[]
  categoryCode: string
  onBackDropClose: () => void
}

const MegaMenuItem = (props: MegaMenuItemProps) => {
  const { title, categoryChildren, categoryCode, onBackDropClose } = props
  const { t } = useTranslation('common')

  const { getCategoryLink } = uiHelpers()
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
          <Link href={getCategoryLink(categoryCode)} passHref onClick={onBackDropClose}>
            {/* <MuiLink
              data-testid="shopAllLink"
              underline="none"
              color="grey.900"
              onClick={onBackDropClose}
            >
              {t('shop-all')}
            </MuiLink> */}
            {t('shop-all')}
          </Link>
        </ListItem>
        {categoryChildren?.map((cat) => (
          <ListItem key={cat?.categoryId} role="group">
            <Link
              href={getCategoryLink(cat?.categoryCode as string)}
              passHref
              data-testid="categoryLink"
              onClick={onBackDropClose}
            >
              {/* <MuiLink
                data-testid="categoryLink"
                underline="none"
                color="grey.900"
                onClick={onBackDropClose}
              >
                {cat?.content?.name}
              </MuiLink> */}
              {cat?.content?.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MegaMenuItem
