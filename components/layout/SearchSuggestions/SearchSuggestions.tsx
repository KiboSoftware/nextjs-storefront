import React, { useEffect } from 'react'

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

import SearchBar from '@/components/common/SearchBar/SearchBar'

import type { SearchSuggestionResult } from '@/lib/gql/types'
const style = {
  paper: {
    borderRadius: 0,
    position: 'relative',
    zIndex: 1400,
    width: '100%',
    maxWidth: { xs: '100%', md: 661 },
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

interface searchSuggestionProps {
  suggestionSearch: SearchSuggestionResult
  gap?: number
  isSuggestionOpen: boolean
  setIsSuggestionOpen: (IsSuggestionOpen: boolean) => void
}

const SearchSuggestions = (props: searchSuggestionProps) => {
  const { t } = useTranslation('common')
  const { suggestionSearch, gap, isSuggestionOpen, setIsSuggestionOpen } = props
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const handleOpen = () => {
    setOpen(true)
    setIsSuggestionOpen(open)
  }
  const handleClose = () => setOpen(false)
  const handleSearch = (value: string) => {
    value ? handleOpen() : handleClose()
    setSearchTerm(value)
  }

  const productSuggestionGroup = suggestionSearch?.suggestionGroups?.find(
    (sg) => sg?.name === 'Pages'
  )
  const categorySuggestionGroup = suggestionSearch?.suggestionGroups?.find(
    (sg) => sg?.name === 'Categories'
  )

  useEffect(() => {
    setOpen(isSuggestionOpen)
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // ToBe: api call to fetch searchResults
      }
    }, 2000)
    return () => clearTimeout(delayDebounceFn)
  }, [isSuggestionOpen, searchTerm])

  return (
    <Stack>
      <Box sx={{ zIndex: 1400 }}>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} showClearButton />
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper sx={{ marginTop: gap, ...style.paper }}>
          <List sx={{ ...style.list }} role="group">
            <ListItem key="Suggestions" sx={{ ...style.listItem }}>
              <Typography fontWeight={600} variant="subtitle1">
                {t('suggestions')}
              </Typography>
            </ListItem>
            {productSuggestionGroup?.suggestions?.map((product) => (
              <ListItem
                button
                key={product?.suggestion?.productCode}
                onClick={() => handleSearch(product?.suggestion?.productName)}
              >
                <ListItemText
                  primary={product?.suggestion?.productName}
                  sx={{ ...style.listItemText }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ ...style.list }} role="group">
            <ListItem key="Suggestions" sx={{ ...style.listItem }}>
              <Typography fontWeight={600} variant="subtitle1">
                {t('categories')}
              </Typography>
            </ListItem>
            {categorySuggestionGroup?.suggestions?.map((product) => (
              <ListItem button key={product?.suggestion?.categoryCode}>
                <ListItemText
                  primary={product?.suggestion?.content?.name}
                  sx={{ ...style.listItemText }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Collapse>
      <Backdrop open={open} onClick={handleClose}></Backdrop>
    </Stack>
  )
}
export default SearchSuggestions
