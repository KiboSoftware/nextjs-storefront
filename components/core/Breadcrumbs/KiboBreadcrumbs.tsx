import React from 'react'

import { Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'

import { BreadCrumb as BreadCrumbType } from '@/lib/types'

interface BreadcrumbsProps {
  breadcrumbs: BreadCrumbType[]
  separator?: string
}

export default function KiboBreadcrumbs({
  breadcrumbs,
  separator = '|',
  ...rest
}: BreadcrumbsProps) {
  return (
    <div role="presentation">
      <Breadcrumbs separator={separator} {...rest}>
        {breadcrumbs?.map((item: BreadCrumbType, index) => {
          return (
            <Link href={item.link as string} key={index} passHref>
              <Typography variant="body2" color="text.primary" aria-label="breadcrumb-link">
                {item.text}
              </Typography>
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
