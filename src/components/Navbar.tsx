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
    settings : {
        showUniversityPresence: boolean;
        showWeekends: boolean;
    };
    handleSettingsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}; 

export const Navbar = ({settings, groups, selectedGroup, handleGroupChange, handleSettingsChange}: Props) => {
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
              <ListItemText id="switch-list-label-wifi" primary="Week-end" secondary={settings.showWeekends?"Afficher les week-end":"Masquer les week-end"} />
              <Switch
                onChange={handleSettingsChange}
                checked={settings.showWeekends}
                edge="end"
                inputProps={{
                    'name': 'showWeekends',
                    'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText id="switch-list-label-bluetooth" primary="Présence universitaire" secondary={settings.showUniversityPresence?"Afficher les présences universitaires":"Masquer les présences universitaires"} />
              <Switch
                onChange={handleSettingsChange}
                checked={settings.showUniversityPresence}
                edge="end"
                inputProps={{
                    'name': 'showUniversityPresence',
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