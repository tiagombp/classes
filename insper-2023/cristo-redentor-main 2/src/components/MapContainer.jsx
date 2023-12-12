import React from "react";
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export function MapContainer({ mapRef }) {
    // zoom init: 11 - sem marcador
    // zoom final: 18.6
    const MAPBOX_TOKEN="pk.eyJ1Ijoic2VyZ2luaG92aWVpcmEiLCJhIjoiY2xscjdqOWM2MGlpajNobnJjczBna2VnbyJ9.UvdODn6RIho2IolIf8jWKA"

    return (
        <Map
            ref={mapRef}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude:-43.210857,
                latitude: -22.951975,
                zoom: 11
            }}
            style={{width: "100vw", height: "100vh", position: "fixed", top:0, left:0 }}
            mapStyle="mapbox://styles/serginhovieira/clp6ak1wz00vy01nwfgt3106x"
            mapboxAccessToken={MAPBOX_TOKEN}
            doubleClickZoom={false}
            scrollZoom={false}
        >
            <Marker longitude={-43.210857} latitude={-22.951975} color="red" />
        </Map>
    )
}
