import * as React from 'react'
import { useState } from 'react'

import { Global } from '@emotion/react'
import PreviewIcon from '@mui/icons-material/Preview'
import { Fab, InputLabel, TextField, FormControl, Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import router from 'next/router'

import { KiboTextBox } from '@/components/common'
import { useUpdateRoutes } from '@/hooks'
import {
  setPreviewDateCookie,
  setPreviewPriceListCookie,
  getPreviewPriceListCookie,
  getPreviewDateCookie,
} from '@/lib/helpers'

const drawerBleeding = 56

export default function Preview() {
  const [open, setOpen] = useState(false)
  const [enteredPriceList, setEnteredPriceList] = useState<string>(
    getPreviewPriceListCookie() || ''
  )
  const [selectedOrderDate, setSelectedOrderDate] = useState<Dayjs | null>(
    dayjs(getPreviewDateCookie()) || dayjs(Date.now())
  )
  const { changeQueryParam } = useUpdateRoutes()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleChange = () => {
    setPreviewPriceListCookie(enteredPriceList)
    setPreviewDateCookie(dayjs(selectedOrderDate))

    if (enteredPriceList && selectedOrderDate) {
      const updatedQueryParams = {
        ...router?.query,
        mz_pricelist: enteredPriceList,
        mz_now: selectedOrderDate?.format('YYYY-MM-DD') + 'T00:00:00Z',
      }
      changeQueryParam(updatedQueryParams)
    }
  }

  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(30% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '5rem', right: 0 }}>
        <PreviewIcon onClick={toggleDrawer(true)} />
      </Fab>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableBackdropTransition={false}
      >
        <Stack
          sx={{
            p: 2,
            m: 'auto',
            flexDirection: 'row',
            gap: 3,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="previewDate">
                Preview Date
              </InputLabel>
              <DateTimePicker
                disablePast
                openTo="day"
                value={selectedOrderDate || null}
                onChange={(_, value) => {
                  setSelectedOrderDate(dayjs(value))
                  handleChange()
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    sx={{
                      'label + &': {
                        marginTop: 3,
                      },
                      '& .MuiOutlinedInput-root': {
                        fontSize: '0.8rem',
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </LocalizationProvider>
          <KiboTextBox
            label={'Price List'}
            value={enteredPriceList}
            onChange={(_, value) => setEnteredPriceList(value)}
            onBlur={() => {
              handleChange()
            }}
          />
        </Stack>
      </SwipeableDrawer>
    </>
  )
}
