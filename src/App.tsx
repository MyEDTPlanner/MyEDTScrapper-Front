import React, { useEffect, useState } from "react";
import { FC } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";
import { Calendar } from "./components/Calendar";
import { retrieveGroups, retrieveEvents, refreshEventsData } from "./utils/database";
//import CalendarCopy from "./components/CalendarCopy";

import "./index.css";

interface SettingsInterface {
  showUniversityPresence: boolean;
  showWeekends: boolean;
};

interface GroupInterface {
  name: string;
  code: string;
};

interface EventInterface {
  start: string,
  end: string,
  title: string,
  type: string,
  description: string,
  locations: string[],
  attendees: string[],
  groups: string[],
  done: boolean,
  presential: boolean,
  code: string,
  uuid: string,
};

const defaultSelectedGroup: GroupInterface = {name: "M2 Miage App", code: "M2MIAA"};
const defaultGroups: GroupInterface[] = [
  {name: "Groupe 1", code: "groupe1"},
  {name: "Groupe 2", code: "groupe2"},
  {name: "Groupe 3", code: "groupe3"},
  {name: "L3 Miage App", code: "L3MIAA"},
  {name: "M1 Miage App", code: "M1MIAA"},
  {name: "M2 Miage App", code: "M2MIAA"}
];
const defaultSettings: SettingsInterface = {
  showUniversityPresence: true,
  showWeekends: false
};

const App: FC = () => {
  const [settings, setSettings] = useState<SettingsInterface>(defaultSettings);
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
    setSelectedGroup(value);
    retrieveEvents(value.code).then((events) => {
      if(events.length > 0) {
        setEvents(events);
      } else {
        refreshEventsData(value.code).then((events) => {
          console.log("Fin de récup des events pour le groupe " + value.code + ". Affichage des events");
          retrieveEvents(value.code).then((events) => {
            setEvents(events);
          });
        });
      }
    });
  };
  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, [event.target.name]: event.target.checked});
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} />
      <Navbar settings={settings} groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} handleSettingsChange={handleSettingsChange} />
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', display:'flex', flexDirection: 'column'}}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Calendar settings={settings} events={events} />
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