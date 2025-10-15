import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import { roleFormStyles } from './RoleForm.styles'
import { KiboTextBox, KiboSelect } from '@/components/common'
import { HierarchyTree } from '@/lib/types'

import { B2BAccount, CustomerAccount } from '@/lib/gql/types'

export interface RoleFormData {
  roleName: string
  parentAccount: string
  accountScope: string
  applyToFutureChildren: boolean
  selectedAccounts: number[]
  selectedPermissions: Record<string, string[]>
}

interface RoleFormProps {
  onSave: (data: RoleFormData) => void
  onCancel: () => void
  user?: CustomerAccount
  accounts?: B2BAccount[]
  hierarchy?: HierarchyTree[]
}

// Permission categories and their behaviors based on the screenshot
const PERMISSION_CATEGORIES = [
  {
    category: 'Product',
    behaviors: ['View Products', 'Create Products', 'Edit Products', 'Delete Products'],
  },
  {
    category: 'Account',
    behaviors: ['View Accounts', 'Create Accounts', 'Edit Accounts', 'Delete Accounts'],
  },
  {
    category: 'Site',
    behaviors: ['View Sites', 'Manage Sites'],
  },
  {
    category: 'Discount',
    behaviors: ['View Discounts', 'Create Discounts', 'Edit Discounts', 'Delete Discounts'],
  },
  {
    category: 'User',
    behaviors: ['View Users', 'Create Users', 'Edit Users', 'Delete Users'],
  },
  {
    category: 'Customer',
    behaviors: ['View Customers', 'Create Customers', 'Edit Customers', 'Delete Customers'],
  },
  {
    category: 'Settings/General',
    behaviors: ['View Settings', 'Edit Settings'],
  },
  {
    category: 'Order',
    behaviors: ['View Orders', 'Create Orders', 'Edit Orders', 'Delete Orders', 'Cancel Orders'],
  },
  {
    category: 'Shipping',
    behaviors: ['View Shipping', 'Manage Shipping'],
  },
]

const useRoleFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    roleName: yup.string().required(t('role-name-required') || 'Role name is required'),
    parentAccount: yup.string().nullable(),
    accountScope: yup.string().required(t('account-scope-required') || 'Account scope is required'),
  })
}

export const RoleForm: React.FC<RoleFormProps> = ({
  onSave,
  onCancel,
  user,
  accounts,
  hierarchy,
}) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const styles = roleFormStyles

  const roleSchema = useRoleFormSchema()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
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
      console.log('Setting default account:', String(user.id), 'User:', user.companyOrOrganization)
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

  const [selectedCategory, setSelectedCategory] = useState<string>('Product')
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({})
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set())

  // Watch accountScope to show/hide hierarchy
  const accountScope = watch('accountScope')
  const parentAccount = watch('parentAccount')

  // Handle parent account selection
  const handleParentAccountChange = (name: string, value: string) => {
    console.log('handleParentAccountChange called - name:', name, 'value:', value)
    setValue('parentAccount', value)
    // Reset selected accounts when parent changes
    setSelectedAccounts([])
    setValue('selectedAccounts', [])
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleBehaviorToggle = (category: string, behavior: string) => {
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

  const handleRemoveBehavior = (category: string, behavior: string) => {
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
    onSave({
      ...data,
      selectedAccounts,
      selectedPermissions,
    })
  }

  const selectedCategoryData = PERMISSION_CATEGORIES.find(
    (cat) => cat.category === selectedCategory
  )

  const getAllSelectedBehaviors = () => {
    const allBehaviors: Array<{ category: string; behavior: string }> = []
    Object.entries(selectedPermissions).forEach(([category, behaviors]) => {
      behaviors.forEach((behavior) => {
        allBehaviors.push({ category, behavior })
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
              {t('role-information') || 'Role Information'}
            </Typography>
          </Grid>

          {/* Role Name Field */}
          <Grid item xs={12} md={6}>
            <Controller
              name="roleName"
              control={control}
              render={({ field }: any) => (
                <KiboTextBox
                  fullWidth
                  label={t('role-name') || 'Role Name'}
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
              render={({ field }: any) => (
                <KiboSelect
                  name="parentAccount"
                  label={t('parent-account') || 'Parent Account'}
                  onChange={handleParentAccountChange}
                  onBlur={field.onBlur}
                  value={field.value || ''}
                  disabled={!accounts || accounts.length === 0}
                  placeholder={t('select-parent-account') || 'Select parent account'}
                  error={!!errors.parentAccount}
                  helperText={errors.parentAccount?.message}
                >
                  {accounts && accounts.length > 0 ? (
                    <>
                      {user?.id && (
                        <MenuItem value={String(user.id)}>
                          {user.companyOrOrganization ||
                            `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                            user.emailAddress ||
                            t('current-account')}
                        </MenuItem>
                      )}
                      {accounts
                        .filter((account) => account.id !== user?.id)
                        .map((account) => (
                          <MenuItem key={account.id} value={String(account.id)}>
                            {account.companyOrOrganization || `Account ${account.id}`}
                          </MenuItem>
                        ))}
                    </>
                  ) : (
                    <MenuItem value="">
                      {t('no-accounts-available') || 'No accounts available'}
                    </MenuItem>
                  )}
                </KiboSelect>
              )}
            />
          </Grid>

          {/* Account Scope Radio Buttons */}
          <Grid item xs={12}>
            <Controller
              name="accountScope"
              control={control}
              render={({ field }: any) => (
                <FormControl component="fieldset" fullWidth>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    {t('account-hierarchy-scope') || 'Account Hierarchy Scope'}
                  </Typography>
                  <RadioGroup {...field}>
                    <Box>
                      <FormControlLabel
                        value="all-child"
                        control={<Radio size="small" />}
                        label={t('apply-to-all-child-accounts') || 'Apply to all child accounts'}
                      />
                      {/* Checkbox for future children - shown when "all-child" is selected */}
                      {accountScope === 'all-child' && (
                        <Box sx={{ pl: 4 }}>
                          <Controller
                            name="applyToFutureChildren"
                            control={control}
                            render={({ field: checkboxField }: any) => (
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
                                    {t('apply-to-future-child-accounts') ||
                                      'Apply to future child accounts'}
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
                      label={
                        t('apply-to-specific-child-accounts') || 'Apply to specific child accounts'
                      }
                    />
                    <FormControlLabel
                      value="all-except"
                      control={<Radio size="small" />}
                      label={
                        t('apply-to-all-child-accounts-except') ||
                        'Apply to all child accounts except selected'
                      }
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
                  ? t('select-child-accounts') || 'Select Child Accounts'
                  : t('select-accounts-to-exclude') || 'Select Accounts to Exclude'}
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
                  {t('deselect-all-accounts') || 'Deselect All'}
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
                  {t('select-all-accounts') || 'Select All'}
                </Button>
              </Box>
            </Box>

            {selectedAccounts.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {selectedAccounts.length}{' '}
                {selectedAccounts.length === 1
                  ? t('account-singular') || 'account'
                  : t('accounts-plural') || 'accounts'}{' '}
                {t('selected-lowercase') || 'selected'}
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
            {t('permission-configuration') || 'Permission Configuration'}
          </Typography>
          <Typography sx={styles.sectionDescription}>
            {t('permission-configuration-description') ||
              'Select behavior categories and specific behaviors to grant permissions'}
          </Typography>

          <Box sx={styles.permissionContainer}>
            {/* Behavior Category Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>
                {t('behavior-category') || 'Behavior Category'}
              </Typography>
              <List sx={styles.permissionList}>
                {PERMISSION_CATEGORIES.map((cat) => (
                  <ListItemButton
                    key={cat.category}
                    onClick={() => handleCategorySelect(cat.category)}
                    selected={selectedCategory === cat.category}
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
                    <Typography variant="body2">{cat.category}</Typography>
                  </ListItemButton>
                ))}
              </List>
            </Box>

            {/* Behavior Name Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>
                {t('behavior-name') || 'Behavior Name'}
              </Typography>
              <List sx={styles.permissionList}>
                {selectedCategoryData?.behaviors.map((behavior) => {
                  const isSelected = selectedPermissions[selectedCategory]?.includes(behavior)
                  return (
                    <ListItem key={behavior} disablePadding>
                      <ListItemButton
                        onClick={() => handleBehaviorToggle(selectedCategory, behavior)}
                        sx={styles.behaviorItem(theme)}
                      >
                        <Checkbox checked={isSelected} size="small" sx={{ padding: 0 }} />
                        <Typography variant="body2">{behavior}</Typography>
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Box>

            {/* Selected Behavior Column */}
            <Box sx={styles.permissionColumn}>
              <Typography sx={styles.permissionColumnHeader}>
                {t('selected-behavior') || 'Selected Behavior'}
              </Typography>
              {getAllSelectedBehaviors().length === 0 ? (
                <Typography sx={styles.noSelectionText}>
                  {t('no-behaviors-selected') || 'No behaviors selected'}
                </Typography>
              ) : (
                <List sx={styles.permissionList}>
                  {getAllSelectedBehaviors().map(({ category, behavior }) => (
                    <ListItem key={`${category}-${behavior}`} disablePadding>
                      <Box sx={styles.selectedBehaviorItem(theme)}>
                        <Typography variant="body2">{behavior}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveBehavior(category, behavior)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
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
