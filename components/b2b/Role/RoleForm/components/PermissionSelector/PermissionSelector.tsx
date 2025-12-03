import React, { useMemo, useCallback, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { permissionSelectorStyles } from './PermissionSelector.styles'

interface BehaviorCategory {
  id?: number
  name?: string
}

interface Behavior {
  id?: number
  name?: string
  categoryId?: number
}

interface PermissionSelectorProps {
  behaviorCategories?: { items?: BehaviorCategory[] }
  behaviors?: { items?: Behavior[] }
  selectedPermissions: Record<number, number[]>
  permissionError: string
  isReadOnly?: boolean
  isSystemRole?: boolean
  onBehaviorToggle: (category: number, behavior: number) => void
  onBehaviorNameCheckboxChange: (selectedCategory: number) => void
  getAllSelectedBehaviors: () => Array<{ category: number; behavior: number }>
  handleRemoveBehavior: (category: number, behavior: number) => void
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  behaviorCategories,
  behaviors,
  selectedPermissions,
  permissionError,
  isReadOnly = false,
  isSystemRole = false,
  onBehaviorToggle,
  onBehaviorNameCheckboxChange,
  getAllSelectedBehaviors,
  handleRemoveBehavior,
}) => {
  const { t } = useTranslation('common')

  // Local UI state - which category is selected in the left column
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    behaviorCategories?.items?.[0]?.id || null
  )

  // Memoize translation strings
  const permissionConfigurationLabel = useMemo(() => t('permission-configuration'), [t])
  const permissionConfigurationDescription = useMemo(
    () => t('permission-configuration-description'),
    [t]
  )
  const behaviorCategoryLabel = useMemo(() => t('behavior-category'), [t])
  const behaviorNameLabel = useMemo(() => t('behavior-name'), [t])
  const selectedBehaviorLabel = useMemo(() => t('selected-behavior'), [t])
  const noBehaviorsSelectedLabel = useMemo(() => t('no-behaviors-selected'), [t])

  // Memoize all selected behaviors to avoid calling function multiple times
  const allSelectedBehaviors = useMemo(() => getAllSelectedBehaviors(), [getAllSelectedBehaviors])

  // Get behaviors for the selected category - computed from local state
  const selectedCategoryBehaviors = useMemo(
    () => behaviors?.items?.filter((behavior) => behavior.categoryId === selectedCategory) || [],
    [behaviors?.items, selectedCategory]
  )

  // Computed properties for checkbox state - memoized
  const hasCategoryBehaviors = useMemo(
    () => selectedCategoryBehaviors.length > 0,
    [selectedCategoryBehaviors.length]
  )

  const allBehaviorsSelected = useMemo(
    () =>
      hasCategoryBehaviors &&
      selectedCategoryBehaviors.every((behavior) =>
        selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
      ),
    [hasCategoryBehaviors, selectedCategoryBehaviors, selectedPermissions, selectedCategory]
  )

  const someBehaviorsSelected = useMemo(
    () =>
      selectedCategoryBehaviors.some((behavior) =>
        selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
      ),
    [selectedCategoryBehaviors, selectedPermissions, selectedCategory]
  )

  const isIndeterminate = useMemo(
    () => someBehaviorsSelected && !allBehaviorsSelected,
    [someBehaviorsSelected, allBehaviorsSelected]
  )

  // Memoize inline arrow functions
  const handleCategoryClick = useCallback(
    (categoryId: number) => () => setSelectedCategory(categoryId),
    []
  )

  const handleBehaviorNameCheckbox = useCallback(() => {
    if (selectedCategory !== null) {
      onBehaviorNameCheckboxChange(selectedCategory)
    }
  }, [selectedCategory, onBehaviorNameCheckboxChange])

  const handleBehaviorClick = useCallback(
    (categoryId: number, behaviorId: number) => () => onBehaviorToggle(categoryId, behaviorId),
    [onBehaviorToggle]
  )

  const handleRemoveClick = useCallback(
    (categoryId: number, behaviorId: number) => () => handleRemoveBehavior(categoryId, behaviorId),
    [handleRemoveBehavior]
  )

  return (
    <Box sx={permissionSelectorStyles.container}>
      <Typography variant="h6" sx={permissionSelectorStyles.title}>
        {permissionConfigurationLabel}
      </Typography>
      <Typography sx={permissionSelectorStyles.description}>
        {permissionConfigurationDescription}
      </Typography>

      {/* Show permission error if exists */}
      {permissionError && (
        <Typography variant="body2" color="error" sx={permissionSelectorStyles.errorMessage}>
          {permissionError}
        </Typography>
      )}

      <Box sx={permissionSelectorStyles.mainContainer}>
        {/* Behavior Category Column */}
        <Box sx={permissionSelectorStyles.categoryColumn}>
          <Typography sx={permissionSelectorStyles.columnHeader}>
            {behaviorCategoryLabel}
          </Typography>
          <List sx={permissionSelectorStyles.list}>
            {behaviorCategories?.items?.map((cat) => (
              <ListItemButton
                key={cat.id}
                onClick={handleCategoryClick(cat.id || 0)}
                selected={selectedCategory === cat.id}
                sx={permissionSelectorStyles.categoryListItem}
              >
                <Typography variant="body2">{cat.name}</Typography>
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Behavior Name Column */}
        <Box sx={permissionSelectorStyles.behaviorColumn}>
          <Box sx={permissionSelectorStyles.behaviorColumnHeader}>
            <Checkbox
              size="small"
              checked={allBehaviorsSelected}
              indeterminate={isIndeterminate}
              onChange={handleBehaviorNameCheckbox}
              disabled={isReadOnly}
              sx={permissionSelectorStyles.headerCheckbox}
            />
            <Typography sx={permissionSelectorStyles.headerTitle}>{behaviorNameLabel}</Typography>
          </Box>
          <List sx={permissionSelectorStyles.list}>
            {selectedCategoryBehaviors.map((behavior) => {
              const isSelected = Boolean(
                selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
              )
              return (
                <ListItem key={behavior.id} disablePadding>
                  <ListItemButton
                    onClick={handleBehaviorClick(selectedCategory || 0, behavior.id || 0)}
                    sx={permissionSelectorStyles.behaviorListItem}
                    disabled={isReadOnly}
                  >
                    <Checkbox
                      checked={isSelected}
                      size="small"
                      disabled={isReadOnly}
                      sx={permissionSelectorStyles.checkbox}
                    />
                    <Typography variant="body2">{behavior.name}</Typography>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        {/* Selected Behavior Column */}
        <Box sx={permissionSelectorStyles.selectedColumn}>
          <Typography sx={permissionSelectorStyles.columnHeader}>
            {selectedBehaviorLabel}
          </Typography>
          {allSelectedBehaviors.length === 0 ? (
            <Typography sx={permissionSelectorStyles.emptyStateText}>
              {noBehaviorsSelectedLabel}
            </Typography>
          ) : (
            <List sx={permissionSelectorStyles.list}>
              {allSelectedBehaviors.map(({ category, behavior }) => {
                const behaviorObj = behaviors?.items?.find((b) => b.id === behavior)
                return (
                  <ListItem key={`${category}-${behavior}`} disablePadding>
                    <Box sx={permissionSelectorStyles.selectedBehaviorItem}>
                      <Typography variant="body2">
                        {behaviorObj?.name}
                      </Typography>
                      {!isSystemRole && (
                        <IconButton
                          size="small"
                          onClick={handleRemoveClick(category, behavior)}
                          disabled={isReadOnly}
                          sx={permissionSelectorStyles.removeButton}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(PermissionSelector)