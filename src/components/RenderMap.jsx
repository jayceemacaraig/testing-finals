import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RenderMap = ({
  mapRef,
  setMap,
  places,
  setForDescription,
  setActiveTab,
}) => {
  useEffect(() => {
    if (mapRef.current) return; // Prevent reinitializing the map
    const map = L.map("map").setView([13.9359, 121.6124], 16); // Default center
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    setMap(map);
  }, [mapRef, setMap]);

  useEffect(() => {
    if (!mapRef.current) {
      console.error("Map is not initialized!");
      return;
    }

    const map = mapRef.current;

    // Remove existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    places.forEach((place) => {
      if (place.coordinates && place.coordinates.lat && place.coordinates.lng) {
        const marker = L.marker([
          place.coordinates.lat,
          place.coordinates.lng,
        ]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.description}`);
        marker.on("click", () => {
          setForDescription(place.name);
          setActiveTab("description");
        });
      } else {
        console.warn(`Invalid coordinates for place: ${place.name}`);
      }
    });
  }, [places, mapRef]);

  return <div id="map" style={{ height: "100%", width: "115%" }} />;
};

export default RenderMap;
