import React from 'react'

import { Skeleton, SkeletonProps } from '@mui/material'

interface SkeletonWrapperProps {
  children: any
  isLoading: boolean
  skeletonProps: SkeletonProps
}
const SkeletonWrapper = (props: SkeletonWrapperProps) => {
  return props.isLoading ? <Skeleton {...props.skeletonProps} /> : props.children
}

export default SkeletonWrapper
