import React, { RefObject } from 'react'

import Clear from '@mui/icons-material/Clear'
import Search from '@mui/icons-material/Search'
import { IconButton, InputBase, Paper } from '@mui/material'
import { useTranslation } from 'next-i18next'

// Interface
interface SearchProps {
  placeHolder?: string
  searchTerm: string
  onSearch: (searchText: string) => void
  onKeyEnter?: (searchText: string) => void
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
    borderRadius: '30px',
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
    onKeyEnter,
    ...rest
  } = props
  const { t } = useTranslation('common')
  const SearchAriaLabel = t('search-icon')
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
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onKeyEnter?.(searchTerm)
          }
        }}
        size="small"
        sx={{ ...style.inputBase, '& .MuiInputBase-input': { textIndent: 14 } }}
        inputProps={{ 'aria-label': searchInputAriaLabel }}
        {...inputProps}
        autoComplete="off"
        endAdornment={
          <IconButton
            size="small"
            aria-label={SearchAriaLabel}
            onClick={() => onKeyEnter?.(searchTerm)}
          >
            <Search fontSize="small" />
          </IconButton>
        }
        {...rest}
      />
    </Paper>
  )
}
export default SearchBar
