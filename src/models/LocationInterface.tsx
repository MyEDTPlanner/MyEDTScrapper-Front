export interface LocationInterface {
    id: string;
    code: string;
    title: string;
    latitude: string;
    longitude: string;
    picture: {
        url: string | null;
    };
    description: string;
};