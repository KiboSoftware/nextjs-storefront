import { useEffect, useRef, useState } from 'react'

import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import SearchBar from '../SearchBar/SearchBar'
import { LoginDialog } from '@/components/layout'
import { useAuthContext, useModalContext } from '@/context'
import { useCardContactActions, useCurrentLocation } from '@/hooks'
import { userGetters } from '@/lib/getters'
import { getEddZipCodeCookie, setEddZipCodeCookie } from '@/lib/helpers'

import { CustomerContact } from '@/lib/gql/types'

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
  const { showModal } = useModalContext()
  const isGuest = !user?.id

  const { contacts } = useCardContactActions(user?.id as number)

  const [_zipCodeLocalState, setZipCodeLocalState] = useState('')
  const [isShowZipInput, setIsShowZipInput] = useState<boolean>()

  const handleSetZipCode = (value: string) => {
    setZipCodeLocalState(value)
  }

  const setZipCode = (zip: string) => {
    setZipCodeLocalState(zip)
    setEddZipCodeCookieValue(zip)
  }

  const setEddZipCodeCookieValue = (value: string) => {
    setEddZipCodeCookie(value)
    if (onZipCodeChange) {
      onZipCodeChange(value)
    }
  }

  const handleSignIn = () => {
    showModal({ Component: LoginDialog })
    setIsShowZipInput(false)
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
        setZipCode(zipCode as string)
      } catch (error) {
        console.error('Error fetching current location:', error)
        // if browser location is not available, use default zip code from config
        const zipCode = config?.publicRuntimeConfig?.defaultEddLocationZipCode
        setZipCode(zipCode as string)
      }
    }

    const latestZipCodeApplied = getEddZipCodeCookie()

    if (!zipResolvedRef.current) {
      getCurrentLocationZipCode()
    }

    if (latestZipCodeApplied && !zipResolvedRef.current) {
      zipResolvedRef.current = true
      setZipCode(latestZipCodeApplied)
    }

    if (!latestZipCodeApplied && !zipResolvedRef.current) {
      setEddZipCodeCookieValue(config?.publicRuntimeConfig?.defaultEddLocationZipCode)
    }

    return () => {
      isComponentUnmounted = true
    }
  }, [])

  useEffect(() => {
    let isComponentUnmounted = false

    if (user && user.id && contacts?.items && contacts.items.length > 0) {
      const shippingAddresses =
        userGetters.getUserShippingAddress(contacts?.items as CustomerContact[]) ?? []

      if (shippingAddresses.length > 0) {
        zipResolvedRef.current = true
        const zip = shippingAddresses[0]?.address?.postalOrZipCode as string
        setZipCode(zip)
        setIsShowZipInput(false)
      }
    }

    return () => {
      isComponentUnmounted = true
    }
  }, [user?.id, JSON.stringify(contacts.items)])

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
            <Button size="small" variant="outlined" onClick={() => handleSignIn()}>
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
            {`Delivering to ${_zipCodeLocalState} - Update Location`}
          </Link>
        </Stack>
      )
    }
  }

  return <Box pb={2}>{Template()}</Box>
}

export default ExpectedDeliveryDate
