import * as React from 'react'
import { useState } from 'react'

import PreviewIcon from '@mui/icons-material/Preview'
import {
  Fab,
  InputLabel,
  TextField,
  FormControl,
  ClickAwayListener,
  Paper,
  Box,
  Button,
} from '@mui/material'
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

export default function Preview() {
  const [open, setOpen] = useState(false)
  const [enteredPriceList, setEnteredPriceList] = useState<string>(
    getPreviewPriceListCookie() || ''
  )
  const [selectedOrderDate, setSelectedOrderDate] = useState<Dayjs | null>(
    dayjs(getPreviewDateCookie()) || dayjs(Date.now())
  )
  const { changeQueryParam } = useUpdateRoutes()

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
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

  const handleClosePreview = async () => {
    await fetch('/api/clear-preview-mode-cookies')
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: '7rem', right: '1rem' }}
        >
          <PreviewIcon onClick={handleClick} />
        </Fab>
        {open ? (
          <Paper
            elevation={2}
            sx={{
              p: 4,
              position: 'sticky',
              bottom: 0,
              boxShadow: '-2px -5px 24px 7px rgba(0,0,0,0.17)',
            }}
          >
            <Box display="flex" gap={3} m="auto" justifyContent={'center'}>
              <FormControl variant="standard">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel shrink htmlFor="previewDate">
                    Preview Date
                  </InputLabel>
                  <DateTimePicker
                    disablePast
                    openTo="day"
                    toolbarPlaceholder="Now"
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
                </LocalizationProvider>
              </FormControl>
              <Box>
                <KiboTextBox
                  label={'Price List'}
                  value={enteredPriceList}
                  onChange={(_, value) => setEnteredPriceList(value)}
                  onBlur={() => {
                    handleChange()
                  }}
                />
              </Box>
              <Box display={'flex'} gap={3} alignItems={'center'}>
                <Button variant="contained">Apply</Button>
                <Button variant="contained" color="secondary" onClick={handleClosePreview}>
                  Close Preview
                </Button>
              </Box>
            </Box>
          </Paper>
        ) : null}
      </>
    </ClickAwayListener>
  )
}
