import CloseIcon from '@mui/icons-material/Close'
import { Box, Chip, Stack } from '@mui/material'

import type { FacetValue } from '@/lib/gql/types'

export type FilterTilesProps = {
  appliedFilters: FacetValue[]
  children?: React.ReactNode
  onSelectedTileRemoval: (tile: string) => void
}

const styles = {
  filterTiles: {
    display: 'inline-flex',
    margin: '0 1rem 1rem 0',
  },
  closeIcon: {
    '& .MuiChip-deleteIcon': {
      color: 'text.primary',
      typography: 'body1',
      marginTop: '1',
    },
    typography: 'body2',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'text.primary',
  },
}
const FilterTiles = (props: FilterTilesProps) => {
  const { appliedFilters, children, onSelectedTileRemoval } = props

  return (
    <Box component="div">
      {appliedFilters?.map((filter) => (
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
            onDelete={() => onSelectedTileRemoval(filter?.filterValue as string)}
          />
        </Stack>
      ))}
      <Box sx={{ display: { xs: 'block', md: 'inline' } }}>{children}</Box>
    </Box>
  )
}

export default FilterTiles
