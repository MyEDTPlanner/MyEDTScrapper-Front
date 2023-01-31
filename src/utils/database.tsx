
export const retrieveGroups = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/group`);
    const data = await response.json();
    return data.result;
}

export const retrieveEvents = async (code: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/event?group=${code}`);
    const data = await response.json();
    return data.result;
}

export const refreshEventsData = async (code: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh/events/${code}`);
    const data = await response.json();
    console.log(data);
    return data.result;
}
