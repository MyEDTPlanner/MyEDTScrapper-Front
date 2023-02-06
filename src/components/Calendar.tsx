import * as React from 'react';
import {
    Box,
    CircularProgress,
    Backdrop
} from '@mui/material';

import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  listenBySelector,
  EventHoveringArg,
  EventMountArg,
  EventInputTransformer,
} from "@fullcalendar/react";
import { getEventColor } from "../utils/event-color";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import { Modal } from "./Modal";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { EventInterface } from '../models/EventInterface';



type CalendarProps = {
  events: EventInterface[];
  settings : {
      showUniversityPresence: boolean;
      showWeekends: boolean;
  };
  handleCurrentEventChange: (uuid: string) => void;
  isEventRefreshInProgress: boolean;
};

export const Calendar = ({events, settings, handleCurrentEventChange, isEventRefreshInProgress}: CalendarProps) => {
  const handleEventMouseEnter = (event: EventHoveringArg) => {
    handleCurrentEventChange(event.event.extendedProps.uuid);
  };

  const handleEventsFiltering = (events: EventInterface[]) => {
    return events.filter((e) => !e.universityPresence || settings.showUniversityPresence);
  };

  return (
      <Box sx={{ height:"100%" }}>
        <Backdrop open={isEventRefreshInProgress} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <CircularProgress color="inherit" />
        </Backdrop>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          height="100%"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "customTimeGridWeek,listDay",
          }}
          initialView="customTimeGridWeek"
          navLinks={true}
          locales={[frLocale]}
          locale="fr"
          selectMirror={true}
          dayMaxEvents={true}
          weekends={settings.showWeekends}
          events={handleEventsFiltering(events)}
          eventDataTransform={handleEventColor}
          
          eventContent={renderEventContent} // custom render function
          //eventClick={this.handleEventClick}
          eventMouseEnter={handleEventMouseEnter}
          views={{
            customTimeGridWeek: {
              type: "timeGridWeek",
              buttonText: "Semaine",
              allDaySlot: false,
              slotMinTime: "08:00:00",
              slotMaxTime: "17:00:00",
              expandRows: true,
              slotLabelInterval: "00:30:00",
              slotLabelFormat: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              },
              nowIndicator: true,
            },
          }}
          /* you can update a remote database when these fire:
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          eventDidMount={this.handleEventDidMount}
          eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          select={this.handleDateSelect}
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </Box>
  );
};

const handleEventColor = (event: any | null) => {
  return {
    ...event,
    ...getEventColor(event?.type)
  };
};

const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <Box sx={{overflow: 'hidden', height: '100%', fontSize: '12px'}} >
      <b>{eventContent.timeText}</b>
      <br />
      <span>
        {eventContent.event.extendedProps.type} - {eventContent.event.title}
      </span>
      <br />
      {renderAttendees(eventContent.event.extendedProps.attendees)}
      {renderLocations(eventContent.event.extendedProps.locations)}
    </Box>
  );
};

const renderLocations = (locations: string[] | undefined) => {
  if (locations === undefined || locations.length === 0) {
    return;
  } else {
    return (
      <>
        <span>{locations.join(", ")}</span>
        <br />
      </>
    );
  }
};

const renderAttendees = (
  attendees:
    { firstname: string | undefined; lastname: string | undefined }[]
    | undefined
) => {
  if (attendees === undefined || attendees.length === 0) {
    return "";
  } else {
    return (
      <>
        <span>
          {attendees
            .map((attendee) => `${attendee.firstname} ${attendee.lastname}`)
            .join(", ")}
        </span>
        <br />
      </>
    );
  }
}