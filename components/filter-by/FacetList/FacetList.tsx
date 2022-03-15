import React, { FC } from 'react'

import { Stack } from '@mui/material'

import Facet from '../Facet/Facet'

import { Facet as FacetType } from '@/lib/gql/types'

// Interface
interface FacetListProps {
  facetList: FacetType[]
}

// Component
const FacetList: FC<FacetListProps> = (props) => {
  const { facetList = [] } = props

  return (
    <Stack>
      {facetList
        .filter((facet) => facet?.facetType === 'Value' || facet?.facetType === 'RangeQuery')
        .map((facet, index) => (
          <Facet key={index} label={facet.label} values={facet.values} />
        ))}
    </Stack>
  )
}

export default FacetList
