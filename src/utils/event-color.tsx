interface colorsType {
    [key: string]: {
        backgroundColor: string,
        borderColor: string,
        textColor: string
    };
};

const eventColor: colorsType = {
    'Cours':{
        backgroundColor:'#3F51B5',
        borderColor: '#3F51B5',
        textColor: '#000000'
    },
    'Examen':{
        backgroundColor: '#F44336',
        borderColor: '#F44336',
        textColor: '#FFFFFF'
    },
    'TP':{
        backgroundColor: '#FF9800',
        borderColor: '#FF9800',
        textColor: '#000000'
    },
    'TD':{
        backgroundColor: '#FFEB3B',
        borderColor: '#FFEB3B',
        textColor: '#FFFFFF'
    },
    'other':{
        backgroundColor: '#009688',
        borderColor: '##009688',
        textColor: '#FFFFFF'
    }
}
export function getEventColor(eventType: string){
    if(eventColor[eventType])
        return eventColor[eventType];
    return eventColor.other;
}