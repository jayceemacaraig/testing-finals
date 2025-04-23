import React, { useState, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RenderMap from "./components/RenderMap";

const Testing = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const first = [121.60989471472136,13.961033078240892];
  const second = [121.61251008510591,13.929558707111305];
  const third = [121.62403821945192,13.94101784629443];
  const [segment, setSegment] = useState([]);
  const [list, setList] = useState([]);
const routeLayer = useRef(null)
  var myLines = {
    type: "LineString",
    coordinates: segment,
  };

  const apiKey = process.env.OPENROUTESRVICE_API_KEY;

  const fetchAndDrawRoute = async () => {
    try {
      const body = {
        coordinates: [first, second, third],
        radiuses: [1000, 1000, 1000],
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
      console.log(response.data);
      const initList = response.data.features[0].geometry.coordinates;
      setList(initList);
    } catch (error) {
      console.error("Route error:", error);
      alert("Routing failed. Check your coordinates and try again.");
    }
  };

  const showRoute = () => {
    console.log(segment);
    const layer = L.geoJSON(myLines).addTo(map);
    map.fitBounds(layer.getBounds());
    routeLayer.current = layer
  };

  const NextCoordinates = () => {
    const firstSeg = findClosestIndex(list, second);
    console.log(list);
    console.log("Index of second Coordinate in the List : ", firstSeg);
    console.log("Indexing ng second coordinate :", list[firstSeg]);
    console.log("Second Coordinate : ", second);
    console.log(list.slice(0, firstSeg + 1));
    setSegment(list.slice(0, firstSeg + 1));
    console.log("First Segment : ", segment);
  };

  const findClosestIndex = (list, target) => {
    return list.findIndex(([lng, lat]) => {
      const [targetLng, targetLat] = target;
      const lngDiff = Math.abs(lng - targetLng);
      const latDiff = Math.abs(lat - targetLat);
      return lngDiff < 0.0005 && latDiff < 0.0005;
    });
  };

  const nextSegment = () => {
    map.removeLayer(routeLayer.current)
    const firstSeg = findClosestIndex(list, second);
    const secondSeg = findClosestIndex(list, third);
    setSegment(list.slice(firstSeg, secondSeg))
    showRoute()
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={fetchAndDrawRoute}
      >
        Fetch
      </button>
      <div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={NextCoordinates}
        >
          Segmenting Coordinates
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={showRoute}
        >
          Show Route
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={nextSegment}
        >
          Next Route
        </button>
      </div>
      <RenderMap mapRef={mapRef} L={L} setMap={setMap} />
    </div>
  );
};

export default Testing;
