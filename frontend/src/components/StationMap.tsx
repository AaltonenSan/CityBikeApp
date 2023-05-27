import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// Leaflet map setup
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Station } from '../types';
L.Icon.Default.imagePath = 'images/';

type StationMapProps = {
  station: Station;
};

export default function StationMap({ station }: StationMapProps) {
  return (
    <MapContainer
      center={[station.y, station.x]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[station.y, station.x]}>
        <Popup>
          <b>{station.name}</b> <br /> {station.osoite}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
