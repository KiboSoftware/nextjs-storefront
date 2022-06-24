import CloseIcon from '@mui/icons-material/Close'
import { Box, Chip, Stack } from '@mui/material'

import { useUpdateRoutes } from '@/hooks'

import type { FacetValue } from '@/lib/gql/types'

export type FilterTilesProps = {
  appliedFilters?: FacetValue[]
  children?: React.ReactNode
}

const styles = {
  filterTiles: {
    display: 'inline-flex',
    margin: '0 1rem 1rem 0',
  },
  closeIcon: {
    '& .MuiChip-deleteIcon': {
      color: '#2b2b2b',
      fontSize: '1rem',
      marginTop: '1',
    },
    fontSize: '14px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#2B2B2B',
  },
}
const FilterTiles = (props: FilterTilesProps) => {
  const { appliedFilters, children } = props
  const { updateRoute } = useUpdateRoutes()
  const removeTile = (tile?: string) => {
    updateRoute(tile as string)
  }
  return (
    <>
      <Box component="div" sx={{ margin: '1rem 0 0 1rem' }}>
        {appliedFilters &&
          appliedFilters.map((filter) => (
            <Stack
              key={filter.filterValue}
              direction="row"
              alignItems="center"
              sx={{ ...styles.filterTiles }}
            >
              <Chip
                variant="outlined"
                sx={{ ...styles.closeIcon }}
                label={filter.label}
                deleteIcon={<CloseIcon />}
                onDelete={() => removeTile(filter?.filterValue as string)}
              />
            </Stack>
          ))}
        <Box sx={{ display: { xs: 'block', md: 'inline' } }}>{children}</Box>
      </Box>
    </>
  )
}

export default FilterTiles
