import React from 'react'

import { Stack } from '@mui/material'

import FacetItem from '../FacetItem/FacetItem'

import { FacetValue, Maybe } from '@/lib/gql/types'

// Interface
interface FacetItemListProps {
  itemList: Maybe<FacetValue>[]
}

// Component
function FacetItemList(props: FacetItemListProps) {
  const { itemList = [] } = props

  return (
    <Stack>
      {itemList
        .filter((item) => item?.isDisplayed)
        .map((item, index) => (
          <FacetItem
            key={index}
            filterValue={item?.filterValue || ''}
            label={item?.label}
            count={item?.count || 0}
          />
        ))}
    </Stack>
  )
}

export default FacetItemList
