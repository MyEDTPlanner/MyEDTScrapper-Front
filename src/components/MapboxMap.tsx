import React, { useEffect, useState, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import { Paper } from "@mui/material";
import { buildingLocations, convertLocationToGeoJson , getBuildingLocation} from "../utils/building-locations";
import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from "geojson";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

type Props = {
    locations: string[] | undefined;
}; 

export const MapboxMap = ({locations} : Props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!map.current) return; // initialize map only once
        showEventBuilding(locations);
    }, [locations]);

    const showEventBuilding = (locations: string[] | undefined) => {
        if(!locations) return;
        const buildingLocation = getBuildingLocation(locations);
        if (buildingLocation) {
            flyToStore(buildingLocation);
            createPopUp(buildingLocation);
        }
    }

    const flyToStore = (currentFeature: any) => {
        if (!map.current) return;
        map.current.flyTo({
          center: [Number(currentFeature.longitude), Number(currentFeature.latitude)],
          zoom: 15
        });
    }

    const createPopUp = (currentFeature : any) => {
        if (!map.current) return;
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();
        
        const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([Number(currentFeature.longitude), Number(currentFeature.latitude)])
            .setHTML(`<h3>${currentFeature.title}</h3><h4>${currentFeature.description}</h4>`)
            .addTo(map.current);
    }

    const addMarkers = () => {
        if (!map.current) return;
        /* For each feature in the GeoJSON object above: */
        for (const marker of buildingLocations) {
            /* Create a div element for the marker. */
            const el = document.createElement('div');
            /* Assign a unique `id` to the marker. */
            el.id = `marker-${marker.id}`;
            /* Assign the `marker` class to each marker for styling. */
            el.className = 'marker';
        
            /**
             * Create a marker using the div element
             * defined above and add it to the map.
             **/
            new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat([Number(marker.longitude), Number(marker.latitude)])
            .addTo(map.current);

            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createPopUp(marker);
            });
        }
    }
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
    
        map.current = new mapboxgl.Map({
            container: mapContainer.current || "",
            style: "mapbox://styles/trucmuchebidule/cjqgtaec7175d2rl8c826cv6r",
            center: [2.424511145214865, 48.62376373550315],
            zoom: 13.5,
            pitch: 60,
        });
    }, []);
    
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize

        map.current.on('load', () => {
            if (!map.current) return;
            map.current.addSource('places', {
                type: 'geojson',
                data: convertLocationToGeoJson(buildingLocations)
            });
            addMarkers();
        });
    }, []);

    return (
        <Paper sx={{width: "100%", height: "100%"}} ref={mapContainer} variant="outlined" elevation={0} className="map-container">
        </Paper>
    );
};

