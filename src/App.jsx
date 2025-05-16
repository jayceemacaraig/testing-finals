import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaInfoCircle } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../public/LOGO.png";
import places from "./places.json";
import RenderMap from "./components/RenderMap";
import findClosestIndex from "./utils/findClosestIndex";
import fetchCoordinates from "./utils/fetchCoordinates";
import { fetchCurrentLocation, lng, lat } from "./utils/fetchCurrentLocation";
import Location from "./components/Location";
import Description from "./components/Description";
import TravelPlan from "./components/TravelPlan";
import SearchBar from "./components/SearchBar";
import createNumberedMarker from "./utils/createNumberedMarker";
import Notif from "./components/Notif";

const App = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [segment, setSegment] = useState([]);
  const [list, setList] = useState([]);
  const routeLayer = useRef(null);
  const [planner, setPlanner] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [start, setStart] = useState(false);
  const [placeidx, setPlaceidx] = useState(0);
  const [info, setInfo] = useState("");
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // const top10Places = [
  //   "Perez Park",
  //   "SM City Lucena",
  //   "Pacific Mall Lucena",
  //   "Hachienda Inn",
  //   "Lucena Fresh Air Hotel and Resort",
  //   "Okazu Garden and Resort",
  //   "El Coco Boutique Hotel",
  //   "2205 Suites",
  //   "Señoritas Mexinoy Kitchen",
  //   "Buddy's Pizza"
  // ];

  const fetchPlanner = async () => {
    try {
      if (!planner || planner.length === 0) {
        console.warn("No planner selected.");
        return;
      }
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Popup) {
          map.removeLayer(layer);
        }
      });

      let initlist = [userLocation];
      L.marker([userLocation[1], userLocation[0]])
        .bindPopup(`<b>Your Location</b>`)
        .addTo(map);
      planner.map((planner, index) => {
        for (let place of places) {
          if (planner === place.name) {
            createNumberedMarker(
              map,
              [place.coordinates.lat, place.coordinates.lng],
              index + 1
            ).bindPopup(`<b>${place.name}</b>`);
            initlist.push([place.coordinates.lng, place.coordinates.lat]);
          }
        }
      });

      setCoords(initlist);
      await fetchCoordinates(initlist, setList, setStart);
    } catch (err) {
      setInfo("Error fetching planner", err);
      console.error("Error fetching planner:", err);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
    setUserLocation([parseFloat(lng.toFixed(4)), parseFloat(lat.toFixed(4))]);
  }, []);

  const reset = () => {
    setInput("");
    setStart(false);
    setPlanner([]);
    map
      .eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      })
      .removeLayer(routeLayer.current)
      .setView([13.9359, 121.6124], 16);
    places.forEach((place) => {
      if (place.coordinates && place.coordinates.lat && place.coordinates.lng) {
        const marker = L.marker([
          place.coordinates.lat,
          place.coordinates.lng,
        ]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.description}`);
      } else {
        console.warn(`Invalid coordinates for place: ${place.name}`);
      }
    });
  };

  const showDirection = (index) => {
    if (!list || list.length === 0) {
      console.warn("No route data available.");
      return;
    }
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    if (index === 1) {
      console.log(`Segment ${index}: Start to ${index}`);
      setPlaceidx(index);
      setSegment(list.slice(0, findClosestIndex(list, coords[index])));
    } else if (index === coords.length - 1) {
      console.log(`Segment ${index}: ${coords.length - 2} to end`);
      setPlaceidx(index);
      setSegment(list.slice(findClosestIndex(list, coords[coords.length - 2])));
    } else {
      setPlaceidx(index);
      console.log(`Segment ${index}: ${index - 1} to ${index}`);
      setSegment(
        list.slice(
          findClosestIndex(list, coords[index - 1]),
          findClosestIndex(list, coords[index])
        )
      );
    }
  };

  const showRoute = () => {
    if (!segment || segment.length === 0) {
      console.warn("No route segment to show.");
      return;
    }
    if (routeLayer.current) {
      map.removeLayer(routeLayer.current);
    }

    const layer = L.geoJSON(
      {
        type: "LineString",
        coordinates: segment,
      },
      {
        style: {
          color: "#FF5733",
          weight: 7,
          opacity: 0.8,
          dashArray: "6, 4",
          lineJoin: "round",
        },
      }
    ).addTo(map);

    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    } else {
      console.warn("Invalid bounds for segment.");
    }

    routeLayer.current = layer;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    if (placeidx === 1) {
      L.marker([coords[placeidx - 1][1], coords[placeidx - 1][0]])
        .bindPopup(`<b>Your Location</b>`)
        .addTo(map);
      createNumberedMarker(
        map,
        [coords[placeidx][1], coords[placeidx][0]],
        placeidx
      );
    } else if (placeidx === coords.length - 1) {
      createNumberedMarker(
        map,
        [coords[placeidx - 1][1], coords[placeidx - 1][0]],
        placeidx - 1
      );
      createNumberedMarker(
        map,
        [coords[placeidx][1], coords[placeidx][0]],
        placeidx
      );
    } else {
      createNumberedMarker(
        map,
        [coords[placeidx - 1][1], coords[placeidx - 1][0]],
        placeidx - 1
      );
      createNumberedMarker(
        map,
        [coords[placeidx][1], coords[placeidx][0]],
        placeidx
      );
    }
  };

  useEffect(() => {
    if (segment && segment.length > 0) {
      showRoute();
    }
  }, [segment]);

  return (
    <main className="flex min-h-screen relative font-poppins overflow-x-hidden">
      <Notif />
      <aside className="w-120 h-screen border-r border-gray-300 flex flex-col pt-6 z-10 relative  overflow-x-hidden">
        <div className="flex items-center justify-between mb-6 px-6">
          <img src={logo} alt="Logo" className="w-30" />
          <div className="flex items-center space-x-4 text-black">
            <button>
              <FaCog className="text-lg" />
            </button>
            <button>
              <FaInfoCircle className="text-lg" />
            </button>
          </div>
        </div>

        <SearchBar
          setFilteredPlaces={setFilteredPlaces}
          input={input}
          setInput={setInput}
        />

        <div className="flex justify-center space-x-2  mx-6 border-b-2 border-gray-300 ">
          {["description", "travelplan"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border rounded-tr-md rounded-tl-md py-1.5 px-4 text-sm ${
                activeTab === tab
                  ? "border-purple-600 bg-purple-500 text-white w-1/2"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100 w-1/2"
              }`}
            >
              {tab === "description" ? "Description" : "Travel Plan"}
            </button>
          ))}
        </div>

        {activeTab === "description" ? (
          <Description place={places} />
        ) : (
          <TravelPlan />
        )}
        <Location
          setPlanner={setPlanner}
          planner={planner}
          start={start}
          showDirection={showDirection}
          filteredPlaces={filteredPlaces}
          map={map}
          fetchPlanner={fetchPlanner}
          reset={reset}
        />
      </aside>

      <div className="w-3/5 h-screen p-5">
        <RenderMap
          mapRef={mapRef}
          setMap={setMap}
          places={filteredPlaces}
          userLocation={userLocation}
        />
      </div>
    </main>
  );
};

export default App;
