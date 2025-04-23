import React, { useState, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RenderMap from "./components/RenderMap";

const App = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coordInput, setCoordInput] = useState("");
  const [segments, setSegments] = useState([]);
  const routeLayerRef = useRef(null);
  const currentLegIndex = useRef(0);

  const apiKey = process.env.OPENROUTESRVICE_API_KEY;

  const fetchAndDrawRoute = async (index, legs) => {
    if (!map || !legs[index]) return;
    if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);

    try {
      const body = {
        coordinates: legs[index],
        radiuses: [1000, 1000],
      };

      console.log("Sending to API:", JSON.stringify(body));
      const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        body,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      const layer = L.geoJSON(response.data).addTo(map);
      map.fitBounds(layer.getBounds());
      routeLayerRef.current = layer;
    } catch (error) {
      console.error("Route error:", error);
      alert("Routing failed. Check your coordinates and try again.");
    }
  };

  const parseCoords = (inputStr) => {
    const parts = inputStr.split(",").map(Number);
    const coords = [];

    for (let i = 0; i < parts.length; i += 2) {
      coords.push([parts[i].toFixed(6), parts[i + 1].toFixed(6)]);
    }
    return coords;
  };

  const segmentCoordinates = () => {
    const points = parseCoords(coordInput);
    if (points.length < 2) return alert("Enter at least 2 coordinate pairs");

    const legs = [];
    for (let i = 0; i < points.length - 1; i++) {
      legs.push([points[i], points[i + 1]]);
    }

    setSegments(legs);
    currentLegIndex.current = 0;
    fetchAndDrawRoute(0, legs);
  };

  const drawNextLeg = () => {
    const nextIndex = currentLegIndex.current + 1;
    if (nextIndex >= segments.length) return;
    currentLegIndex.current = nextIndex;
    fetchAndDrawRoute(nextIndex, segments);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4 flex flex-wrap gap-2 bg-gray-100 shadow-md">
        <input
          type="text"
          placeholder="lng1,lat1,lng2,lat2,..."
          className="p-2 border rounded w-full"
          value={coordInput}
          onChange={(e) => setCoordInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={segmentCoordinates}
        >
          Segment Coordinates
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={drawNextLeg}
        >
          Next Segment
        </button>
      </div>
      <RenderMap mapRef={mapRef} L={L} setMap={setMap} />
    </div>
  );
};

export default App;
