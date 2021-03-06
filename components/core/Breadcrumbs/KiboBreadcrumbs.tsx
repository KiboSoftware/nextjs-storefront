import React from 'react'

import { Link } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'

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
      <Breadcrumbs aria-label="breadcrumb" separator={separator} {...rest}>
        {breadcrumbs?.map((item: BreadCrumbType, index) => {
          return (
            <Link
              underline="hover"
              variant="caption"
              color="text.primary"
              href={item.link as string}
              key={index}
              sx={{
                typography: {
                  sm: 'body2',
                },
              }}
            >
              {item.text}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
