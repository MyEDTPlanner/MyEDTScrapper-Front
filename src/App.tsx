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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from "@mui/material/styles";

import "./index.css";
const drawerWidth = 360;

const groups = [
  {label: "Groupe 1", value: "groupe1"},
  {label: "Groupe 2", value: "groupe2"},
  {label: "Groupe 3", value: "groupe3"},
]; 

//https://stackoverflow.com/questions/74239730/mui-autocomplete-does-not-fully-appear-in-appbar
//https://codesandbox.io/s/blue-wave-o3qrfz?file=/demo.tsx:2614-2635

//https://mui.com/material-ui/react-bottom-navigation/

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "#fff",
  background: "rgba(255, 255, 255, 0.15)",
  borderRadius: "4px",
  width: "100%",
  "& input": {
    color: "#fff !important"
  },
  "& fieldset": {
    borderWidth: "0px",
    "& fieldset:hover, & fieldset:focus, & fieldset:active": {
      borderWidth: "0px"
    },
    "& .MuiInputBase-input": {
      padding: theme.spacing(2, 1, 1, 2),
      transition: theme.transitions.create("width"),
      color: "#fff",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch"
        }
      }
    }
  }
}));

const App: FC = () => {
  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Agenda
          </Typography>
          <Autocomplete
            disablePortal
            options={groups}
            sx={{ width: 300 }}
            renderInput={(params) => 
              <StyledTextField 
                {...params}
                placeholder="Groupe..."
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{ color: "white", marginLeft: "8px" }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            }
          />
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
              <Autocomplete
                disablePortal
                options={groups}
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="Code" />}
              />
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
