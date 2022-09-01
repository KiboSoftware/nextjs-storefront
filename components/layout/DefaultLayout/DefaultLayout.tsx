import React, { ReactElement } from 'react'

import { Container } from '@mui/material'

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return <Container maxWidth={'xl'}>{children}</Container>
}

export default DefaultLayout
