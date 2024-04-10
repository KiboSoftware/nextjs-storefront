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
import { useRouter } from 'next/router'

import { KiboTextBox } from '@/components/common'
import { useUpdateRoutes } from '@/hooks'

export default function Preview() {
  const router = useRouter()
  const updatedQueryParams = {
    ...router?.query,
  }
  const [open, setOpen] = useState(true)
  const [enteredPriceList, setEnteredPriceList] = useState<string>('')
  const [selectedOrderDate, setSelectedOrderDate] = useState<Dayjs | null>(dayjs(Date.now()))

  const { changeQueryParam } = useUpdateRoutes()

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const handleChange = async () => {
    if (enteredPriceList) {
      updatedQueryParams['mz_pricelist'] = enteredPriceList
      await fetch(`/api/set-preview-cookie?mz_pricelist=${enteredPriceList}`)
    }

    if (!enteredPriceList) {
      delete updatedQueryParams['mz_pricelist']
      await fetch(`/api/delete-preview-cookie?name=mz_pricelist`)
    }

    if (selectedOrderDate) {
      updatedQueryParams['mz_now'] = selectedOrderDate?.format()
      await fetch(`/api/set-preview-cookie?mz_now=${selectedOrderDate}`)
    }

    if (!selectedOrderDate) {
      delete updatedQueryParams['mz_now']
      await fetch(`/api/delete-preview-cookie?name=mz_now`)
    }

    changeQueryParam(updatedQueryParams)
  }

  const handleClosePreview = async () => {
    await fetch('/api/clear-preview-mode-cookies')

    delete updatedQueryParams['mz_pricelist']
    delete updatedQueryParams['mz_now']
    await changeQueryParam(updatedQueryParams)
    router.reload()
  }

  async function fetchPreviewCookies() {
    try {
      const response = await fetch('/api/get-preview-cookies')
      const data = await response.json()

      if (data) {
        data?.mz_pricelist && setEnteredPriceList(data.mz_pricelist)
        data?.mz_now && setSelectedOrderDate(dayjs(data.mz_now))
      }
    } catch (error) {
      console.error('Error fetching preview cookies:', error)
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }

  React.useEffect(() => {
    fetchPreviewCookies()
  }, [])

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
                    label="Preview Date"
                    disablePast
                    openTo="day"
                    value={selectedOrderDate || null}
                    onChange={(value) => {
                      setSelectedOrderDate(value)
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
                />
              </Box>
              <Box display={'flex'} gap={3} alignItems={'center'}>
                <Button variant="contained" onClick={handleChange}>
                  Apply
                </Button>
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
