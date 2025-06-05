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
  // Only call the hook when we have a valid user ID
  const { contacts } = useCardContactActions(user?.id ? user.id : 0)

  console.log('Component render:', {
    userId: user?.id,
    isGuest,
    contactsData: contacts,
    contactsItems: contacts?.items?.length,
  })

  const [_zipCodeLocalState, setZipCodeLocalState] = useState('')
  const [isShowZipInput, setIsShowZipInput] = useState<boolean>()
  const hasMountedRef = useRef(false)
  const prevUserIdRef = useRef<number | null>(null)

  const setZip = (zip: string) => {
    setZipCodeLocalState(zip)
    setEddZipCodeCookie(zip)
    onZipCodeChange?.(zip)
  }

  // On first mount: use cookie > location > default
  useEffect(() => {
    const initZipCode = async () => {
      const cookieZip = getEddZipCodeCookie()
      if (cookieZip) {
        setZipCodeLocalState(cookieZip)
        onZipCodeChange?.(cookieZip)
        return
      }

      try {
        let { zipCode } = await getCurrentLocation(true)
        if (!zipCode) {
          zipCode = config?.publicRuntimeConfig?.defaultEddLocationZipCode
        }
        setZip(zipCode as string)
      } catch (e) {
        console.error('Geolocation error:', e)
        const fallback = config?.publicRuntimeConfig?.defaultEddLocationZipCode
        setZip(fallback)
      }
    }

    initZipCode()
    hasMountedRef.current = true
    prevUserIdRef.current = user?.id ?? null
  }, []) // After mount: if user logs in on current page, override with address zip
  // useEffect(() => {
  //   console.log('UseEffect triggered:', {
  //     userId: user?.id,
  //     prevUserId: prevUserIdRef.current,
  //     contactsItems: contacts?.items?.length,
  //     hasMounted: hasMountedRef.current
  //   })

  //   const didLogin = user?.id && prevUserIdRef.current !== user?.id

  //   if (hasMountedRef.current && didLogin && contacts?.items && contacts?.items?.length > 0) {
  //     console.log('User logged in, updating zip from contacts')
  //     const shippingAddresses = userGetters.getUserShippingAddress(
  //       contacts.items as CustomerContact[]
  //     )
  //     if (shippingAddresses && shippingAddresses?.length > 0) {
  //       const zip = shippingAddresses[0]?.address?.postalOrZipCode
  //       console.log('Found shipping address zip:', zip)
  //       if (zip) {
  //         setZip(zip)
  //       }
  //     }
  //   }    prevUserIdRef.current = user?.id ?? null
  // }, [user?.id, contacts?.items])

  // Additional effect to handle when contacts data becomes available after login
  useEffect(() => {
    if (user?.id && contacts?.items && contacts?.items?.length > 0 && hasMountedRef.current) {
      console.log('Contacts data available for logged in user')
      const shippingAddresses = userGetters.getUserShippingAddress(
        contacts.items as CustomerContact[]
      )
      if (shippingAddresses && shippingAddresses?.length > 0) {
        const zip = shippingAddresses[0]?.address?.postalOrZipCode
        console.log('Setting zip from contacts effect:', zip)
        if (zip && zip !== _zipCodeLocalState) {
          setZip(zip)
        }
      }
    }
  }, [contacts?.items, user?.id, _zipCodeLocalState])

  const handleSignIn = () => {
    showModal({ Component: LoginDialog })
    setIsShowZipInput(false)
  }

  const Template = () => {
    if (showZipInputOnly) {
      return (
        <SearchBar
          searchTerm={_zipCodeLocalState}
          onSearch={setZipCodeLocalState}
          onKeyEnter={setZip}
          endAdornment={
            <Button variant="text" size="small" onClick={() => setZip(_zipCodeLocalState)}>
              {t('check')}
            </Button>
          }
        />
      )
    } else if (isShowZipInput) {
      return (
        <Box pt={2} display="flex" flexDirection="column" gap={2} width="100%">
          {isGuest && (
            <>
              <Button size="small" variant="outlined" onClick={handleSignIn}>
                {t('sign-in-to-see-your-addresses')}
              </Button>
              <Divider orientation="horizontal">
                <Typography variant="body2" color="text.secondary">
                  {t('or-enter-a-zip-code')}
                </Typography>
              </Divider>
            </>
          )}
          <SearchBar
            searchTerm={_zipCodeLocalState}
            onSearch={setZipCodeLocalState}
            onKeyEnter={setZip}
            endAdornment={
              <Button variant="text" size="small" onClick={() => setZip(_zipCodeLocalState)}>
                {t('check')}
              </Button>
            }
          />
        </Box>
      )
    } else {
      return (
        <Stack alignItems="baseline">
          <Link
            component="button"
            variant="body2"
            color="text.primary"
            onClick={() => setIsShowZipInput(true)}
          >
            {t('update-location', { zipCode: _zipCodeLocalState })}
          </Link>
        </Stack>
      )
    }
  }

  return <Box pb={2}>{Template()}</Box>
}

export default ExpectedDeliveryDate
