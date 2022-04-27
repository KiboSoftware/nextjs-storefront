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

import { useUpdateRoutes } from '../../../hooks/useUpdateRoutes'
import SearchBar from '@/components/common/SearchBar/SearchBar'

import type { SearchSuggestionResult } from '@/lib/gql/types'

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

interface SearchSuggestionsProps {
  searchSuggestionResult: SearchSuggestionResult
}

interface ListItemProps {
  heading?: string
  code?: string
  name?: string
}

const ListItemTitle = (props: ListItemProps) => {
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

const ListItemContent = (props: ListItemProps) => {
  const { code, name } = props
  const [updateRoute] = useUpdateRoutes()

  const handleClick = () => {
    updateRoute(code as string, 'add')
  }

  return (
    <ListItem button key={code} onClick={handleClick}>
      <ListItemText primary={name} sx={{ ...style.listItemText }} />
    </ListItem>
  )
}

const SearchSuggestions = (props: SearchSuggestionsProps) => {
  const { searchSuggestionResult } = props

  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSearch = (userEnteredValue: string) => setSearchTerm(userEnteredValue)

  const getSuggestionGroup = (title: string) =>
    searchSuggestionResult?.suggestionGroups?.find((sg) => sg?.name === title)
  const productSuggestionGroup = getSuggestionGroup('Pages')
  const categorySuggestionGroup = getSuggestionGroup('Categories')

  const useDebounce = (value: string, delay: number) => {
    const handler = setTimeout(() => {
      // ToBe: api call
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    searchTerm ? handleOpen() : handleClose()

    if (searchTerm) {
      debouncedSearchTerm
    }
  }, [debouncedSearchTerm, searchTerm])

  return (
    <Stack>
      <Box sx={{ zIndex: 1400 }}>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} showClearButton />
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper sx={{ ...style.paper }}>
          <List sx={{ ...style.list }} role="group">
            <ListItemTitle heading="suggestions" />
            {productSuggestionGroup?.suggestions?.map((product) => (
              <ListItemContent
                key={product?.suggestion?.productCode}
                name={product?.suggestion?.productName}
              />
            ))}
          </List>
          <Divider />
          <List sx={{ ...style.list }} role="group">
            <ListItemTitle heading="categories" />
            {categorySuggestionGroup?.suggestions?.map((product) => (
              <ListItemContent
                key={product?.suggestion?.categoryCode}
                name={product?.suggestion?.content?.name}
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
