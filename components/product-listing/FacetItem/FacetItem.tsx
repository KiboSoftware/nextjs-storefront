import React from 'react'

import { Checkbox, Stack, FormControlLabel, FormLabel, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

import { useUpdateRoutes } from '@/hooks'

// Interface
interface FacetItemProps {
  filterValue: string
  label: string
  count: number
  isApplied: boolean
  showSearchAndCount?: boolean
  shouldRouteUpdate?: boolean
  onFacetItemSelection?: (selectedFacetItem: string, isApplied: boolean) => void
}

// MUI
const style = {
  stack: { width: '100%' },
  formControlLabel: {
    width: '100%',
    fontSize: (theme: Theme) => theme.typography.body2,
  } as SxProps<Theme> | undefined,
  formLabel: {
    typography: 'body2',
    color: 'text.primary',
  },
}

// Component
const FacetItem = (props: FacetItemProps) => {
  const {
    filterValue,
    label: facetItemLabel,
    count = 0,
    isApplied = false,
    showSearchAndCount = true,
    shouldRouteUpdate = true,
    onFacetItemSelection,
  } = props
  const { updateRoute } = useUpdateRoutes()

  const handleChange = () => {
    shouldRouteUpdate ? updateRoute(filterValue) : handleFacetSelection(filterValue)
  }

  const handleFacetSelection = (selectedFacetItem: string) =>
    onFacetItemSelection && onFacetItemSelection(selectedFacetItem, isApplied)

  const isHtml = (str: string) => {
    if (!str) return ''
    const tempElement = document.createElement('div')
    tempElement.innerHTML = str
    return tempElement.innerText
  }
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ ...style.stack }}
    >
      <FormControlLabel
        data-testid="label"
        sx={{ ...style.formControlLabel }}
        label={isHtml(facetItemLabel)}
        control={<Checkbox size="small" checked={isApplied} onChange={handleChange} />}
      />
      {showSearchAndCount && (
        <FormLabel data-testid="count" aria-label="facet-item-label" sx={{ ...style.formLabel }}>
          ({count})
        </FormLabel>
      )}
    </Stack>
  )
}

export default FacetItem
