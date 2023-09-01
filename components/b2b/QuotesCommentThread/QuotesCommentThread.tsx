import React, { useState } from 'react'

import { Timeline, TimelineContent, TimelineItem } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboTextBox } from '@/components/common'
import { quoteGetters } from '@/lib/getters'

import { QuoteComment } from '@/lib/gql/types'

interface QuotesCommentThreadProps {
  comments: QuoteComment[]
  userId: string
  mode?: string
  status?: string
  userIdAndEmails?: any
  onAddComment: (comment: string) => void
}

const QuotesCommentThread = (props: QuotesCommentThreadProps) => {
  const { comments, userId, mode, status, userIdAndEmails, onAddComment } = props
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
        <Timeline>
          {comments?.map((comment) => (
            <Box key={comment?.id}>
              <TimelineItem position={comment.auditInfo?.createBy === userId ? 'right' : 'left'}>
                <TimelineContent
                  sx={{ textAlign: comment.auditInfo?.createBy === userId ? 'right' : 'left' }}
                >
                  {quoteGetters.getEmailAddressAndDate(
                    comment.auditInfo?.createBy as string,
                    comment.auditInfo?.createDate as string,
                    userIdAndEmails
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem position={comment.auditInfo?.createBy === userId ? 'right' : 'left'}>
                <TimelineContent
                  sx={{ textAlign: comment.auditInfo?.createBy === userId ? 'right' : 'left' }}
                >
                  {comment.text}
                </TimelineContent>
              </TimelineItem>
            </Box>
          ))}
        </Timeline>
      )}

      {mode && status?.toLowerCase() !== 'inreview' && (
        <Box display="flex" alignItems="center" gap={2}>
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
        </Box>
      )}
    </Box>
  )
}

export default QuotesCommentThread
