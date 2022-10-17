import React from 'react'

import { Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
function PreviewMode() {
  return (
    <>
      <Typography color="common.white" paddingRight={2}>
        You are in preview mode
      </Typography>
      <Link prefetch={false} href="/api/contentful/disable-preview" passHref>
        <MuiLink
          underline="none"
          component="button"
          variant={'body2'}
          color="common.white"
          sx={{ cursor: 'pointer' }}
        >
          Exit Preview
        </MuiLink>
      </Link>
    </>
  )
}

export default PreviewMode
