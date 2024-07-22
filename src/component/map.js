import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

const MapComponent = ({ address }) => {
    const customIcon = new L.Icon({
        iconUrl: require("./icon.png"),
        iconSize: [38, 38]
    });
    
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
            const data = await response.json();
            if (data && data[0]) {
                const { lat, lon } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
            }
        };

        fetchCoordinates();
    }, [address]);

    if (!position) return <div>Loading...</div>;

    return (
        <MapContainer className='square-map' center={position} zoom={20} style={{ height: '100%', width: '30%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
