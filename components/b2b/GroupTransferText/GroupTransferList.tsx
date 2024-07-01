import * as React from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

function not(a: readonly Group[], b: readonly Group[]) {
  return a.filter((value) => b.findIndex(group => group.code === value.code) === -1);
}

function intersection(a: readonly Group[], b: readonly Group[]) {
  return a.filter((value) => b.findIndex(group => group.code === value.code) !== -1);
}

type Group = {
    "name":"string",
    "code":"string",
    "accountId": number,
    "description":"string"
}

interface GroupTransferListProps {
    groupsList: any[],
    selectedGroups: any[]
}

export default function GroupTransferList({ groupsList, selectedGroups }: GroupTransferListProps) {
  const [checked, setChecked] = React.useState<readonly Group[]>([]);
  const [left, setLeft] = React.useState<readonly Group[]>(groupsList);
  const [right, setRight] = React.useState<readonly Group[]>(selectedGroups);

  if(!groupsList || !selectedGroups) return null;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Group) => () => {
    const currentIndex = checked.findIndex(each => each.code === value.code);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: readonly Group[]) => (
    <Paper sx={{  overflow: 'auto', minHeight: 150 }}>
      <List dense component="div" role="list">
        {items?.map((value) => {
          const labelId = `transfer-list-item-${value.code}-label`;

          return (
            <ListItemButton
              key={value.code}
              role="listitem"
              onClick={handleToggle(value)}
              selected={checked.findIndex(each => each.code === value.code) !== -1}
            >
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} sm={5}>{customList(left)}</Grid>
      <Grid item xs={12} sm={2}>
        <Grid container direction={{xs: 'row', sm: 'column'}} alignItems="center" justifyContent="center">
          <Button
            sx={{ m: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left?.length === 0}
            aria-label="move all right"
          >
            <Box component={"span"} sx={{ transform: {xs: 'rotate(90deg)', sm: 'rotate(0deg)'}}}>
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
            <Box component={"span"} sx={{ transform: {xs: 'rotate(90deg)', sm: 'rotate(0deg)'}}}>
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
            <Box component={"span"} sx={{ transform: {xs: 'rotate(90deg)', sm: 'rotate(0deg)'}}}>
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
            <Box component={"span"} sx={{ transform: {xs: 'rotate(90deg)', sm: 'rotate(0deg)'}}}>
                ≪
            </Box>
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5}>{customList(right)}</Grid>
    </Grid>
  );
}
