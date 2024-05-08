import { useState } from 'react'

import { Typography, Button, Box, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

import { KiboRadio } from '@/components/common'
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

interface DeliveryWindow {
  pickupTime: {
    startsAt: number
  }
  dropoffTime: {
    startsAt: number
    endsAt: number
  }
  tz: string
  windowId: null | string
  provider: null | string
}

export type DeliveryDateAndWindow =
  | {
      confirmedDate: string
      confirmedWindow: string
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

type Props = {
  storeBoundary: string[] | undefined | null
  setDeliveryDateAndWindow: (selectedDateAndWindow: DeliveryDateAndWindow) => void
}

type DropOffTimeByDate = [] | { original: DeliveryWindow; readable: string }[] | null

function formatDropoffTime(dropoffTime: DeliveryWindow): string {
  const startTime = new Date(dropoffTime.pickupTime.startsAt)
  const endTime = new Date(dropoffTime.dropoffTime.endsAt)

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

function getDropoffTimesByDate(deliveries: Delivery[], date: string) {
  if (!deliveries) return null

  const dropoffTimes: string[] = []
  deliveries.forEach((delivery: Delivery) => {
    if (delivery.date === date) {
      delivery.windows.forEach((window: DeliveryWindow) => {
        const readable = formatDropoffTime(window)
        dropoffTimes.push(readable)
      })
    }
  })
  return dropoffTimes.length > 0 ? dropoffTimes : null
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

export const DeliveryWindow = ({ storeBoundary, setDeliveryDateAndWindow }: Props) => {
  const { t } = useTranslation('common')
  const {
    todayMMDDYYYY,
    todayYYYYMMDD,
    tomorrowMMDDYYYY,
    tomorrowYYYYMMDD,
    dayAfterTomorrowMMDDYYYY,
  } = getDate()

  const [selectedDate, setSelectedDate] = useState<string | undefined | null>(todayMMDDYYYY)
  const [selectedWindow, setSelectedWindow] = useState<string | undefined>(undefined)

  const parsedSelectedDate = dayjs(selectedDate, 'MM/DD/YYYY')
  const isToday = parsedSelectedDate.isSame(todayMMDDYYYY, 'day')
  const isTomorrow = parsedSelectedDate.isSame(tomorrowMMDDYYYY, 'day')
  const isOtherDay = !isToday && !isTomorrow

  // Remove this line later
  const storeBoundaryList = storeBoundary && [...storeBoundary, '001']

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
    setDeliveryDateAndWindow(undefined)
  }

  const handleDeliveryWindowClick = (window: string) => {
    setSelectedWindow(window)
  }

  const confirmDeliveryWindow = () => {
    if (selectedDate && selectedWindow) {
      setDeliveryDateAndWindow({
        confirmedDate: selectedDate as string,
        confirmedWindow: selectedWindow,
        confirmedStoreId: stores?.storeId as string,
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

  return (
    <Stack gap={2}>
      <Typography sx={{ fontWeight: 'bold' }}>
        {selectedWindow
          ? t('selected-delivery-window', { selectedWindow })
          : t('select-delivery-window')}
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
          {todayDropoffs?.map((dropoffTime) => (
            <Box
              key={dropoffTime}
              sx={{
                ...commonStyles,
                backgroundColor: selectedWindow === dropoffTime ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime}
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
              key={dropoffTime}
              sx={{
                ...commonStyles,
                backgroundColor: selectedWindow === dropoffTime ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime}
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
              key={dropoffTime}
              sx={{
                ...commonStyles,
                backgroundColor: selectedWindow === dropoffTime ? 'grey.200' : 'white',
              }}
              onClick={() => handleDeliveryWindowClick(dropoffTime)}
            >
              {dropoffTime}
            </Box>
          ))}

          {dwByAnotherDateIsLoading && <Typography>{t('loading')}</Typography>}

          {!dwByAnotherDateIsLoading && !otherDateDropoffs && (
            <Typography>{t('no-delivery-available')}</Typography>
          )}
        </Stack>
      )}
      <div>{t('instant-delivery-warning-message')}</div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!selectedWindow}
        onClick={confirmDeliveryWindow}
      >
        {t('confirm-delivery-window')}
      </Button>
    </Stack>
  )
}
