import React, { useEffect, useState } from "react";
import { FC } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";
import { Calendar } from "./components/Calendar";
import { retrieveGroups, retrieveEvents, refreshEventsData } from "./utils/database";
import { EventInterface } from './models/EventInterface';
import { GroupInterface } from './models/GroupInterface';
import { SettingInterface } from './models/SettingInterface';

import "./index.css";

const defaultSelectedGroup: GroupInterface = {name: "M2 Miage App", code: "M2MIAA"};
const defaultGroups: GroupInterface[] = [];
const defaultSettings: SettingInterface = {
  showUniversityPresence: true,
  showWeekends: false
};

const App: FC = () => {
  const [settings, setSettings] = useState<SettingInterface>(defaultSettings);
  const [selectedGroup, setSelectedGroup] = useState<GroupInterface | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [events, setEvents] = useState<EventInterface[]>([]);
  
  useEffect(() => {
    retrieveGroups().then((groups) => {
      setGroups(groups);
    });
  }, []);

  const handleGroupChange = (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => {
    // TODO: Améliorer la gestion des groupes https://stackoverflow.com/questions/29020722/recursive-promise-in-javascript
    setSelectedGroup(value);
    if(value !== null) {
      retrieveEvents(value.code).then((events) => {
        if(events.length > 0) {
          setEvents(events);
        } else {
          refreshEventsData(value.code).then((result) => {
              setEvents(result.events);
          });
        }
      });
    }
  };
  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, [event.target.name]: event.target.checked});
  };

  const handleCurrentEventChange = (uuid: string) => {
    const event = events.find((event) => event.uuid === uuid);
    setSelectedEvent(event || null);
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} />
      <Navbar settings={settings} groups={groups} events={events} selectedGroup={selectedGroup} selectedEvent={selectedEvent} handleGroupChange={handleGroupChange} handleSettingsChange={handleSettingsChange} />
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', display:'flex', flexDirection: 'column'}}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Calendar settings={settings} events={events} handleCurrentEventChange={handleCurrentEventChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;

//https://stackoverflow.com/questions/74239730/mui-autocomplete-does-not-fully-appear-in-appbar
//https://codesandbox.io/s/blue-wave-o3qrfz?file=/demo.tsx:2614-2635

//https://mui.com/material-ui/react-bottom-navigation/
//https://mui.com/material-ui/react-tabs/
//https://github.com/oliviertassinari/react-swipeable-views