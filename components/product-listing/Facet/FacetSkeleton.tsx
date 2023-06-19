import ExpandMore from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Skeleton, Typography } from '@mui/material'

import { FacetStyle } from './Facet.styles'

const FacetSkeleton = () => {
  return (
    <Accordion expanded sx={{ ...FacetStyle.accordion }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">
          <Skeleton width={100} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <Skeleton variant="rectangular" height={30} />
          <Skeleton variant="rectangular" height={30} />
          <Skeleton variant="rectangular" height={30} />
          <Skeleton variant="rectangular" height={30} />
          <Skeleton variant="rectangular" height={30} />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default FacetSkeleton
