import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Annotation,
} from "react-simple-maps";

const MapContact = () => {
    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [-15.0, -30.0, 0],
                center: [-25, -0],
                scale: 460
            }}
        >
            <Geographies
                geography="features.json"
                // geography="/features.json"
                // geography="../../../../features.json"
                fill="#757575"
                stroke="#FFFFFF"
                strokeWidth={0.5}

            >
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
            <Annotation
                subject={[2.3522, 48.8566]}
                dx={-90}
                dy={-30}
                connectorProps={{
                    stroke: "#00FF7F",
                    strokeWidth: 2,
                    strokeLinecap: "round"
                }}
            >
                <text 
                x="-8"
                textAnchor="end" alignmentBaseline="middle" fill="#00FF7F">
                    {"Paris"}
                </text>
            </Annotation>
        </ComposableMap>
    );
};

export default MapContact;