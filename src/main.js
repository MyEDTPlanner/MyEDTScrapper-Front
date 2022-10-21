import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  // on instancie le calendrier
  var calendar = new Calendar(calendarEl, {
    // on ajoute les plugins
    plugins: [timeGridPlugin, listPlugin],
    initialView: "customTimeGridWeek",
    customButtons: {
      myCustomButton: {
        text: "groupe",
        click: function () {
          alert("clicked the custom button!");
        },
      },
    },
    headerToolbar: {
      left: "prev next today myCustomButton",
      center: "title",
      right: "customTimeGridWeek,listDay",
    },
    //initialDate: "2022-01-01",
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    locales: [frLocale],
    locale: "fr",

    dayMaxEvents: true, // allow "more" link when too many events

    views: {
      customTimeGridWeek: {
        type: "timeGridWeek",
        //duration: { days: 7 },
        buttonText: "semaine",
        allDaySlot: false,
        slotMinTime: "08:00:00",
        slotMaxTime: "19:00:00",
        expandRows: true,
        weekends: false,
        //firstDay: 1,
        slotLabelInterval: "00:30:00",
        slotLabelFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
        nowIndicator: true,
      },
    },
    events: [
      {
        title: "event1",
        start: "2022-11-03",
        allDay: true,
      },
      {
        title: "event2",
        start: "2022-11-09T12:30:00",
      },
      {
        title: "event3",
        start: "2022-11-11T12:30:00",

        allDay: false, // will make the time show
      },
    ],
  });

  calendar.render();
});
