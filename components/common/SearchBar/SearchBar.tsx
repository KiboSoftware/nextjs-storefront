import React, { RefObject } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'next-i18next'
// Interface
interface SearchProps {
  placeHolder?: string
  searchTerm: string
  onSearch: (searchText: string) => void
  showClearButton: boolean
  childInputRef?: RefObject<HTMLInputElement | undefined>
  inputProps?: any
}
// MUI
const style = {
  paper: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: { xs: '100%', md: 651 },
    borderRadius: 0,
  },
  inputBase: {
    // ml: 1,
    flex: 1,
  },
  divider: { height: 20, m: 0.5 },
}
// Component
const SearchBar = (props: SearchProps) => {
  const {
    placeHolder = 'Search',
    searchTerm,
    onSearch,
    childInputRef,
    showClearButton = false,
    inputProps,
    ...rest
  } = props
  const { t } = useTranslation('common')
  const searchIconAriaLabel = t('search-icon')
  const searchInputAriaLabel = t('search-input')
  const clearSearchAriaLabel = t('clear-search')
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearch(event.target.value)
  }
  const handleClear = () => {
    onSearch('')
  }
  return (
    <Paper component="form" variant="outlined" sx={{ ...style.paper }}>
      <InputBase
        name="searchInput"
        inputRef={childInputRef}
        value={searchTerm}
        placeholder={placeHolder}
        onChange={handleSearch}
        size="small"
        sx={{ ...style.inputBase }}
        inputProps={{ 'aria-label': searchInputAriaLabel }}
        {...inputProps}
        autoComplete="off"
        startAdornment={
          <IconButton size="small" aria-label={searchIconAriaLabel}>
            <SearchIcon fontSize="small" />
          </IconButton>
        }
        {...(showClearButton && {
          endAdornment: (
            <IconButton
              name="clearButton"
              size="small"
              onClick={handleClear}
              disabled={searchTerm.length === 0}
              aria-label={clearSearchAriaLabel}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ),
        })}
        {...rest}
      />
    </Paper>
  )
}
export default SearchBar
