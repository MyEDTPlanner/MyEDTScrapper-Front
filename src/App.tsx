import React, { useState } from "react";
import { FC } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";
//import Calendar from "./components/Calendar";

import "./index.css";

interface SettingsInterface {
  showUniversityPresence: boolean;
  showWeekends: boolean;
};

interface GroupInterface {
  label: string;
  value: string;
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

const defaultSelectedGroup: GroupInterface = {label: "M2 Miage App", value: "M2MIAA"};
const defaultGroups: GroupInterface[] = [
  {label: "Groupe 1", value: "groupe1"},
  {label: "Groupe 2", value: "groupe2"},
  {label: "Groupe 3", value: "groupe3"},
  {label: "L3 Miage App", value: "L3MIAA"},
  {label: "M1 Miage App", value: "M1MIAA"},
  {label: "M2 Miage App", value: "M2MIAA"}
];
const defaultSettings: SettingsInterface = {
  showUniversityPresence: true,
  showWeekends: false
};

const App: FC = () => {
  const [settings, setSettings] = useState<SettingsInterface>(defaultSettings);
  const [selectedGroup, setSelectedGroup] = useState<GroupInterface | null>(defaultSelectedGroup);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
  const [groups, setGroups] = useState<GroupInterface[]>(defaultGroups);
  const [events, setEvents] = useState<EventInterface[]>([]);
  

  const handleGroupChange = (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => {
    setSelectedGroup(value);
  };
  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("La bouton a été cliqué", event.target.name);
    console.log(event.target.checked);
    setSettings({...settings, [event.target.name]: event.target.checked});
    //setSettings({...settings, showWeekends: event.target.checked});
    //event.target.checked = !event.target.checked;
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} />
      <Navbar settings={settings} groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} handleSettingsChange={handleSettingsChange} />
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

//https://stackoverflow.com/questions/74239730/mui-autocomplete-does-not-fully-appear-in-appbar
//https://codesandbox.io/s/blue-wave-o3qrfz?file=/demo.tsx:2614-2635

//https://mui.com/material-ui/react-bottom-navigation/
//https://mui.com/material-ui/react-tabs/
//https://github.com/oliviertassinari/react-swipeable-views