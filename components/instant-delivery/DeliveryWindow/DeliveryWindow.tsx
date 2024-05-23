import { useEffect, useState } from 'react'

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

interface DeliveryWindow {
  message: string
  data: Store[]
}

interface Store {
  storeExternalId: string
  timeZone: string
  tags: string[]
  delivery: Delivery[]
}

interface Delivery {
  category: string
  pickAndPack: number
  date: string
  windows: DeliveryWindow[]
}

interface DropoffTime {
  startsAt: number
  endsAt: number
}
interface DeliveryWindow {
  pickupTime: {
    startsAt: number
  }
  dropoffTime: DropoffTime
  tz: string
  windowId: null | string
  provider: null | string
}

export type DeliveryDateAndWindow =
  | {
      confirmedDate: string
      confirmedWindow: Window
      confirmedStoreId: string
    }
  | undefined

const commonStyles = {
  padding: 1,
  cursor: 'pointer',
}

const commonTabStyles = {
  ...commonStyles,
  border: '1px solid grey',
}

function formatDropoffTime(dropoffTime: DropoffTime): string {
  const startTime = new Date(dropoffTime.startsAt)
  const endTime = new Date(dropoffTime.endsAt)

  const formattedStartTime = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const formattedEndTime = endTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return `${formattedStartTime} - ${formattedEndTime}`
}

function getDropoffTimesByDate(deliveries: Delivery[], date: string): Window[] | null {
  if (!deliveries) return null

  const window: Window[] = []
  deliveries.forEach((delivery: Delivery) => {
    if (delivery.date === date) {
      delivery.windows.forEach((deliveryWindow: DeliveryWindow) => {
        const readable = formatDropoffTime(deliveryWindow.dropoffTime)

        window.push({
          pickupTime: deliveryWindow.pickupTime,
          dropoffTime: deliveryWindow.dropoffTime,
          readable,
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

type Window = {
  pickupTime: { startsAt: number; endsAt?: number }
  dropoffTime: { startsAt: number; endsAt: number }
  readable: string
}
type InstantDelivery = {
  address?:
    | {
        firstName: string
        lastName: string
        phoneNumber: string
        street: string
        city: string
        country: string
        state: string
        zipcode: string
      }
    | undefined
  storeBoundary?: string[] | undefined | null
  window?:
    | {
        confirmedDate: string
        confirmedWindow: Window
        confirmedStoreId: string
      }
    | undefined
  notification?: { isSendSMS: boolean; isSendEmail: boolean }
}

type DeliveryWindowProps = {
  instantDelivery?: InstantDelivery
  setInstantDelivery: (instantDelivery: InstantDelivery) => void
}

export const DeliveryWindow = ({ instantDelivery, setInstantDelivery }: DeliveryWindowProps) => {
  const { t } = useTranslation('common')
  const {
    todayMMDDYYYY,
    todayYYYYMMDD,
    tomorrowMMDDYYYY,
    tomorrowYYYYMMDD,
    dayAfterTomorrowMMDDYYYY,
  } = getDate()

  const initialNotification = (instantDelivery?.notification && instantDelivery?.notification) || {
    isSendSMS: false,
    isSendEmail: false,
  }

  const initialSelectedDate = instantDelivery?.window?.confirmedDate || todayMMDDYYYY
  const initialSelectedWindow = instantDelivery?.window?.confirmedWindow

  const [selectedDate, setSelectedDate] = useState<string | undefined | null>(initialSelectedDate)
  const [selectedWindow, setSelectedWindow] = useState<Window | undefined>(undefined)
  const [notification, setNotification] = useState(initialNotification)

  const parsedSelectedDate = dayjs(selectedDate, 'MM/DD/YYYY')
  const isToday = parsedSelectedDate.isSame(todayMMDDYYYY, 'day')
  const isTomorrow = parsedSelectedDate.isSame(tomorrowMMDDYYYY, 'day')
  const isOtherDay = !isToday && !isTomorrow

  // Remove this line later
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
    setSelectedWindow(undefined)
    setInstantDelivery({ ...instantDelivery, window: undefined })
  }

  const handleDeliveryWindowClick = (window: Window) => {
    setSelectedWindow(window)
  }

  const confirmDeliveryWindow = () => {
    if (selectedDate && selectedWindow) {
      setInstantDelivery({
        ...instantDelivery,
        window: {
          confirmedStoreId: stores?.storeId as string,
          confirmedDate: selectedDate as string,
          confirmedWindow: selectedWindow,
        },
        notification: notification,
      })
    }
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

    setNotification((prevState: { isSendSMS: boolean; isSendEmail: boolean }) => {
      return {
        ...prevState,
        [name]: checked,
      }
    })
  }

  const readable = selectedWindow?.readable

  // To set default window
  useEffect(() => {
    if (todayDropoffs || tomorrowDropoffs || otherDateYYYYMMDD) {
      if (initialSelectedWindow) setSelectedWindow(initialSelectedWindow)
    }
  }, [dwResponse])

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
                backgroundColor:
                  selectedWindow?.readable === dropoffTime.readable ? 'grey.200' : 'white',
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
                backgroundColor:
                  selectedWindow?.readable === dropoffTime.readable ? 'grey.200' : 'white',
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
                backgroundColor:
                  selectedWindow?.readable === dropoffTime.readable ? 'grey.200' : 'white',
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
              checked={notification?.isSendSMS}
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
              checked={notification?.isSendEmail}
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
        disabled={!selectedWindow}
        onClick={confirmDeliveryWindow}
      >
        {t('confirm-delivery-window')}
      </Button>
    </Stack>
  )
}
