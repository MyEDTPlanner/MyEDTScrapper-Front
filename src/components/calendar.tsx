import React from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import { Modal } from "./Modal";

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  dialogGroupsOpen: boolean;
  groupList: string[];
  currentGroup: string;
}

export default class Calendar extends React.Component<{}, CalendarState> {
  state: CalendarState = {
    weekendsVisible: false,
    currentEvents: [],
    dialogGroupsOpen: false,
    groupList: [],
    currentGroup: "",
  };

  handleDialogGroupsOpen = () => {
    console.log("Bouton groupe cliqué");
    this.setState({ dialogGroupsOpen: true });
  };

  handleDialogGroupsClose = (group: string) => {
    this.setState({ dialogGroupsOpen: false });
    console.log("Groupe choisi : ", group);
  };

  fullCalendarButtons = {
    selectGroup: {
      text: "Groupe",
      click: this.handleDialogGroupsOpen,
    },
  };
  componentDidMount() {
    fetch("http://localhost:2001/refresh-groups")
      .then((response) => response.json())
        .then((data) => {
          this.setState({groupList: data.result})
          console.log('Resultat', data.result)
        });
  };
 
  render() {
    return (
      <div className="app">
        {this.renderSidebar()}
        <div className="app-main">
          <FullCalendar
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
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
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
          <Modal isOpen={this.state.dialogGroupsOpen} handleClose={this.handleDialogGroupsClose} list={this.state.groupList}/>
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
        <div className="app-sidebar-section">
          <h2>Prochains examens ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
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
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    // if (alert(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
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
      <i>{eventContent.event.title}</i>
    </>
  );
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
