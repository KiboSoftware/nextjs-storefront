import { Box } from '@mui/system'

const FlexBox = ({ children, ...props }: any) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
)

FlexBox.defaultProps = {
  display: 'flex',
}
export default FlexBox
