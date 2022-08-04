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
  isElementVisible?: boolean
  isUpdateRoute?: boolean
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
    isElementVisible = true,
    isUpdateRoute = true,
    onFacetItemSelection,
  } = props
  const { updateRoute } = useUpdateRoutes()

  const handleChange = () => {
    isUpdateRoute ? updateRoute(filterValue) : handleFacetSelection(filterValue)
  }

  const handleFacetSelection = (selectedFacetItem: string) =>
    onFacetItemSelection && onFacetItemSelection(selectedFacetItem, isApplied)

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
        label={facetItemLabel ? facetItemLabel : ''}
        control={<Checkbox size="small" checked={isApplied} onChange={handleChange} />}
      />
      {isElementVisible && (
        <FormLabel data-testid="count" aria-label="facet-item-label" sx={{ ...style.formLabel }}>
          ({count})
        </FormLabel>
      )}
    </Stack>
  )
}

export default FacetItem
