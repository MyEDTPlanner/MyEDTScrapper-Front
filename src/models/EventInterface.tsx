export interface EventInterface {
    start: string,
    end: string,
    title: string,
    type: string,
    description: string,
    locations: string[],
    attendees: {
        firstname: string | null,
        lastname: string | null
    }[],
    groups: string[],
    done: boolean,
    presential: boolean,
    code: string,
    uuid: string,
};