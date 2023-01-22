import React from "react";
import { FC } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WeekendIcon from '@mui/icons-material/Weekend';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import GroupIcon from '@mui/icons-material/Group';
import Calendar from "./components/calendar";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import "./index.css";
const drawerWidth = 360;


const App: FC = () => {
  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Agenda
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Code</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Groupe"
                >
                  <MenuItem value={10}>M2MIAA</MenuItem>
                  <MenuItem value={20}>M1MIAA</MenuItem>
                  <MenuItem value={30}>L3MIAA</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
