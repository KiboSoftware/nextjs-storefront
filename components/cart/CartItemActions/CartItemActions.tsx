import { Button, CardActions } from '@mui/material'
import { useTranslation } from 'next-i18next'

const styles = {
  cardAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    p: '0.5rem 0',
  },
  button: {
    minWidth: 'auto',
    lineHeight: 'initial',
    color: 'text.primary',
    justifyContent: 'flex-start',
    mr: 1,
  },
}

const CartItemActions = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <CardActions sx={styles.cardAction}>
        <Button size="small" sx={styles.button}>
          {t('edit')}
        </Button>
        <Button size="small" sx={styles.button}>
          {t('save-for-later')}
        </Button>
        <Button size="small" sx={styles.button}>
          {t('add-to-favorites')}
        </Button>
      </CardActions>
    </>
  )
}

export default CartItemActions
