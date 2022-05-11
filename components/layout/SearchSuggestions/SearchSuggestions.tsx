import React, { useEffect, useState } from 'react'

import { Backdrop, Box, Collapse, Divider, List, Paper, Stack, SxProps, Theme } from '@mui/material'

import { useDebounce, useSearchSuggestions } from '../../../hooks'
import Content from '../Content/Content'
import Title from '../Title/Title'
import SearchBar from '@/components/common/SearchBar/SearchBar'

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
}

const SearchSuggestions = () => {
  const { data: searchSuggestionResult } = useSearchSuggestions()

  const [open, setOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSearch = (userEnteredValue: string) => setSearchTerm(userEnteredValue)

  const getSuggestionGroup = (title: string) =>
    searchSuggestionResult?.suggestionGroups?.find((sg) => sg?.name === title)
  const productSuggestionGroup = getSuggestionGroup('Pages')
  const categorySuggestionGroup = getSuggestionGroup('Categories')

  // ToBe: use debouncedSearchResult as searchSuggestionResult once mutation gets implemented
  const debouncedSearchResult = useDebounce(searchTerm, 500)

  useEffect(() => {
    // ToBe: Handle open close based on API response
    searchTerm ? handleOpen() : handleClose()

    if (searchTerm) {
      // ToBe: fetch API here
    }
  }, [debouncedSearchResult])

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
                name={product?.suggestion?.productName}
              />
            ))}
          </List>
          <Divider />
          <List sx={{ ...style.list }} role="group">
            <Title heading="categories" />
            {categorySuggestionGroup?.suggestions?.map((product) => (
              <Content
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
