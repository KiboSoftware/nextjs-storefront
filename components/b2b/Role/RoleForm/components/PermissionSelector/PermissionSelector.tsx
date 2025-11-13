import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Checkbox,
  CircularProgress,
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
  selectedCategory: number | null
  selectedPermissions: Record<number, number[]>
  permissionError: string
  onCategorySelect: (category: number) => void
  onBehaviorToggle: (category: number, behavior: number) => void
  onBehaviorNameCheckboxChange: () => void
  getAllSelectedBehaviors: () => Array<{ category: number; behavior: number }>
  handleRemoveBehavior: (category: number, behavior: number) => void
  selectedCategoryBehaviors: Behavior[]
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  behaviorCategories,
  behaviors,
  selectedCategory,
  selectedPermissions,
  permissionError,
  onCategorySelect,
  onBehaviorToggle,
  onBehaviorNameCheckboxChange,
  getAllSelectedBehaviors,
  handleRemoveBehavior,
  selectedCategoryBehaviors,
}) => {
  const { t } = useTranslation('common')

  // Computed properties for checkbox state
  const hasCategoryBehaviors = selectedCategoryBehaviors.length > 0
  const allBehaviorsSelected =
    hasCategoryBehaviors &&
    selectedCategoryBehaviors.every((behavior) =>
      selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
    )
  const someBehaviorsSelected = selectedCategoryBehaviors.some((behavior) =>
    selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
  )
  const isIndeterminate = someBehaviorsSelected && !allBehaviorsSelected

  return (
    <Box sx={permissionSelectorStyles.container}>
      <Typography variant="h6" sx={permissionSelectorStyles.title}>
        {t('permission-configuration')}
      </Typography>
      <Typography sx={permissionSelectorStyles.description}>
        {t('permission-configuration-description')}
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
            {t('behavior-category')}
          </Typography>
          <List sx={permissionSelectorStyles.list}>
            {behaviorCategories?.items?.map((cat) => (
              <ListItemButton
                key={cat.id}
                onClick={() => onCategorySelect(cat.id || 0)}
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
              onChange={onBehaviorNameCheckboxChange}
              sx={permissionSelectorStyles.headerCheckbox}
            />
            <Typography sx={permissionSelectorStyles.headerTitle}>{t('behavior-name')}</Typography>
          </Box>
          <List sx={permissionSelectorStyles.list}>
            {selectedCategoryBehaviors.map((behavior) => {
              const isSelected = Boolean(
                selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
              )
              return (
                <ListItem key={behavior.id} disablePadding>
                  <ListItemButton
                    onClick={() => onBehaviorToggle(selectedCategory || 0, behavior.id || 0)}
                    sx={permissionSelectorStyles.behaviorListItem}
                  >
                    <Checkbox
                      checked={isSelected}
                      size="small"
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
            {t('selected-behavior')}
          </Typography>
          {getAllSelectedBehaviors().length === 0 ? (
            <Typography sx={permissionSelectorStyles.emptyStateText}>
              {t('no-behaviors-selected')}
            </Typography>
          ) : (
            <List sx={permissionSelectorStyles.list}>
              {getAllSelectedBehaviors().map(({ category, behavior }) => {
                const behaviorObj = behaviors?.items?.find((b) => b.id === behavior)
                return (
                  <ListItem key={`${category}-${behavior}`} disablePadding>
                    <Box sx={permissionSelectorStyles.selectedBehaviorItem}>
                      <Typography variant="body2">
                        {behaviorObj?.name || `Behavior ${behavior}`}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveBehavior(category, behavior)}
                        sx={permissionSelectorStyles.removeButton}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
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

export default PermissionSelector
