import { LocationInterface } from '../models/LocationInterface';
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from "geojson";

const REGEX_SALLE = /^(RFC|IBGBI|PEL|AX|BX|CX|1CY|IDF|MAU|IUT)/;

export const buildingLocations = [
    {
        "id": "bb11ad80-b157-42f7-a459-aa697693a87f",
        "title": "Bâtiment Île-de-France",
        "code": "IDF",
        "latitude": "48.62417021708663",
        "longitude": "2.4273035803103085",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/bd/bdfe50ff636108777fc17dcd74b3ea292ec7c94e6ca599b3a80460dee7898491.JPG"
        },
        "description": ""
    },
    {
        "id": "a423bd02-6fa2-4238-8fbe-1865ce94252a",
        "title": "Bâtiment Maupertuis",
        "code": "MAU",
        "latitude": "48.62347521629422",
        "longitude": "2.427094280968504",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/99/99ba2247feb9b19caab83fa4e10effa957d821fe89d4a856bf092c0946a919a3.JPG"
        },
        "description": ""
    },
    {
        "id": "9e8c7d8d-d22d-48f1-8295-31206706aef9",
        "title": "Bâtiment 1ers Cycles",
        "code": "1CY",
        "latitude": "48.62375114728314",
        "longitude": "2.424490227583078",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/6c/6ce57ed58c7ac11cf87269a6f0a408b090af835ed8ae25272c37c58cd28fd758.JPG"
        },
        "description": ""
    },
    {
        "id": "470c7e42-6f4b-427f-b643-b8364a266539",
        "title": "Bâtiment Facteur Cheval",
        "code": "RFC",
        "latitude": "48.631980607876",
        "longitude": "2.432228693553043",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/c0/c0d2b8d6c45a873d815d51b47f76b23e864306b1b6eb004e23d0a00edebef3c9.jpg"
        },
        "description": ""
    },
    {
        "id": "578fb93e-2f85-4444-90ce-7b6e1baa105c",
        "code": "PEL",
        "title": "Bâtiment Pelvoux",
        "latitude": "48.613768681802036",
        "longitude": "2.428841916801275",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/49/4933004e229411320d70e02ed87b258ca9a78efeec2b041ab7e9962722bda029.jpeg"
        },
        "description": ""
    },
    {
        "id": "b706b060-046a-4db9-8167-db941fb8b395",
        "title": "Bâtiment IUT Roméro",
        "code": "IUT",
        "latitude": "48.62272894017647",
        "longitude": "2.4271865525296334",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/c4/c4d64f9eb71c8ca3292bedc545b820a616e03fc8c01374453bb9a511e81e49dc.JPG"
        },
        "description": ""
    },
    {
        "id": "712764ea-7fd7-4f80-abca-5af6f88dca60",
        "title": "Bâtiment I.B.G.B.I.",
        "code": "IBGBI",
        "latitude": "48.62566646034866",
        "longitude": "2.43999907511693",
        "picture": {
            "url": "https://storage.googleapis.com/appscho-myappscho-production/uploads/location/ueve/44/44fee5c7eb3ba47e8d11e4f59d9dc726451d57030f2d51db19e461fead15a321.jpg"
        },
        "description": ""
    }
];

export const convertLocationToGeoJson = (locations : LocationInterface[]): FeatureCollection<Geometry, GeoJsonProperties> => {
    return {
        type: 'FeatureCollection',
        features: locations.map((location) => {
            const data: Feature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [Number(location.longitude), Number(location.latitude)],
                },
                properties: {
                    id: location.id,
                    title: location.title,
                    description: location.description,
                    picture: location.picture,
                },
            };
            return data;
        }),
    };
}

export const getBuildingLocation = (locations: string[]) => {
    const place = locations[0];
    const match = place.match(REGEX_SALLE);
    if (match) {
        let code = match[1];
        switch (code) {
            case 'AX':
                code = 'PEL';
                break;
            case 'BX':
                code = 'PEL';
                break;
            case 'BX':
                code = 'PEL';
                break;
        }
        const location = buildingLocations.find((loc) => loc.code && loc.code === code);
        if (location) {
            return location;
        } else {
            return null;
        }
    }
}