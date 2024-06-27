import { useState } from 'react'

import {
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

import { useGetDeliveryWindow } from '@/hooks'
import {
  Delivery,
  DeliveryWindowsProps,
  DropoffTime,
  InstantDelivery,
  Notification,
  Store,
  Window,
} from '@/lib/types'

const commonStyles = {
  padding: 1,
  cursor: 'pointer',
}

const commonTabStyles = {
  ...commonStyles,
  border: '1px solid grey',
}

function formatDropoffTime(dropoffTime: DropoffTime, timeZone: string): string {
  const startTime = new Date(dropoffTime.startsAt)
  const endTime = new Date(dropoffTime.endsAt)

  const formattedStartTime = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone,
  })
  const formattedEndTime = endTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone,
  })

  return `${formattedStartTime} - ${formattedEndTime}`
}

function getDropoffTimesByDate(deliveries: Delivery[], date: string): Window[] | null {
  if (!deliveries) return null

  const window: Window[] = []
  deliveries.forEach((delivery: Delivery) => {
    if (delivery.date === date) {
      delivery.windows.forEach((deliveryWindow: DeliveryWindowsProps) => {
        const readable = formatDropoffTime(deliveryWindow.dropoffTime, deliveryWindow?.tz)

        window.push({
          pickupTime: deliveryWindow.pickupTime,
          dropoffTime: deliveryWindow.dropoffTime,
          readable,
          tz: deliveryWindow.tz,
        })
      })
    }
  })
  return window.length > 0 ? window : null
}

function checkDWAvailability(storeBoundary: string[] | undefined | null, deliveryResponse: any) {
  if (!storeBoundary || !deliveryResponse) return null

  for (const storeId of storeBoundary) {
    const store = deliveryResponse.data.find((store: Store) => store.storeExternalId === storeId)
    if (store && store.delivery.length > 0) {
      return { storeId, delivery: store.delivery }
    }
  }
  return null
}

const getDate = () => {
  const today = dayjs()
  const todayMMDDYYYY = dayjs(today).format('MM/DD/YYYY')
  const todayYYYYMMDD = dayjs(today).format('YYYY-MM-DD')
  const tomorrowMMDDYYYY = dayjs(today.add(1, 'day')).format('MM/DD/YYYY')
  const tomorrowYYYYMMDD = dayjs(today.add(1, 'day')).format('YYYY-MM-DD')
  const dayAfterTomorrowMMDDYYYY = dayjs(today.add(2, 'day')).format('MM/DD/YYYY')

  return {
    todayMMDDYYYY,
    todayYYYYMMDD,
    tomorrowMMDDYYYY,
    tomorrowYYYYMMDD,
    dayAfterTomorrowMMDDYYYY,
  }
}

interface DeliveryWindowProps {
  instantDelivery?: InstantDelivery
  setInstantDelivery: (instantDelivery: InstantDelivery) => void
  confirmInstantDelivery: () => void
}

export const DeliveryWindow = ({
  instantDelivery,
  setInstantDelivery,
  confirmInstantDelivery,
}: DeliveryWindowProps) => {
  const { t } = useTranslation('common')
  const {
    todayMMDDYYYY,
    todayYYYYMMDD,
    tomorrowMMDDYYYY,
    tomorrowYYYYMMDD,
    dayAfterTomorrowMMDDYYYY,
  } = getDate()

  const initialSelectedDate = instantDelivery?.window?.confirmedDate || todayMMDDYYYY

  const [selectedDate, setSelectedDate] = useState<string | undefined | null>(initialSelectedDate)

  const parsedSelectedDate = dayjs(selectedDate, 'MM/DD/YYYY')
  const isToday = parsedSelectedDate.isSame(todayMMDDYYYY, 'day')
  const isTomorrow = parsedSelectedDate.isSame(tomorrowMMDDYYYY, 'day')
  const isOtherDay = !isToday && !isTomorrow

  const storeBoundaryList = instantDelivery?.storeBoundary

  // Today and Tomorrow
  const { data: dwResponse, isLoading: dwIsLoading } = useGetDeliveryWindow(storeBoundaryList)

  const stores = checkDWAvailability(storeBoundaryList, dwResponse)
  const todayDropoffs = getDropoffTimesByDate(stores?.delivery, todayYYYYMMDD)
  const tomorrowDropoffs = getDropoffTimesByDate(stores?.delivery, tomorrowYYYYMMDD)

  // Another Date
  const otherDateYYYYMMDD = dayjs(selectedDate).format('YYYY-MM-DD')
  const { data: dwByAnotherDateResponse, isLoading: dwByAnotherDateIsLoading } =
    useGetDeliveryWindow(storeBoundaryList, otherDateYYYYMMDD)

  const storeByAnotherDate = checkDWAvailability(storeBoundaryList, dwByAnotherDateResponse)
  const otherDateDropoffs = getDropoffTimesByDate(storeByAnotherDate?.delivery, otherDateYYYYMMDD)

  // Functions
  const handleTabChange = (date: string) => {
    setSelectedDate(date)
    setInstantDelivery({ ...instantDelivery, window: undefined })
  }

  const handleDeliveryWindowClick = (window: Window) => {
    setInstantDelivery({
      ...instantDelivery,
      window: {
        confirmedStoreId: stores?.storeId as string,
        confirmedDate: selectedDate as string,
        confirmedWindow: window,
      },
    })
  }

  const confirmDeliveryWindow = () => {
    confirmInstantDelivery()
  }

  const error = (() => {
    if (!selectedDate) return { isError: true, message: t('order-date-is-required') }

    if (!dayjs(selectedDate, 'MM/DD/YYYY').isValid())
      return { isError: true, message: t('date-must-be-valid') }

    if (dayjs().add(1, 'day').isAfter(selectedDate, 'day'))
      return { isError: true, message: t('date-must-be-in-the-future') }

    return { isError: false, message: t('enter-date-in-format') }
  })()

  const handleNotification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as string
    const checked = event.target.checked as boolean

    setInstantDelivery({
      ...instantDelivery,
      notification: {
        ...(instantDelivery?.notification as Notification),
        [name]: checked,
      },
    })
  }

  const readable = instantDelivery?.window?.confirmedWindow?.readable

  return (
    <Stack gap={2}>
      <Typography sx={{ fontWeight: 'bold' }}>
        {readable ? t('selected-delivery-window', { readable }) : t('select-delivery-window')}
      </Typography>

      <Stack direction="row" gap={1}>
        <Box
          onClick={() => handleTabChange(todayMMDDYYYY)}
          sx={{
            ...commonTabStyles,
            backgroundColor: isToday ? 'lightgray' : 'white',
            padding: 1,
          }}
        >
          <Typography>{t('today')}</Typography>
        </Box>
        <Box
          onClick={() => handleTabChange(tomorrowMMDDYYYY)}
          sx={{
            ...commonTabStyles,
            backgroundColor: isTomorrow ? 'lightgray' : 'white',
            padding: 1,
          }}
        >
          <Typography>{t('tomorrow')}</Typography>
        </Box>
        <Box
          onClick={() => handleTabChange(dayAfterTomorrowMMDDYYYY)}
          sx={{
            ...commonTabStyles,
            backgroundColor: isOtherDay ? 'lightgray' : 'white',
            padding: 1,
          }}
        >
          <Typography>{t('pickup-another-date')}</Typography>
        </Box>
      </Stack>
      {isToday && (
        <Stack>
          {todayDropoffs?.map((dropoffTime: Window) => (
            <Box
              key={dropoffTime.readable}
              sx={{
                ...commonStyles,
                backgroundColor: readable === dropoffTime.readable ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime.readable}
            </Box>
          ))}

          {dwIsLoading && <Typography>{t('loading')}</Typography>}

          {!dwIsLoading && !todayDropoffs && <Typography>{t('no-delivery-available')}</Typography>}
        </Stack>
      )}
      {isTomorrow && (
        <Stack>
          {tomorrowDropoffs?.map((dropoffTime) => (
            <Box
              key={dropoffTime.readable}
              sx={{
                ...commonStyles,
                backgroundColor: readable === dropoffTime.readable ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime.readable}
            </Box>
          ))}

          {dwIsLoading && <Typography>{t('loading')}</Typography>}

          {!dwIsLoading && !tomorrowDropoffs && (
            <Typography>{t('no-delivery-available')}</Typography>
          )}
        </Stack>
      )}
      {isOtherDay && (
        <Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('select-a-future-date')}
              disablePast
              openTo="year"
              views={['day']}
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(dayjs(newValue).format('MM/DD/YYYY'))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={error.isError}
                  helperText={error.message}
                  size="small"
                />
              )}
            />
          </LocalizationProvider>

          {otherDateDropoffs?.map((dropoffTime) => (
            <Box
              key={dropoffTime.readable}
              sx={{
                ...commonStyles,
                backgroundColor: readable === dropoffTime.readable ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime.readable}
            </Box>
          ))}

          {dwByAnotherDateIsLoading && <Typography>{t('loading')}</Typography>}

          {!dwByAnotherDateIsLoading && !otherDateDropoffs && (
            <Typography>{t('no-delivery-available')}</Typography>
          )}
        </Stack>
      )}

      <Stack direction="row" gap={1}>
        <FormControlLabel
          sx={{
            width: '100%',
            paddingLeft: '0.5rem',
          }}
          control={
            <Checkbox
              data-testid="isSendSMS"
              name="isSendSMS"
              checked={instantDelivery?.notification?.isSendSMS}
              onChange={handleNotification}
            />
          }
          label={`${t('send-me-sms-updates')}`}
        />
        <FormControlLabel
          sx={{
            width: '100%',
            paddingLeft: '0.5rem',
          }}
          control={
            <Checkbox
              data-testid="isSendEmail"
              name="isSendEmail"
              checked={instantDelivery?.notification?.isSendEmail}
              onChange={handleNotification}
            />
          }
          label={`${t('send-me-email-updates')}`}
        />
      </Stack>

      <Button
        variant="contained"
        color="inherit"
        type="submit"
        disabled={!readable}
        onClick={confirmDeliveryWindow}
      >
        {t('confirm-delivery-window')}
      </Button>
    </Stack>
  )
}
