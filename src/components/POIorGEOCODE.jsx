import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon
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
const LUCENA_CENTER = [13.9314, 121.6179];
const RADIUS = 5000;

const MapFlyTo = ({ coords }) => {
  const map = useMap();
  if (coords) map.flyTo(coords, 16);
  return null;
};

const GeocodePOIDemo = () => {
  const [query, setQuery] = useState("");
  const [poiType, setPoiType] = useState("eating"); // category
  const [locations, setLocations] = useState([]);
  const [flyCoords, setFlyCoords] = useState(null);

  const handleGeocodeSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get("https://api.openrouteservice.org/geocode/search", {
        params: {
          api_key: ORS_API_KEY,
          text: query,
          "boundary.circle.lat": LUCENA_CENTER[0],
          "boundary.circle.lon": LUCENA_CENTER[1],
          "boundary.circle.radius": RADIUS,
          "boundary.country": "PHL",
        },
      });

      const results = res.data.features.map((f) => ({
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        label: f.properties.label,
      }));
      setLocations(results);
      if (results[0]) setFlyCoords([results[0].lat, results[0].lon]);
    } catch (err) {
      console.error("Geocode error:", err);
    }
  };

  const handlePOISearch = async () => {
    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/pois",
        {
          request: "pois",
          geometry: {
            bbox: [
              [LUCENA_CENTER[1] - 0.05, LUCENA_CENTER[0] - 0.05],
              [LUCENA_CENTER[1] + 0.05, LUCENA_CENTER[0] + 0.05],
            ],
            geojson: {
              type: "Point",
              coordinates: [LUCENA_CENTER[1], LUCENA_CENTER[0]],
            },
            buffer: 5000,
          },
          filters: {
            categories: [[poiType]],
          },
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const pois = res.data.features.map((f) => ({
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        label: f.properties.name || "Unnamed POI",
      }));
      setLocations(pois);
      if (pois[0]) setFlyCoords([pois[0].lat, pois[0].lon]);
    } catch (err) {
      console.error("POI error:", err);
    }
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Search place (Geocode)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleGeocodeSearch}>Geocode Search</button>

        <select
          value={poiType}
          onChange={(e) => setPoiType(e.target.value)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="eating">Restaurants</option>
          <option value="accommodation">Hotels</option>
          <option value="healthcare">Hospitals</option>
          <option value="public_transport">Public Transport</option>
        </select>
        <button onClick={handlePOISearch}>Search POI</button>
      </div>

      <MapContainer
        center={LUCENA_CENTER}
        zoom={13}
        style={{ height: "85vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={LUCENA_CENTER} radius={RADIUS} pathOptions={{ color: "blue", fillOpacity: 0.1 }} />
        {flyCoords && <MapFlyTo coords={flyCoords} />}
        {locations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lon]}>
            <Popup>{loc.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeocodePOIDemo;
