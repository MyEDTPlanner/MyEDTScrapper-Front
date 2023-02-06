import React,{FC} from 'react';
import {
    List,
    ListSubheader,
    Switch,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Divider,
    Box
} from '@mui/material';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import SchoolIcon from '@mui/icons-material/School';

interface SettingsTabPanelProps {
    settings : {
        showUniversityPresence: boolean;
        showWeekends: boolean;
    };
    handleSettingsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SettingsTabPanel = ({settings, handleSettingsChange}: SettingsTabPanelProps) => {
    return (
      <Box sx={{ overflow: 'auto', display: 'flex', height: '100%', maxHeight: '100%', flexDirection: 'column'}}>
        <Box sx={{flexGrow: 1, overflow: 'auto' }} >
          <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
              <Divider />
          </List>
        </Box>
        <Button variant="outlined">Recharger les groupes</Button>    
      </Box> 
    );
};