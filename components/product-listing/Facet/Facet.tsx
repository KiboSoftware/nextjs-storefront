import React, { useState, useEffect, useRef } from 'react'

import { Add, ExpandMore, Remove } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'

import { SearchBar, FullWidthDivider } from '@/components/common'
import { FacetItemList } from '@/components/product-listing'

import type { Facet as FacetType, FacetValue, Maybe } from '@/lib/gql/types'

// Interface
interface FacetProps extends FacetType {
  numberOfItemsToShow: number
  showSearchAndCount?: boolean
  shouldRouteUpdate?: boolean
  onFacetItemSelection?: (selectedFacetItems: string) => void
}

// MUI
const style = {
  accordion: {
    ':before': {
      backgroundColor: 'transparent',
    },
    boxShadow: 0,
    borderRadius: 0,
  },

  accordionDetails: {
    pt: 0,
    p: { md: 0 },
  },
  button: {
    textTransform: 'capitalize',
    color: 'text.primary',
    fontSize: (theme: Theme) => theme.typography.body2,
  } as SxProps<Theme> | undefined,
}

// Component
const Facet = (props: FacetProps) => {
  const {
    numberOfItemsToShow = 6,
    label,
    values = [],
    showSearchAndCount = true,
    shouldRouteUpdate = true,
    onFacetItemSelection,
  } = props

  const { t } = useTranslation('common')
  const viewMore = t('view-more')
  const viewLess = t('view-less')

  const childInputRef = useRef<HTMLInputElement | undefined>(null)
  const valuesLength = values?.length || 0
  const isVisible = valuesLength > numberOfItemsToShow

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(isVisible)
  const [buttonText, setButtonText] = useState<string>(viewMore)
  const [filteredValues, setFilteredValues] = useState<Maybe<FacetValue>[]>([])
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const handleSearch = (searchText: string) => {
    setSearchTerm(searchText.toLowerCase())
  }

  const handleButtonText = () => {
    setButtonText(() => (buttonText === viewMore ? viewLess : viewMore))
  }

  const handleAccordionChange = (
    _event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => {
    if (!expanded) return

    setTimeout(() => {
      childInputRef.current && childInputRef.current.focus()
    }, 0)
  }

  useEffect(() => {
    const filtered = values?.filter((item) => item?.label?.toLowerCase().includes(searchTerm)) || []
    const noOfItemsToShow = buttonText === viewMore ? numberOfItemsToShow : valuesLength
    const sliced = filtered?.slice(0, noOfItemsToShow) || []

    setFilteredValues([...sliced])

    const state = searchTerm
      ? filtered.length > numberOfItemsToShow
      : valuesLength > numberOfItemsToShow
    setIsButtonVisible(state)
  }, [viewMore, values, valuesLength, searchTerm, buttonText, numberOfItemsToShow])

  return (
    <>
      <Accordion
        data-testid="accordian"
        onChange={handleAccordionChange}
        disableGutters
        sx={{ ...style.accordion }}
      >
        <AccordionSummary
          data-testid="accordian-summery"
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            padding: {
              md: '0',
            },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {label}
          </Typography>
        </AccordionSummary>

        <AccordionDetails data-testid="accordian-details" sx={{ ...style.accordionDetails }}>
          {showSearchAndCount && (
            <SearchBar
              placeHolder={'Search ' + label}
              searchTerm={searchTerm}
              onSearch={handleSearch}
              childInputRef={childInputRef}
              showClearButton={true}
            />
          )}
          <Box pl={0.5} pr={0.5}>
            <FacetItemList
              itemList={filteredValues as FacetValue[]}
              showSearchAndCount={showSearchAndCount}
              shouldRouteUpdate={shouldRouteUpdate}
              onFacetItemSelection={onFacetItemSelection}
            />
          </Box>

          {isButtonVisible && (
            <Button
              variant="text"
              size="small"
              name="View More"
              aria-label={buttonText}
              sx={{ ...style.button }}
              startIcon={
                buttonText === viewMore ? <Add fontSize="small" /> : <Remove fontSize="small" />
              }
              onClick={() => handleButtonText()}
            >
              {buttonText}
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      {mdScreen ? <Divider sx={{ borderColor: 'grey.500' }} /> : <FullWidthDivider />}
    </>
  )
}

export default Facet
