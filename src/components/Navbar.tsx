import React,{FC} from 'react';
import {
    Drawer,
    Toolbar,
    Box,
    Typography,
    Paper,
    BottomNavigationAction,
    BottomNavigation,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RestoreIcon from '@mui/icons-material/Restore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SettingsTabPanel } from './SettingsTabPanel';
import { PreviewTabPanel } from './PreviewTabPanel';
import { ExamsTabPanel } from './ExamsTabPanel';
import { EventInterface } from '../models/EventInterface';
import { Height } from '@mui/icons-material';

const drawerWidth = 360;
type Props = {
    groups: any[];
    events: EventInterface[];
    selectedGroup: any;
    selectedEvent: EventInterface | null;
    handleGroupChange: (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => void;
    settings : {
        showUniversityPresence: boolean;
        showWeekends: boolean;
    };
    handleSettingsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}; 

export const Navbar = ({settings, groups, selectedGroup, events, selectedEvent, handleGroupChange, handleSettingsChange }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
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
            <TabPanel value={value} index={0}>
              <PreviewTabPanel selectedEvent={selectedEvent} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ExamsTabPanel events={events} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SettingsTabPanel settings={settings} handleSettingsChange={handleSettingsChange} />
            </TabPanel>
          </Box>
          <Paper elevation={0} sx={{ borderTop: 1, borderColor: 'divider' }}>
            <BottomNavigation showLabels={true} value={value} onChange={handleTabChange} >
              <BottomNavigationAction label="Apperçu" icon={<VisibilityIcon />} {...a11yProps(0)} />
              <BottomNavigationAction label="Examen" icon={<RestoreIcon />} {...a11yProps(1)} />
              <BottomNavigationAction label="Paramètre" icon={<SettingsIcon />} {...a11yProps(2)} />
            </BottomNavigation>
          </Paper>
        </Box>
      </Drawer>
    );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`navbar-tabpanel-${index}`}
      aria-labelledby={`navbar-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{height:"100%"}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `navbar-tab-${index}`,
    'aria-controls': `navbar-tabpanel-${index}`,
  };
}