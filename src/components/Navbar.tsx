import React,{FC} from 'react';
import {
    Drawer,
    Toolbar,
    Box,
    List,
    ListSubheader,
    Switch,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    BottomNavigationAction,
    BottomNavigation,
    Divider,
    Autocomplete,
    TextField
} from '@mui/material';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import RestoreIcon from '@mui/icons-material/Restore';
import VisibilityIcon from '@mui/icons-material/Visibility';

const drawerWidth = 360;
type Props = {
    groups: any[];
    selectedGroup: any;
    handleGroupChange: (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => void;
}; 

export const Navbar = ({groups, selectedGroup, handleGroupChange}: Props) => {
    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', height: '100%', maxHeight: '100%', flexDirection: 'column'}}>
          <Box sx={{flexGrow: 1, overflow: 'auto' }} >
          <List
            sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Paramètres</ListSubheader>}
          >
            <ListItem>
              <ListItemIcon>
                <OutdoorGrillIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary="Week-end" secondary="Masquer les week-end" />
              <Switch
                edge="end"
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-bluetooth" primary="Présence universitaire" secondary="Masquer les présences universitaires" />
              <Switch
                edge="end"
                inputProps={{
                  'aria-labelledby': 'switch-list-label-bluetooth',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-bluetooth" primary="Groupe" secondary="Votre classe" />
              <Autocomplete
                disablePortal
                options={groups}
                value={selectedGroup || null}
                //inputValue={selectedGroup.label}
                getOptionLabel={(option) => option.label}
                onChange={handleGroupChange}
                sx={{ minWidth: 120 }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Code" />}
              />
            </ListItem>
          </List>
          <Divider />
          </Box>
          <Paper elevation={0}>
            <Divider />
            <BottomNavigation
              showLabels
            >
              <BottomNavigationAction label="Apperçu" icon={<VisibilityIcon />} />
              <BottomNavigationAction label="Examen" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Paramètre" icon={<SettingsIcon />} />
            </BottomNavigation>
          </Paper>
        </Box>
      </Drawer>
    );
};