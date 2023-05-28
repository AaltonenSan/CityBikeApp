import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// Leaflet map setup
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
L.Icon.Default.imagePath = 'images/';

type StationMapProps = {
  x: number;
  y: number;
  name: string;
  osoite: string;
};

export default function StationMap({ x, y, name, osoite }: StationMapProps) {
  return (
    <MapContainer
      center={[y, x]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[y, x]}>
        <Popup>
          <b>{name}</b> <br /> {osoite}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
