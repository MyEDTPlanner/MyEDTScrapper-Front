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

const App: FC = () => {
  const [groups, setGroups] = useState<any[]>([
    {label: "Groupe 1", value: "groupe1"},
    {label: "Groupe 2", value: "groupe2"},
    {label: "Groupe 3", value: "groupe3"},
    {label: "M2 Miage App", value: "M2MIAA"}
  ]);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>({label: "M2 Miage App", value: "M2MIAA"});
  const [selectedEvent, setSelectedEvent] = useState<any>({});
  const [showWeekends, setShowWeekends] = useState<boolean>(false);
  const [showUniversityPresence, setShowUniversityPresence] = useState<boolean>(true);

  const handleGroupChange = (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => {
    setSelectedGroup(value);
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} />
      <Navbar groups={groups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange} />
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