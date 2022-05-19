import styled from '@emotion/styled'
import { Button } from '@mui/material'
const StyledButton = styled.button`
  padding: 32px;
`
const AddToCart = (props: any) => {
  return (
    <>
      <Button color="primary">Test</Button>
      <StyledButton color="primary">AddToCartt</StyledButton>
    </>
  )
}

export default AddToCart
