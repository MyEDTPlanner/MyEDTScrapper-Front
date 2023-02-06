import * as React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { EventInterface } from "../models/EventInterface";
import { formatAttendeeName, formatTitleAbbreviation } from "../utils/format";

interface Props {
  events: EventInterface[];
}

export const ExamsTabPanel = ({ events }: Props) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography>Examens</Typography>
      <List dense={true}>
        {getEventExams(events).map((e) => (
          <ListItem key={e.uuid}>
            <ListItemAvatar>
              <Avatar>{formatTitleAbbreviation(e.title)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={e.title}
              secondary={
                [
                  new Date(e.start).toLocaleDateString(),
                  new Date(e.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  e.locations.join(", "),
                  e.attendees.map((name) => formatAttendeeName(name)).join(", ")
                ].filter(Boolean).join(' - ')
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const getEventExams = (events: EventInterface[]) => {
  console.log(events);
  events = events.filter(
    (event) =>
      event.type === "Examen" &&
      event.start &&
      new Date(event.start) > new Date()
  );
  console.log(events);
  return events;
};
