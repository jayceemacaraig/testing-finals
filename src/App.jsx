import React, { useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RenderMap from "./components/RenderMap";
import findClosestIndex from "./utils/findClosestIndex";
import fetchCoordinates from "./utils/fetchCoordinates";
import fetchPlaces from "./utils/fetchPlaces";

const App = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([]);
  const [numInput, setNumInput] = useState(3);
  const [placeInput, setPlaceInput] = useState("Dalahican");
  const [segment, setSegment] = useState([]);
  const [list, setList] = useState([]);
  const routeLayer = useRef(null);

  let myLines = {
    type: "LineString",
    coordinates: segment,
  };

  const fetch = async () => {
    const  data = await fetchPlaces(numInput, placeInput);
    console.log(data)
    console.log(coords)
    let initlist = [];
    data.map((e) => {initlist.push(e.coordinates);});
    setCoords(initlist)
    await fetchCoordinates(initlist, setList)
  };

  // const mainFunction = async () => {
  //   await setTimeout(()=> {fetch()}, [5000])
    
    
  // }

  const showRoute = () => {
    console.log(segment);
    const layer = L.geoJSON(myLines).addTo(map);
    map.fitBounds(layer.getBounds());
    routeLayer.current = layer;
  };

  const NextCoordinates = () => {
    const firstSeg = findClosestIndex(list, coords[1]);
    console.log(list);
    console.log("Index of second Coordinate in the List : ", firstSeg);
    console.log("Indexing ng second coordinate :", list[firstSeg]);
    console.log("Second Coordinate : ", coords[1]);
    console.log(list.slice(0, firstSeg + 1));
    setSegment(list.slice(0, firstSeg + 1));
    console.log("First Segment : ", segment);
  };

  const nextSegment = () => {
    map.removeLayer(routeLayer.current);
    const firstSeg = findClosestIndex(list, coords[1]);
    const secondSeg = findClosestIndex(list, coords[2]);
    setSegment(list.slice(firstSeg, secondSeg));
    showRoute();
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <input
        onChange={(e) => {
          setNumInput(e.target.value);
        }}
        value={numInput}
        placeholder="Put the number of places you want to visit"
      />
      <input
        onChange={(e) => {
          setPlaceInput(e.target.value);
        }}
        value={placeInput}
        placeholder="Put the places you want to visit"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={fetch}
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
          Next Segment
        </button>
      </div>
      <RenderMap mapRef={mapRef} setMap={setMap} />
    </div>
  );
};

export default App;
