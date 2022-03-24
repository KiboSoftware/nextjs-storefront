import React, { useEffect, useState } from 'react'

import { Checkbox, Stack, FormControlLabel, FormLabel } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { useUpdateRoutes } from '../../../hooks/useUpdateRoutes'

// Interface
interface FacetItemProps {
  filterValue: string
  label: string
  count: number
  isApplied: boolean
}

// MUI
const style = {
  stack: { width: '100%' },
  formControlLabel: {
    width: '100%',
    fontSize: (theme: Theme) => theme.typography.body2,
  },
  formLabel: {
    typography: 'body2',
  },
}

// Component
const FacetItem = (props: FacetItemProps) => {
  const { filterValue, label: facetItemLabel, count = 0, isApplied = false } = props

  const router = useRouter()
  const [checked, setChecked] = useState<boolean>(isApplied)
  const [updateRoute] = useUpdateRoutes()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const action = isChecked ? 'add' : 'remove'

    updateRoute(filterValue, action)
    setChecked(isChecked)
  }

  // To mark FacetItem(checkbox) checked on Page reolad/refresh
  useEffect(() => {
    const filters = router?.query?.filters || ''
    if (filters.includes(filterValue)) setChecked(true)
  }, [filterValue, router?.query?.filters])

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
        control={<Checkbox size="small" checked={checked} onChange={handleChange} />}
      />
      <FormLabel data-testid="count" aria-label="facet-item-label" sx={{ ...style.formLabel }}>
        ({count})
      </FormLabel>
    </Stack>
  )
}

export default FacetItem
