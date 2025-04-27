import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// const ORS_API_KEY = process.env.OPENROUTESRVICE_API_KEY;

const MapFlyTo = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 16);
  }
  return null;
};

const LucenaGeocodeMap = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [label, setLabel] = useState("");

  const searchLocation = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://api.openrouteservice.org/geocode/search`,
        {
          params: {
            api_key: ORS_API_KEY,
            text: query,
            "boundary.circle.lat": 13.9314,
            "boundary.circle.lon": 121.6179,
            "boundary.circle.radius": 5,
            "boundary.country": "PHL",
          },
        }
      );

      const result = res.data.features[0];
      if (result) {
        const [lon, lat] = result.geometry.coordinates;
        setLocation([lat, lon]);
        setLabel(result.properties.label);
      } else {
        alert("No location found in Lucena.");
      }
    } catch (err) {
      console.error("Geocode error:", err);
    }
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Search in Lucena City..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "250px" }}
        />
        <button onClick={searchLocation} style={{ marginLeft: "0.5rem" }}>
          Search
        </button>
      </div>

      <MapContainer
        center={[13.9314, 121.6179]}
        zoom={14}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
        center={[13.9314, 121.6179]}
        radius={5000}
        pathOptions={{ color: "blue", fillOpacity: 0.1 }}
        />

        {location && (
          <>
            <MapFlyTo coords={location} />
            <Marker position={location}>
              <Popup>{label}</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LucenaGeocodeMap;
