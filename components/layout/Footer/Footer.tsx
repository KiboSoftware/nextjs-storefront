import { Grid, Typography, Box, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboImage } from '@/components/common'

const FooterItemLink = (props: any) => {
  return (
    <Typography variant="body2" sx={{ p: 2 }}>
      <Link href={props.link} underline="none" color="common.white">
        {props.text}
      </Link>
    </Typography>
  )
}
export default function Footer(props: any) {
  const { sections = [], social = [] } = props
  const { t } = useTranslation('common')
  const mdColumnWidth = 12 / sections.length
  return (
    <Box
      component="div"
      sx={{
        p: 10,
        marginTop: 10,
        borderTop: '.5rem solid',
        borderColor: 'primary.main',
        backgroundColor: 'common.black',
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ color: 'common.white' }}>
        {sections.map((footerSection: any) => {
          return (
            <Grid
              key={footerSection.title}
              item
              xs={12}
              md={mdColumnWidth}
              alignContent="center"
              textAlign="center"
            >
              <Typography variant="h4" sx={{ textTransform: 'uppercase', fontWeight: '600' }}>
                {footerSection.title}
              </Typography>
              {footerSection.items.map((footerItem: any) => (
                <FooterItemLink key={footerItem.text} {...footerItem} />
              ))}
            </Grid>
          )
        })}
        <Grid item xs={12} md={mdColumnWidth} alignContent="center" textAlign="center"></Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ color: 'common.white', paddingTop: 5 }}>
        <Grid item xs={12} md={mdColumnWidth} alignContent="center" textAlign="center">
          <Typography
            variant="h4"
            sx={{ textTransform: 'uppercase', fontWeight: '600', marginBottom: 1 }}
          >
            {t('social')}
          </Typography>
          {social.map((socialItem: any) => (
            <Box key={socialItem.iconPath} component="span" sx={{ margin: '0 4px' }}>
              <KiboImage src={socialItem.iconPath} alt={'content tiles'} width={32} height={32} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
