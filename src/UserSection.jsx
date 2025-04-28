import React, { useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RenderMap from "./components/RenderMap";
import findClosestIndex from "./utils/findClosestIndex";
import fetchCoordinates from "./utils/fetchCoordinates";
import fetchPlaces from "./utils/fetchPlaces";

const UserSection = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([]);
  const [numInput, setNumInput] = useState(3);
  const [placeInput, setPlaceInput] = useState("Dalahican");
  const [segment, setSegment] = useState([]);
  const [list, setList] = useState([]);
  const routeLayer = useRef(null);
  const [startFunction, setStartFunction] = useState(false);
  const [details, setDetails] = useState(null);

  let myLines = {
    type: "LineString",
    coordinates: segment,
  };

  const fetch = async () => {
    const data = await fetchPlaces(numInput, placeInput);
    let initlist = [];
    data.map((e) => {
      initlist.push(e.coordinates);
    });
    setCoords(initlist);
    setDetails(data);
    await fetchCoordinates(initlist, setList);
    setStartFunction(true)
  };

  const showRoute = () => {
    map.removeLayer(routeLayer.current);
    const layer = L.geoJSON(myLines).addTo(map);
    map.fitBounds(layer.getBounds());
    routeLayer.current = layer;
  };

  const buttonFunction = (index) => {
    if (index === 1) {
      setSegment(list.slice(0, findClosestIndex(list, coords[index])));
    } else {
      setSegment(
        findClosestIndex(list, coords[index]),
        findClosestIndex(list, coords[index])
      );
    }
    console.log(segment)
    showRoute();
  };

  return (
    <main className="flex flex-row">
      <div className="w-5/10 border-r-4 mr-5 flex flex-col items-center">
        <h1 className="text-6xl font-black mt-10">TARAVEL</h1>
        <h2 className="text-2xl font-bold w-3/5 text-center mb-5">
          "Life's too short to stay in one place"
        </h2>
        <div className="flex flex-col gap-5 w-full items-center pb-10 border-b-5 shadow-2xl">
          <input
            onChange={(e) => {
              setNumInput(e.target.value);
            }}
            value={numInput}
            placeholder="Put the number of places you want to visit"
            className="border-2 px-5 rounded-xl w-4/5 text-2xl placeholder-shown:text-sm placeholder-shown:py-2 "
          />
          <input
            onChange={(e) => {
              setPlaceInput(e.target.value);
            }}
            value={placeInput}
            placeholder="Put the places you want to visit"
            className="border-2 px-5 rounded-xl w-4/5 text-2xl placeholder-shown:text-sm placeholder-shown:py-2"
          />
          <button className="px-5 py-2 bg-blue-500 shadow-xl text-white font-black rounded-4xl text-xl hover:bg-blue-800"
          onClick={fetch}
          >
            TRAVEL ->
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 pt-10 w-full h-77 justify-items-center overflow-auto">
          {coords.map((e) => {
            let index = coords.indexOf(e);
            return (
              <div
                className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center"
                key={index}
                onClick={() => {
                  buttonFunction(index);
                }}
              >
                Testing
              </div>
            );
          })}

          {/* <div className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center">Testing</div>
          <div className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center">Testing</div>
          <div className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center">Testing</div>
          <div className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center">Testing</div> */}
        </div>

        <div className="w-70 h-100 border-2 rounded-xl bg-red-500 fixed bottom-1 left-125 z-10 p-5">
          <h1>Route Details</h1>
          <hr></hr>
          <h1>Route 1</h1>
          <div>
            <h2>Distance</h2>
            <h2>Durations</h2>
          </div>
        </div>
      </div>
      <div className="w-full p-5 border-2 mt-2 mr-5 rounded-2xl">
        <RenderMap mapRef={mapRef} setMap={setMap} />
      </div>
    </main>
  );
};

export default UserSection;
