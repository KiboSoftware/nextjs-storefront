import React, { useState } from 'react'

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Typography, Box, Stack, Link, Collapse, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard } from '@/components/common'
import type { LocationCustom, HoursCustom } from '@/lib/types'

import type { Maybe, LocationInventory } from '@/lib/gql/types'

interface StoreDetailsProps {
  location: LocationCustom
  showProductAndInventory?: boolean
  inventory?: Maybe<LocationInventory>
}

const StoreDetails = (props: StoreDetailsProps) => {
  const { location, showProductAndInventory, inventory } = props
  const { t } = useTranslation('common')
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <Box py={1.5}>
      <Typography variant="h5" fontWeight={600} pb={0.5}>
        {location?.name}
      </Typography>
      <Typography variant="body2">{location?.streetAddress}</Typography>
      <Typography variant="body2">{location?.cityState}</Typography>
      <Typography
        variant="body2"
        color={showProductAndInventory && !inventory ? 'disabled' : 'primary'}
        fontWeight={700}
      >
        {showProductAndInventory
          ? inventory
            ? `${inventory?.stockAvailable} ${t('available')}`
            : t('not-available')
          : t('available-for-pickup')}
      </Typography>

      <Box
        data-testid="collapsible"
        display="flex"
        alignItems="center"
        width="fit-content"
        sx={{ cursor: 'pointer' }}
        pb={0.125}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="body2" align="left" py={1} mr={1} sx={{ textDecoration: 'underline' }}>
          {t('store-info')}
        </Typography>
        {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack direction="row" spacing={2}>
          <Link
            href="#"
            variant="body2"
            color={showProductAndInventory && !inventory ? 'text.disabled' : 'text.primary'}
            fontWeight={600}
          >
            {t('get-directions')}
          </Link>
          <Link
            href="#"
            variant="body2"
            color={showProductAndInventory && !inventory ? 'text.disabled' : 'text.primary'}
            fontWeight={600}
          >
            {location?.phone}
          </Link>
        </Stack>
        <AddressCard {...location?.fullAddress} variant="body2" />

        <Grid item pt={2}>
          <Typography variant="body2" fontWeight={600} component="div">
            {t('store-hours')}
          </Typography>
          {location &&
            location?.hours?.map((hour: HoursCustom) => (
              <Box
                key={hour.day as string}
                py={1}
                sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
              >
                <Typography textTransform={'capitalize'} variant="body2" pr={1}>
                  {hour?.day as string}
                </Typography>
                <Typography variant="body2">{hour?.storeTime}</Typography>
              </Box>
            ))}
        </Grid>
      </Collapse>
    </Box>
  )
}

export default StoreDetails
