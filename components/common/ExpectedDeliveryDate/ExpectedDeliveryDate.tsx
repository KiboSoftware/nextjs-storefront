import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import SearchBar from '../SearchBar/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { useCardContactActions, useCurrentLocation } from '@/hooks'
import { useTranslation } from 'next-i18next'
import { useAuthContext } from '@/context'
import { CustomerContact } from '@/lib/gql/types'
import { userGetters } from '@/lib/getters'
import { getEddZipCodeCookie, setEddZipCodeCookie } from '@/lib/helpers'
import getConfig from 'next/config'

interface ExpectedDeliveryDateProps {
  showZipInputOnly?: boolean
  onZipCodeChange?: (zipCode: string) => void
}

const ExpectedDeliveryDate = ({
  showZipInputOnly = false,
  onZipCodeChange,
}: ExpectedDeliveryDateProps) => {
  const { getCurrentLocation } = useCurrentLocation()
  const { t } = useTranslation('common')
  const config = getConfig()

  const { user } = useAuthContext()
  const isGuest = !user?.id

  const { contacts } = useCardContactActions(user?.id as number)
  const contactsItems = contacts?.items ?? []

  const [_zipCodeLocalState, setZipCodeLocalState] = useState('')
  const [isShowZipInput, setIsShowZipInput] = useState<boolean>()

  const handleSetZipCode = (value: string) => {
    setZipCodeLocalState(value)
  }

  const setEddZipCodeCookieValue = (value: string) => {
    setEddZipCodeCookie(value)
    if (onZipCodeChange) {
      onZipCodeChange(value)
    }
  }

  const zipResolvedRef = useRef(false)

  useEffect(() => {
    let isComponentUnmounted = false

    const getCurrentLocationZipCode = async () => {
      try {
        let { zipCode } = await getCurrentLocation(true)
        if (isComponentUnmounted) return
        // if browser location is not available, use default zip code from config
        if (!zipCode) {
          zipCode = config?.publicRuntimeConfig?.defaultEddLocationZipCode
        }
        setZipCodeLocalState(zipCode as string)
        setEddZipCodeCookieValue(zipCode as string)
      } catch (error) {
        console.error('Error fetching current location:', error)
        // if browser location is not available, use default zip code from config
        const zipCode = config?.publicRuntimeConfig?.defaultEddLocationZipCode
        setZipCodeLocalState(zipCode as string)
        setEddZipCodeCookieValue(zipCode as string)
      }
    }

    const latestZipCodeApplied = getEddZipCodeCookie()

    if (latestZipCodeApplied && !zipResolvedRef.current) {
      zipResolvedRef.current = true
      setZipCodeLocalState(latestZipCodeApplied)
    }

    if (user && user.id && contacts?.items && contacts.items.length > 0) {
      const shippingAddresses =
        userGetters.getUserShippingAddress(contacts?.items as CustomerContact[]) ?? []

      if (shippingAddresses.length > 0 && !zipResolvedRef.current) {
        zipResolvedRef.current = true
        const zip = shippingAddresses[0]?.address?.postalOrZipCode as string
        setZipCodeLocalState(zip)
        setEddZipCodeCookieValue(zip)
        setIsShowZipInput(false)
      }
    }

    if (!zipResolvedRef.current) {
      getCurrentLocationZipCode()
    }

    return () => {
      isComponentUnmounted = true
    }
  }, [user?.id, contactsItems])

  const Template = () => {
    if (showZipInputOnly) {
      return (
        <SearchBar
          searchTerm={_zipCodeLocalState as string}
          onSearch={handleSetZipCode}
          onKeyEnter={setEddZipCodeCookieValue}
          endAdornment={
            <Button variant="text" size="small">
              Check
            </Button>
          }
        />
      )
    } else if (isShowZipInput) {
      return (
        <Box pt={2} display={'flex'} flexDirection={'column'} gap={2} width={'100%'}>
          {isGuest && (
            <Button size="small" variant="outlined" onClick={() => setIsShowZipInput(false)}>
              Sign in to see your addresses
            </Button>
          )}
          {isGuest && (
            <Divider orientation="horizontal">
              <Typography variant="body2" color="text.secondary">
                or enter a zipcode
              </Typography>
            </Divider>
          )}
          <SearchBar
            searchTerm={_zipCodeLocalState as string}
            onSearch={handleSetZipCode}
            onKeyEnter={setEddZipCodeCookieValue}
            endAdornment={
              <Button variant="text" size="small">
                Check
              </Button>
            }
          />
        </Box>
      )
    } else {
      return (
        <Stack alignItems={'baseline'}>
          <Link
            component="button"
            variant="body2"
            color="text.primary"
            onClick={() => setIsShowZipInput(true)}
          >
            Update Location
          </Link>
        </Stack>
      )
    }
  }

  return <Box pb={2}>{Template()}</Box>
}

export default ExpectedDeliveryDate
