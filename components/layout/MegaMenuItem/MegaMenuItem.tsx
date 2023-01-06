import React from 'react'

import { List, ListItem, ListItemText, Stack, Theme, styled } from '@mui/material'
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

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body1.fontSize,
}))

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
        <ListItem sx={{ cursor: 'pointer' }} onClick={onBackDropClose}>
          <StyledLink href={getCategoryLink(categoryCode)} passHref>
            {t('shop-all')}
          </StyledLink>
        </ListItem>
        {categoryChildren?.map((cat) => (
          <ListItem key={cat?.categoryId} role="group" onClick={onBackDropClose}>
            <StyledLink
              href={getCategoryLink(cat?.categoryCode as string)}
              passHref
              data-testid="categoryLink"
            >
              {cat?.content?.name}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MegaMenuItem
