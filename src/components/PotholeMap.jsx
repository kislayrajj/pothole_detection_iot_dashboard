import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import {HeatmapLayer} from 'react-leaflet-heatmap-layer-v3';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const PotholeMap = ({ events }) => {
  const defaultPosition = [30.7634, 76.6016]; // Default to your demo location
  const mapCenter = events.length ? [events[0].lat, events[0].lon] : defaultPosition;
  const mapRef = useRef(null);

  // 1. Data for the Heatmap [lat, lon, intensity]
  const heatmapData = events.map(e => [e.lat, e.lon, e.magnitude]);

  // 2. Data for the 10 most recent markers
  const recentMarkers = events.slice(0, 10);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, 14);
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={14}
        className="h-full w-full rounded-lg shadow-lg"
        style={{ zIndex: 1, minHeight: '300px' }}
      >
      {/* Use a dark-mode map tile */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {/* Heatmap Layer */}
      <HeatmapLayer
        points={heatmapData}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => m[2]}
        radius={25}
        blur={20}
        max={5.0} // Max intensity (adjust based on your `magnitude` values)
      />

      {/* Markers for 10 most recent events */}
      {recentMarkers.map((event) => (
        <Marker key={event.id} position={[event.lat, event.lon]}>
          <Popup>
            <div className="font-sans">
              <h4 className="font-bold text-base">Impact: {event.magnitude} G</h4>
              <p><strong>Severity:</strong> {event.severity}</p>
              <p><strong>Time:</strong> {event.timestamp.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
      <button
        onClick={handleRecenter}
        className="absolute top-2 right-2 bg-gray-800 text-white p-3 rounded-md shadow-lg hover:bg-gray-700 transition-colors z-[10]"
        aria-label="Recenter map"
        title="Recenter map"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.458-7.5 11.458s-7.5-4.316-7.5-11.458a7.5 7.5 0 1115 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default PotholeMap;