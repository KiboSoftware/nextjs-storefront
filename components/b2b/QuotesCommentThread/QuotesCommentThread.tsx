import React, { useState } from 'react'

import { Timeline, TimelineContent, TimelineItem } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboTextBox } from '@/components/common'

import { QuoteComment } from '@/lib/gql/types'

interface QuotesCommentThreadProps {
  comments: QuoteComment[]
  userId: string
  onAddComment: (comment: string) => void
}

const QuotesCommentThread = (props: QuotesCommentThreadProps) => {
  const { comments, userId, onAddComment } = props
  const { t } = useTranslation('common')

  const [comment, setComment] = useState<string>('')

  const handleComment = (_: any, value: string) => {
    setComment(value)
  }

  return (
    <Box>
      {comments.length === 0 ? (
        <Typography variant="body2">{t('no-comments-added')}</Typography>
      ) : (
        <Timeline>
          {comments.map((comment) => (
            <TimelineItem
              key={comment.id}
              position={comment.auditInfo?.createBy === userId ? 'right' : 'left'}
            >
              <TimelineContent
                sx={{ textAlign: comment.auditInfo?.createBy === userId ? 'right' : 'left' }}
              >
                {comment.text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}

      <Box display="flex" alignItems="center" gap={2}>
        <Box flex={1}>
          <KiboTextBox value={comment} placeholder={t('type-something')} onChange={handleComment} />
        </Box>
        <Button variant="contained" color="inherit" onClick={() => onAddComment(comment)}>
          {t('add-comment')}
        </Button>
      </Box>
    </Box>
  )
}

export default QuotesCommentThread
