import React, { useEffect, useState } from 'react'

import {
  Backdrop,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import SearchBar from '@/components/common/SearchBar/SearchBar'
import { useDebounce, useSearchSuggestions } from '@/hooks'

const style = {
  paper: {
    borderRadius: 0,
    position: 'relative',
    zIndex: 1400,
    width: '100%',
    maxWidth: { xs: '100%', md: 661 },
    marginTop: { xs: 1, md: 0.25 },
  } as SxProps<Theme> | undefined,
  list: {
    p: 2,
  },
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
  path?: string
  closeSearchSuggestion?: () => void
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

const Content = (props: ListItemProps) => {
  const { code, name, path = '', closeSearchSuggestion } = props

  return (
    <Link href={path + code} passHref>
      <ListItem button key={code} onClick={closeSearchSuggestion}>
        <ListItemText primary={name} sx={{ ...style.listItemText }} />
      </ListItem>
    </Link>
  )
}

const SearchSuggestions = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSearch = (userEnteredValue: string) => setSearchTerm(userEnteredValue)

  const searchSuggestionResult = useSearchSuggestions(useDebounce(searchTerm, 2000))

  let productSuggestionGroup, categorySuggestionGroup
  if (searchSuggestionResult.data) {
    const getSuggestionGroup = (title: string) =>
      searchSuggestionResult.data?.suggestionGroups?.find((sg) => sg?.name === title)
    productSuggestionGroup = getSuggestionGroup('Pages')
    categorySuggestionGroup = getSuggestionGroup('Categories')
  }

  useEffect(() => {
    searchTerm ? handleOpen() : handleClose()
  }, [searchTerm])

  return (
    <Stack>
      <Box sx={{ zIndex: 1400 }}>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} showClearButton />
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit role="contentinfo">
        <Paper sx={{ ...style.paper }}>
          <List sx={{ ...style.list }} role="group">
            <Title heading="suggestions" />
            {productSuggestionGroup?.suggestions?.map((product) => (
              <Content
                key={product?.suggestion?.productCode}
                code={product?.suggestion?.productCode}
                name={product?.suggestion?.productName}
                path={'/product/'}
                closeSearchSuggestion={handleClose}
              />
            ))}
          </List>
          <Divider />
          <List sx={{ ...style.list }} role="group">
            <Title heading="categories" />
            {categorySuggestionGroup?.suggestions?.map((product) => (
              <Content
                key={product?.suggestion?.categoryCode}
                code={product?.suggestion?.categoryCode}
                name={product?.suggestion?.content?.name}
                path={'/category/'}
              />
            ))}
          </List>
        </Paper>
      </Collapse>
      <Backdrop open={open} onClick={handleClose} data-testid="backdrop"></Backdrop>
    </Stack>
  )
}
export default SearchSuggestions
