import * as React from 'react';
import {
    Box
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
//import { INITIAL_EVENTS } from "../utils/event-utils";
import { Modal } from "./Modal";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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

type CalendarProps = {
  events: EventInterface[];
  settings : {
      showUniversityPresence: boolean;
      showWeekends: boolean;
  };
};

export const Calendar = ({events, settings}: CalendarProps) => {
  return (
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
        events={events}
        eventDataTransform={handleEventColor}
        //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        //eventContent={renderEventContent} // custom render function
        //eventClick={this.handleEventClick}
        //eventMouseEnter={this.handleEventMouseEnter}
        //eventDidMount={this.handleEventDidMount}
        //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
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
        select={this.handleDateSelect}
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />
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
    <>
      <b>{eventContent.timeText}</b>
      <br />
      <span>
        {eventContent.event.extendedProps.type} - {eventContent.event.title}
      </span>
      <br />
      {renderAttendees(eventContent.event.extendedProps.attendees)}
      {renderLocations(eventContent.event.extendedProps.locations)}
    </>
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