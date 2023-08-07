import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { KiboPaginationStyles } from './KiboPagination.styles'
import { CategorySearchParams } from '@/lib/types'

interface KiboPaginationProps {
  count: number
  pageSize: number
  startIndex: number
  onPaginationChange: (params: CategorySearchParams) => void
}

export default function KiboPagination(props: KiboPaginationProps) {
  const { count, startIndex, pageSize, onPaginationChange } = props
  const currentPage = parseInt((startIndex / pageSize).toString()) + 1 || 1

  return (
    <Stack spacing={2}>
      <Pagination
        size="small"
        count={count}
        page={currentPage}
        shape="rounded"
        variant="text"
        sx={KiboPaginationStyles}
        onChange={(e, page) =>
          onPaginationChange({
            pageSize,
            startIndex: pageSize * (page - 1),
          })
        }
      />
    </Stack>
  )
}
