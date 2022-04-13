import { Box, CardActions, Link as MuiLink } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const styles = {
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    pl: 1,
    pb: 0,
  },
  cardAction: {
    p: 0,
  },
  link: {
    pr: 2,
  },
}

const CartItemActions = () => {
  const { t } = useTranslation('cart-page')

  return (
    <Box sx={styles.linkContainer}>
      <CardActions sx={styles.cardAction}>
        <Link href="#" passHref>
          <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
            {t('edit')}
          </MuiLink>
        </Link>
        <Link href="#" passHref>
          <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
            {t('save-for-later')}
          </MuiLink>
        </Link>
        <Link href="#" passHref>
          <MuiLink underline="none" variant="body2" color="text.primary" sx={styles.link}>
            {t('add-to-favorites')}
          </MuiLink>
        </Link>
      </CardActions>
    </Box>
  )
}

export default CartItemActions
