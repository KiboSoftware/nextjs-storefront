import React, { useState } from 'react'

import { Timeline, TimelineContent, TimelineItem } from '@mui/lab'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboTextBox } from '@/components/common'
import { QuoteStatus } from '@/lib/constants'
import { quoteGetters } from '@/lib/getters'

import { QuoteComment } from '@/lib/gql/types'

interface QuotesCommentThreadProps {
  comments: QuoteComment[]
  userId: string
  mode?: string
  status?: string
  userIdAndEmails?: any
  showLeft?: boolean
  onAddComment: (comment: string) => void
}

const QuotesCommentThread = (props: QuotesCommentThreadProps) => {
  const { comments, userId, mode, status, userIdAndEmails, showLeft = false, onAddComment } = props
  const { t } = useTranslation('common')

  const [comment, setComment] = useState<string>('')

  const handleComment = (_: any, value: string) => {
    setComment(value)
  }

  const handleAddComment = (comment: string) => {
    onAddComment(comment)
    setComment('')
  }

  return (
    <Box>
      {comments?.length === 0 ? (
        <Typography variant="body2">{t('no-comments-added')}</Typography>
      ) : (
        <Timeline sx={{ padding: 0 }}>
          {comments?.map((comment) => (
            <Box key={comment?.id}>
              <TimelineItem
                position={!showLeft && comment.auditInfo?.createBy === userId ? 'right' : 'left'}
              >
                <TimelineContent
                  sx={{
                    textAlign:
                      !showLeft && comment.auditInfo?.createBy === userId ? 'right' : 'left',
                  }}
                >
                  <Typography variant="body2" fontWeight={'bold'} gutterBottom>
                    {quoteGetters.getEmailAddressAndDate(
                      comment.auditInfo?.createBy as string,
                      comment.auditInfo?.createDate as string,
                      userIdAndEmails
                    )}
                  </Typography>
                  <Typography variant="body2">{comment.text}</Typography>
                </TimelineContent>
              </TimelineItem>
            </Box>
          ))}
        </Timeline>
      )}

      {mode &&
        QuoteStatus[status as string] !== QuoteStatus.InReview &&
        QuoteStatus[status as string] !== QuoteStatus.Completed &&
        QuoteStatus[status as string] !== QuoteStatus.Expired && (
          <Grid item xs={12} md={6} display="flex" alignItems="center" gap={2}>
            <Box flex={1}>
              <KiboTextBox
                value={comment}
                placeholder={t('type-something')}
                onChange={handleComment}
              />
            </Box>
            <Button variant="contained" color="inherit" onClick={() => handleAddComment(comment)}>
              {t('add-comment')}
            </Button>
          </Grid>
        )}
    </Box>
  )
}

export default QuotesCommentThread
