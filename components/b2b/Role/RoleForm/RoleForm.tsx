import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  ListItemText,
  ListItemIcon,
  Stack,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Controller, useForm, useWatch, ControllerRenderProps } from 'react-hook-form'
import * as yup from 'yup'

import { roleFormStyles } from './RoleForm.styles'
import { KiboTextBox, KiboSelect } from '@/components/common'
import { useGetBehaviorCategories } from '@/hooks/mutations/b2b/manage-roles/useGetBehaviorCategories/useGetBehaviorCategories'
import { useGetBehaviors } from '@/hooks/mutations/b2b/manage-roles/useGetBehaviors/useGetBehaviors'
import { HierarchyTree } from '@/lib/types'

import { B2BAccount, CustomerAccount } from '@/lib/gql/types'

export interface RoleFormData {
  roleName: string
  parentAccount: string
  accountScope: string
  applyToFutureChildren: boolean
  selectedAccounts: number[]
  selectedPermissions: Record<number, number[]>
}

interface RoleFormProps {
  onSave: (data: RoleFormData) => void
  onCancel: () => void
  user?: CustomerAccount
  accounts?: B2BAccount[]
  hierarchy?: HierarchyTree[]
}

const useRoleFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    roleName: yup.string().required(t('role-name-required') || 'Role name is required'),
    parentAccount: yup.string().nullable(),
    accountScope: yup.string().required(t('account-scope-required') || 'Account scope is required'),
  })
}

const RoleForm: React.FC<RoleFormProps> = ({ onSave, onCancel, user, accounts, hierarchy }) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const styles = roleFormStyles

  // Fetch behavior categories and behaviors
  const { behaviorCategories, isLoading: categoriesLoading } = useGetBehaviorCategories()
  const { behaviors, isLoading: behaviorsLoading } = useGetBehaviors()

  const roleSchema = useRoleFormSchema()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
    resolver: yupResolver(roleSchema),
  })

  // Update parent account when user data loads
  useEffect(() => {
    if (user?.id) {
      reset({
        roleName: '',
        parentAccount: String(user.id),
        accountScope: 'all-child',
        applyToFutureChildren: false,
        selectedAccounts: [],
        selectedPermissions: {},
      })
    }
  }, [user?.id, reset])

  useEffect(() => {
    console.log('User:', user)
    console.log('Accounts:', accounts)
  }, [user, accounts])

  // Watch the parentAccount field value
  const parentAccountValue = useWatch({ control, name: 'parentAccount' })

  useEffect(() => {
    console.log('Form parentAccount value changed to:', parentAccountValue)
  }, [parentAccountValue])

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, number[]>>({})
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())

  // Set default selected category when categories load
  useEffect(() => {
    if (
      behaviorCategories?.items &&
      behaviorCategories.items.length > 0 &&
      selectedCategory === null
    ) {
      setSelectedCategory(behaviorCategories.items[0].id || null)
    }
  }, [behaviorCategories, selectedCategory])

  // Watch accountScope to show/hide hierarchy
  const accountScope = watch('accountScope')
  const parentAccount = watch('parentAccount')

  // Handle parent account selection
  const handleParentAccountChange = (value: string) => {
    console.log('handleParentAccountChange called - value:', value)
    console.log('Current form values before change:', getValues())
    setValue('parentAccount', value)
    // Reset selected accounts when parent changes
    setSelectedAccounts([])
    setValue('selectedAccounts', [])
    console.log('Form values after change:', getValues())
  }

  // Get child accounts for the selected parent
  const getChildAccountsForParent = (parentId: number): B2BAccount[] => {
    if (!accounts) return []
    return accounts.filter((acc) => acc.parentAccountId === parentId)
  }

  // Build hierarchy tree for selected parent
  const buildHierarchyTree = (parentId: number): HierarchyTree[] => {
    const childAccounts = getChildAccountsForParent(parentId)
    return childAccounts.map((acc) => ({
      id: acc.id,
      children: buildHierarchyTree(acc.id),
      collapsed: !expandedNodes.has(acc.id),
    }))
  }

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  // Handle account selection in hierarchy
  const handleAccountSelection = (accountId: number, checked: boolean) => {
    setSelectedAccounts((prev) => {
      const newSelection = checked ? [...prev, accountId] : prev.filter((id) => id !== accountId)
      setValue('selectedAccounts', newSelection)
      return newSelection
    })
  }

  // Select/deselect all child accounts recursively
  const handleSelectAllChildren = (nodeId: number, checked: boolean) => {
    const getAllDescendants = (id: number): number[] => {
      const children = getChildAccountsForParent(id)
      const descendants: number[] = []
      children.forEach((child) => {
        descendants.push(child.id)
        descendants.push(...getAllDescendants(child.id))
      })
      return descendants
    }

    const descendants = getAllDescendants(nodeId)
    setSelectedAccounts((prev) => {
      let newSelection = [...prev]
      if (checked) {
        // Add node and all descendants
        newSelection.push(nodeId)
        descendants.forEach((id) => {
          if (!newSelection.includes(id)) {
            newSelection.push(id)
          }
        })
      } else {
        // Remove node and all descendants
        newSelection = newSelection.filter((id) => id !== nodeId && !descendants.includes(id))
      }
      setValue('selectedAccounts', newSelection)
      return newSelection
    })
  }

  const handleCategorySelect = (category: number) => {
    setSelectedCategory(category)
  }

  const handleBehaviorToggle = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => {
      const categoryPermissions = prev[category] || []
      const isSelected = categoryPermissions.includes(behavior)

      if (isSelected) {
        return {
          ...prev,
          [category]: categoryPermissions.filter((b) => b !== behavior),
        }
      } else {
        return {
          ...prev,
          [category]: [...categoryPermissions, behavior],
        }
      }
    })
  }

  const handleRemoveBehavior = (category: number, behavior: number) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((b) => b !== behavior),
    }))
  }

  // Render account hierarchy tree recursively
  const renderAccountHierarchy = (accountId: number, level: number): React.ReactNode => {
    const account = accounts?.find((acc) => acc.id === accountId)
    if (!account) return null

    const childAccounts = getChildAccountsForParent(accountId)
    const hasChildren = childAccounts.length > 0
    const isExpanded = expandedNodes.has(accountId)
    const isSelected = selectedAccounts.includes(accountId)
    const isParentAccount = accountId === Number(parentAccount)

    return (
      <Box key={accountId}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: level * 3,
            py: 0.5,
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          {hasChildren ? (
            <IconButton
              size="small"
              onClick={() => toggleNodeExpansion(accountId)}
              sx={{ mr: 0.5, p: 0.5 }}
            >
              {isExpanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          ) : (
            <Box sx={{ width: 28, mr: 0.5 }} />
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={isSelected}
                onChange={(e) => handleAccountSelection(accountId, e.target.checked)}
                disabled={isParentAccount}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: isParentAccount ? 600 : 400 }}>
                {account.companyOrOrganization || `Account ${accountId}`}
                {isParentAccount && ` (${t('parent') || 'Parent'})`}
              </Typography>
            }
            sx={{ m: 0, flex: 1 }}
          />

          {hasChildren && (
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              ({childAccounts.length}{' '}
              {childAccounts.length === 1 ? t('child') || 'child' : t('children') || 'children'})
            </Typography>
          )}
        </Box>

        {hasChildren && isExpanded && (
          <Box>{childAccounts.map((child) => renderAccountHierarchy(child.id, level + 1))}</Box>
        )}
      </Box>
    )
  }

  const onSubmit = (data: RoleFormData) => {
    // Extract all selected behavior IDs from selectedPermissions
    const allSelectedBehaviorIds: number[] = []
    Object.values(selectedPermissions).forEach((behaviorIds) => {
      allSelectedBehaviorIds.push(...behaviorIds)
    })

    // Create payload in requested format
    const payload = {
      name: data.roleName,
      behaviors: allSelectedBehaviorIds,
    }

    console.log('Create Role Payload:', payload)

    // Call the original onSave function
    onSave({
      ...data,
      selectedAccounts,
      selectedPermissions,
    })
  }

  // Get behaviors for the selected category
  const selectedCategoryBehaviors =
    behaviors?.items?.filter((behavior) => behavior.categoryId === selectedCategory) || []

  const getAllSelectedBehaviors = () => {
    const allBehaviors: Array<{ category: number; behavior: number }> = []
    Object.entries(selectedPermissions).forEach(([category, behaviors]) => {
      behaviors.forEach((behavior) => {
        allBehaviors.push({ category: Number(category), behavior })
      })
    })
    return allBehaviors
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} id="addRoleForm" data-testid="role-form">
        <Grid container spacing={3}>
          {/* Role Information Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {t('role-information')}
            </Typography>
          </Grid>

          {/* Role Name Field */}
          <Grid item xs={12} md={6}>
            <Controller
              name="roleName"
              control={control}
              render={({ field }: { field: ControllerRenderProps<RoleFormData, 'roleName'> }) => (
                <KiboTextBox
                  fullWidth
                  label={t('role-name')}
                  placeholder={t('role-name-placeholder') || 'e.g. Finance Manager, Order Manager'}
                  value={field.value}
                  onChange={(_name, value) => field.onChange(value)}
                  error={!!errors.roleName}
                  helperText={errors.roleName?.message}
                />
              )}
            />
          </Grid>

          {/* Parent Account Field */}
          <Grid item xs={12} md={6}>
            <Controller
              name="parentAccount"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<RoleFormData, 'parentAccount'>
              }) => (
                <KiboSelect
                  name="parentAccount"
                  label={t('parent-account')}
                  onChange={(name: string, value: string) => {
                    console.log('KiboSelect onChange called - name:', name, 'value:', value)
                    // Call field.onChange first to update React Hook Form
                    field.onChange(value)
                    // Then call our custom handler
                    handleParentAccountChange(value)
                  }}
                  onBlur={(name: string, value: string) => {
                    console.log('KiboSelect onBlur called - name:', name, 'value:', value)
                    field.onBlur()
                  }}
                  value={field.value || ''}
                  disabled={!accounts || accounts.length === 0}
                  placeholder={t('select-parent-account')}
                  error={!!errors.parentAccount}
                  helperText={errors.parentAccount?.message}
                >
                  {accounts && accounts.length > 0
                    ? [
                        ...(user?.id
                          ? [
                              <MenuItem key={`user-${user.id}`} value={String(user.id)}>
                                {user.companyOrOrganization ||
                                  `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                                  user.emailAddress ||
                                  t('current-account')}
                              </MenuItem>,
                            ]
                          : []),
                        ...accounts
                          .filter((account) => account.id !== user?.id)
                          .map((account) => (
                            <MenuItem key={account.id} value={String(account.id)}>
                              {account.companyOrOrganization || `Account ${account.id}`}
                            </MenuItem>
                          )),
                      ]
                    : [
                        <MenuItem key="no-accounts" value="" disabled>
                          {t('no-accounts-available')}
                        </MenuItem>,
                      ]}
                </KiboSelect>
              )}
            />
          </Grid>

          {/* Account Scope Radio Buttons */}
          <Grid item xs={12}>
            <Controller
              name="accountScope"
              control={control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<RoleFormData, 'accountScope'>
              }) => (
                <FormControl component="fieldset" fullWidth>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    {t('account-hierarchy-scope')}
                  </Typography>
                  <RadioGroup {...field}>
                    <Box>
                      <FormControlLabel
                        value="all-child"
                        control={<Radio size="small" />}
                        label={t('apply-to-all-child-accounts')}
                      />
                      {/* Checkbox for future children - shown when "all-child" is selected */}
                      {accountScope === 'all-child' && (
                        <Box sx={{ pl: 4 }}>
                          <Controller
                            name="applyToFutureChildren"
                            control={control}
                            render={({
                              field: checkboxField,
                            }: {
                              field: ControllerRenderProps<RoleFormData, 'applyToFutureChildren'>
                            }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    size="small"
                                    checked={checkboxField.value}
                                    onChange={(e) => checkboxField.onChange(e.target.checked)}
                                  />
                                }
                                label={
                                  <Typography variant="body2">
                                    {t('apply-to-future-child-accounts')}
                                  </Typography>
                                }
                              />
                            )}
                          />
                        </Box>
                      )}
                    </Box>
                    <FormControlLabel
                      value="specific-child"
                      control={<Radio size="small" />}
                      label={t('apply-to-specific-child-accounts')}
                    />
                    <FormControlLabel
                      value="all-except"
                      control={<Radio size="small" />}
                      label={t('apply-to-all-child-accounts-except')}
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        {/* Account Hierarchy Tree - Show when specific-child or all-except is selected */}
        {parentAccount && (accountScope === 'specific-child' || accountScope === 'all-except') && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: `1px solid ${theme.palette.grey[300]}`,
              borderRadius: 1,
              bgcolor: theme.palette.grey[50],
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {accountScope === 'specific-child'
                  ? t('select-child-accounts')
                  : t('select-accounts-to-exclude')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSelectedAccounts([])
                    setExpandedNodes(new Set())
                    setValue('selectedAccounts', [])
                  }}
                >
                  {t('deselect-all-accounts')}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    const allChildIds =
                      accounts
                        ?.filter(
                          (acc) => acc.parentAccountId !== null && acc.id !== Number(parentAccount)
                        )
                        .map((acc) => acc.id) || []
                    setSelectedAccounts(allChildIds)
                    const allIds = new Set(accounts?.map((acc) => acc.id) || [])
                    setExpandedNodes(allIds)
                    setValue('selectedAccounts', allChildIds)
                  }}
                >
                  {t('select-all-accounts')}
                </Button>
              </Box>
            </Box>

            {selectedAccounts.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {selectedAccounts.length}{' '}
                {selectedAccounts.length === 1 ? t('account-singular') : t('accounts-plural')}{' '}
                {t('selected-lowercase')}
              </Typography>
            )}

            <Box
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: 1,
                bgcolor: 'white',
                p: 1,
              }}
            >
              {renderAccountHierarchy(Number(parentAccount), 0)}
            </Box>
          </Box>
        )}

        {/* Permission Configuration Section */}
        <Box sx={{ ...styles.section, mt: 3 }}>
          <Typography variant="h6" sx={styles.sectionHeader}>
            {t('permission-configuration')}
          </Typography>
          <Typography sx={styles.sectionDescription}>
            {t('permission-configuration-description')}
          </Typography>

          <Box sx={styles.permissionContainer}>
            {/* Behavior Category Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>{t('behavior-category')}</Typography>
              <List sx={styles.permissionList}>
                {categoriesLoading ? (
                  <ListItem>
                    <Typography variant="body2">{t('loading')}</Typography>
                  </ListItem>
                ) : (
                  behaviorCategories?.items?.map((cat) => (
                    <ListItemButton
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id || 0)}
                      selected={selectedCategory === cat.id}
                      sx={{
                        borderBottom: '1px solid #f0f0f0',
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                          },
                        },
                      }}
                    >
                      <Typography variant="body2">{cat.name}</Typography>
                    </ListItemButton>
                  )) || []
                )}
              </List>
            </Box>

            {/* Behavior Name Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>{t('behavior-name')}</Typography>
              <List sx={styles.permissionList}>
                {behaviorsLoading ? (
                  <ListItem>
                    <Typography variant="body2">{t('loading')}</Typography>
                  </ListItem>
                ) : (
                  selectedCategoryBehaviors.map((behavior) => {
                    const isSelected = Boolean(
                      selectedPermissions[selectedCategory || 0]?.includes(behavior.id || 0)
                    )
                    return (
                      <ListItem key={behavior.id} disablePadding>
                        <ListItemButton
                          onClick={() =>
                            handleBehaviorToggle(selectedCategory || 0, behavior.id || 0)
                          }
                          sx={styles.behaviorItem(theme)}
                        >
                          <Checkbox checked={isSelected} size="small" sx={{ padding: 0 }} />
                          <Typography variant="body2">{behavior.name}</Typography>
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                )}
              </List>
            </Box>

            {/* Selected Behavior Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>{t('selected-behavior')}</Typography>
              {getAllSelectedBehaviors().length === 0 ? (
                <Typography sx={styles.noSelectionText}>{t('no-behaviors-selected')}</Typography>
              ) : (
                <List sx={styles.permissionList}>
                  {getAllSelectedBehaviors().map(({ category, behavior }) => {
                    const behaviorObj = behaviors?.items?.find((b) => b.id === behavior)
                    return (
                      <ListItem key={`${category}-${behavior}`} disablePadding>
                        <Box sx={styles.selectedBehaviorItem(theme)}>
                          <Typography variant="body2">
                            {behaviorObj?.name || `Behavior ${behavior}`}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveBehavior(category, behavior)}
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

        {/* Action Buttons at Bottom */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onCancel} sx={{ minWidth: 120 }}>
            {t('cancel')}
          </Button>
          <Button variant="contained" disableElevation type="submit" sx={{ minWidth: 120 }}>
            {t('create-role')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default RoleForm
