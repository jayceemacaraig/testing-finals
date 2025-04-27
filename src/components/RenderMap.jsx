import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RenderMap = ({ mapRef,setMap }) => {
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([13.93349, 121.60331], 16);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([13.93349, 121.60331])
      .addTo(map)
      .bindPopup("Welcome to Lucena!")
      .openPopup();

    setMap(map);

    let popup = L.popup();
    
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent(`[${[e.latlng.lng, e.latlng.lat]}]`)
        .openOn(map);
    }

    map.on("click", onMapClick);
  }, []);
  return <div id="map" style={{ height: "95vh" }}></div>;
};

export default RenderMap;
