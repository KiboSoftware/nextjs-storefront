import * as React from 'react'
import { useEffect } from 'react'

import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'next-i18next'

import type { B2BUserGroup } from '@/lib/types'

function not(a: readonly B2BUserGroup[], b: readonly B2BUserGroup[]) {
  return a.filter((value) => b.findIndex((group) => group.code === value.code) === -1)
}

function intersection(a: readonly B2BUserGroup[], b: readonly B2BUserGroup[]) {
  return a.filter((value) => b.findIndex((group) => group.code === value.code) !== -1)
}
interface GroupTransferListProps {
  groupsList: B2BUserGroup[]
  selectedGroups: B2BUserGroup[]
  isSubmitting: boolean
  onAddRemoveGroups: (groups: { addGroups: any; removeGroups: any }) => void
}

export default function GroupTransferList({
  groupsList,
  selectedGroups,
  isSubmitting,
  onAddRemoveGroups,
}: GroupTransferListProps) {
  const { t } = useTranslation('common')
  const [checked, setChecked] = React.useState<readonly B2BUserGroup[]>([])
  const [left, setLeft] = React.useState<readonly B2BUserGroup[]>(groupsList)
  const [right, setRight] = React.useState<readonly B2BUserGroup[]>(selectedGroups)

  useEffect(() => {
    if (isSubmitting) {
      const updatedGroups = handleAddRemoveGroups()
      onAddRemoveGroups(updatedGroups)
    }
  }, [isSubmitting])

  if (!groupsList || !selectedGroups) return null

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: B2BUserGroup) => () => {
    const currentIndex = checked.findIndex((each) => each.code === value.code)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  const handleAddRemoveGroups = () => {
    const addGroups = right.filter(
      (group) => selectedGroups.findIndex((each) => each.code === group.code) === -1
    )
    const removeGroups = selectedGroups.filter(
      (group) => right.findIndex((each) => each.code === group.code) === -1
    )
    return { addGroups, removeGroups }
  }

  const customList = (items: readonly B2BUserGroup[]) => (
    <Paper
      sx={{
        overflow: 'auto',
        minHeight: 160,
        maxHeight: 160,
        border: '1px solid rgba(0,0,0,0.12)',
      }}
    >
      <List dense component="div" role="list">
        {items?.map((value) => {
          const labelId = `transfer-list-item-${value.code}-label`

          return (
            <ListItemButton
              key={value.code}
              role="listitem"
              onClick={handleToggle(value)}
              selected={checked.findIndex((each) => each.code === value.code) !== -1}
            >
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          )
        })}
      </List>
    </Paper>
  )

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} sm={5}>
        {t('all-groups')}
        {customList(left)}
      </Grid>
      <Grid item xs={12} sm={2}>
        <Grid
          container
          direction={{ xs: 'row', sm: 'column' }}
          alignItems="center"
          justifyContent="center"
          pt={3}
        >
          <Button
            sx={{ m: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left?.length === 0}
            aria-label="move all right"
          >
            <Box component={'span'} sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' } }}>
              ≫
            </Box>
          </Button>
          <Button
            sx={{ m: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked?.length === 0}
            aria-label="move selected right"
          >
            <Box component={'span'} sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' } }}>
              &gt;
            </Box>
          </Button>
          <Button
            sx={{ m: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked?.length === 0}
            aria-label="move selected left"
          >
            <Box component={'span'} sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' } }}>
              &lt;
            </Box>
          </Button>
          <Button
            sx={{ m: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right?.length === 0}
            aria-label="move all left"
          >
            <Box component={'span'} sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' } }}>
              ≪
            </Box>
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5}>
        {t('selected-groups')}
        {customList(right)}
      </Grid>
    </Grid>
  )
}
