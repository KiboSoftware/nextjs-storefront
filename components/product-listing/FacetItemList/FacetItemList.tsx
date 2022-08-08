import React, { useEffect, useState } from 'react'

import { Stack } from '@mui/material'

import { FacetItem } from '@/components/product-listing'
import { facetGetters } from '@/lib/getters'

import type { FacetValue } from '@/lib/gql/types'

// Interface
interface FacetItemListProps {
  itemList: FacetValue[]
  showSearchAndCount?: boolean
  shouldRouteUpdate?: boolean
  onFacetItemSelection?: (selectedFacetItems: string) => void
}

// Component
const FacetItemList = (props: FacetItemListProps) => {
  const {
    itemList = [],
    showSearchAndCount = true,
    shouldRouteUpdate = true,
    onFacetItemSelection,
  } = props
  const [factItemList, setFactItemList] = useState<FacetValue[]>(itemList)

  const handleFacetSelection = (selectedFacetItem: string, isApplied: boolean) => {
    itemList.filter((facet) => facet.filterValue === selectedFacetItem)[0].isApplied = !isApplied
    setFactItemList(itemList)
    const selectedFacetItems = facetGetters.getSelectedFacetItems(factItemList)
    onFacetItemSelection && onFacetItemSelection(selectedFacetItems)
  }
  useEffect(() => {
    itemList.length && setFactItemList(itemList)
  }, [itemList, factItemList])

  return (
    <Stack>
      {factItemList
        .filter((item) => item?.isDisplayed)
        .map((item, index) => (
          <FacetItem
            key={index}
            filterValue={item?.filterValue || ''}
            label={item?.label || ''}
            count={item?.count || 0}
            isApplied={item?.isApplied || false}
            showSearchAndCount={showSearchAndCount}
            shouldRouteUpdate={shouldRouteUpdate}
            onFacetItemSelection={handleFacetSelection}
          />
        ))}
    </Stack>
  )
}

export default FacetItemList
