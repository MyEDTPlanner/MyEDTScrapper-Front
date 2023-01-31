interface colorsType {
  [key: string]: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
}

const eventColor: colorsType = {
  Cours: {
    backgroundColor: "#48cae4",
    borderColor: "#48cae4",
    textColor: "#000000",
  },
  Examen: {
    backgroundColor: "#ff7f51",
    borderColor: "#ff7f51",
    textColor: "#000000",
  },
  TP: {
    backgroundColor: "#ffb703",
    borderColor: "#ffb703",
    textColor: "#000000",
  },
  TD: {
    backgroundColor: "#fbff12",
    borderColor: "#fbff12",
    textColor: "#000000",
  },
  other: {
    backgroundColor: "#fad2e1",
    borderColor: "#fad2e1",
    textColor: "#000000",
  },
};

export const getEventColor = (eventType: string) => {
  if (eventColor[eventType]) return eventColor[eventType];
  return eventColor.other;
}
