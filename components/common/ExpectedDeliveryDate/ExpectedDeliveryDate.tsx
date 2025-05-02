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
  }, [])

  // After mount: if user logs in on current page, override with address zip
  useEffect(() => {
    const didLogin = user?.id && prevUserIdRef.current !== user?.id

    if (hasMountedRef.current && didLogin && contacts?.items && contacts?.items?.length > 0) {
      const shippingAddresses = userGetters.getUserShippingAddress(
        contacts.items as CustomerContact[]
      )
      if (shippingAddresses && shippingAddresses?.length > 0) {
        const zip = shippingAddresses[0]?.address?.postalOrZipCode
        if (zip) {
          setZip(zip)
        }
      }
    }

    prevUserIdRef.current = user?.id ?? null
  }, [user?.id, JSON.stringify(contacts.items)])

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
