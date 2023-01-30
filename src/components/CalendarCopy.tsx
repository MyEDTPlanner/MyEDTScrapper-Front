import React, { RefObject } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  listenBySelector,
  EventHoveringArg,
  EventMountArg,
} from "@fullcalendar/react";
import { getEventColor } from "../utils/event-color";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
//import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import { Modal } from "./Modal";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface CalendarState {
  weekendsVisible: boolean;
  dialogGroupsOpen: boolean;
  groupList: string[];
  currentGroup: string;
  currentEvents: EventApi[];
}

export default class CalendarCopy extends React.Component<{}, CalendarState> {
  state: CalendarState = {
    weekendsVisible: false,
    dialogGroupsOpen: false,
    groupList: [],
    currentGroup: "",
    currentEvents: [],
  };
  calendarRef: RefObject<FullCalendar> = React.createRef();

  handleDialogGroupsOpen = () => {
    console.log("Bouton groupe cliqué");
    this.setState({ dialogGroupsOpen: true });
  };

  handleDialogGroupsClose = (group: string) => {
    this.setState({ dialogGroupsOpen: false });

    if (group !== "") {
      console.log("Groupe choisi : ", group);
      this.setState({ currentGroup: group });

      fetch(`${process.env.REACT_APP_API_URL}/refresh-events/${group}`)
        .then((response) => response.json())
        .then((data) => {
          let eventList = data.result.map((e: any) => {
            return { ...e, ...getEventColor(e.type) };
          });
          let events = {
            events: eventList,
          };

          if (this.calendarRef !== null && this.calendarRef.current !== null) {
            let calendarApi = this.calendarRef.current.getApi();
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(events);
            console.log("Resultat", data.result);
          }
        });
    }
  };

  fullCalendarButtons = {
    selectGroup: {
      text: "Groupe",
      click: this.handleDialogGroupsOpen,
    },
  };
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/refresh-groups`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ groupList: data.result });
        console.log("Resultat", data.result);
      });
  }

  render() {
    return (
      <div className="app">
        {this.renderSidebar()}
        <div className="app-main">
          <FullCalendar
            ref={this.calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today selectGroup",
              center: "title",
              right: "customTimeGridWeek,listDay",
            }}
            initialView="customTimeGridWeek"
            customButtons={this.fullCalendarButtons}
            navLinks={true}
            locales={[frLocale]}
            locale="fr"
            //editable={true}
            //selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            //select={this.handleDateSelect}
            //eventContent={renderEventContent} // custom render function
            //eventClick={this.handleEventClick}
            eventMouseEnter={this.handleEventMouseEnter}
            //eventDidMount={this.handleEventDidMount}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            views={{
              customTimeGridWeek: {
                type: "timeGridWeek",
                buttonText: "Semaine",
                allDaySlot: false,
                slotMinTime: "08:00:00",
                slotMaxTime: "17:00:00",
                expandRows: true,
                //weekends: false,
                //firstDay: 1,
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
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          <Modal
            isOpen={this.state.dialogGroupsOpen}
            handleClose={this.handleDialogGroupsClose}
            list={this.state.groupList}
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-section">
          <h2>MyEDTPlanner</h2>
        </div>
        <div className="app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            Afficher les week-ends
          </label>
        </div>
        {this.renderProchaineExamens(this.state.currentEvents)}
      </div>
    );
  }
  renderProchaineExamens(events: EventApi[]) {
    let listExamens: EventApi[];
    listExamens = events.filter(
      (event) =>
        event.extendedProps.type === "Examen"
        && event.start
        && event.start > new Date()
    );
    return (
      <div className="app-sidebar-section">
        <h2>Prochains examens ({listExamens.length})</h2>
        <ul>{listExamens.map(renderSidebarEvent)}</ul>
      </div>
    );
  }
  handleEventMouseEnter = (mouseEnterInfo: EventHoveringArg) => {
    //mouseEnterInfo.el.style.borderColor = "red";
    console.log(mouseEnterInfo);
    //Add a tooltip to the event with the description.
    //mouseEnterInfo.el.setAttribute("title", mouseEnterInfo.event.extendedProps.description);
    let instance = tippy(mouseEnterInfo.el, {
      content: mouseEnterInfo.event.title,
      //trigger: 'click',
    });
    console.log("tada");
    //instance.disable();
    //instance.show();
  }
  handleEventDidMount = (info: EventMountArg) => {
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  /**handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };**/

  handleEventClick = (clickInfo: EventClickArg) => {
    /**if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
       clickInfo.event.remove()
    }**/
  };

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventContent: EventContentArg) {
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
}

function renderAttendees(
  attendees:
    | { firstname: string | undefined; lastname: string | undefined }[]
    | undefined
) {
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

function renderLocations(locations: string[] | undefined) {
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
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
