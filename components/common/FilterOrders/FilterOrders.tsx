import React, { useState } from 'react'

import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

const styles = {
  filterByButton: {
    textTransform: 'capitalize',
    borderColor: 'grey.900',
    color: '#2b2b2b',
    justifyContent: 'space-between',
    width: '148px',
    minWidth: '148px',
    height: '2.188rem',
  },
}

// dummy implementation
function FilterOrders() {
  const [showFilterBy, setFilterBy] = useState<boolean>(false)
  const { t } = useTranslation('common')

  const handleFilterBy = () => setFilterBy(!showFilterBy)

  return (
    <Button
      variant="outlined"
      endIcon={<Add fontSize="small" />}
      sx={{ ...styles.filterByButton }}
      onClick={handleFilterBy}
    >
      {t('filter-orders')}
    </Button>
  )
}

export default FilterOrders
