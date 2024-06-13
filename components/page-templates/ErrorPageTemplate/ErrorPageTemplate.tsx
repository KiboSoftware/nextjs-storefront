import React from 'react'

import { Typography } from "@mui/material"
import { useTranslation } from "next-i18next"

export interface ErrorPageTemplateProps
{
    errorMessage: string
}


const ErrorPageTemplate = (props: ErrorPageTemplateProps) => {
    const { t } = useTranslation('common')
    return (
        <>
            <Typography variant="subtitle2" fontWeight={'bold'}>
                <p>{props.errorMessage ? props.errorMessage : ''}</p>
                <p>{t('error-cartTakeover')}</p>
            </Typography>
        </>
    )
}
export default ErrorPageTemplate