import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Grid, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import { themeColors } from '../utils/theme-utils';

export const ExpandableListItem = ({
  primaryText,
  secondaryText,
  nestedItems,
}: {
  primaryText: string;
  secondaryText?: string;
  nestedItems: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          <Grid item container>
            <ListItemText primary={primaryText} primaryTypographyProps={{ variant: 'h3' }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </Grid>
          <Grid item>
            <ListItemText
              primary={secondaryText}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              sx={{ color: themeColors.greyText }}
            />
          </Grid>
        </Grid>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box component="div">{nestedItems}</Box>
      </Collapse>
    </>
  );
};
