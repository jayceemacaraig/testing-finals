import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import places from "./places.json";
import RenderMap from "./components/RenderMap";
import findClosestIndex from "./utils/findClosestIndex";
import fetchCoordinates from "./utils/fetchCoordinates";
import { fetchCurrentLocation, lng, lat } from "./utils/fetchCurrentLocation";
import Description from "./components/Description";
import SearchBar from "./components/SearchBar";
import createNumberedMarker from "./utils/createNumberedMarker";

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
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      let initlist = [userLocation];

      planner.map((planner, index) => {
        for (let place of places) {
          if (planner === place.name) {
            L.marker([place.coordinates.lat, place.coordinates.lng], {
              icon: createNumberedMarker(index),
            }).addTo(map);
            initlist.push([place.coordinates.lng, place.coordinates.lat]);
          }
        }
      });

      setCoords(initlist);
      await fetchCoordinates(initlist, setList);
      setStart(true);
    } catch (err) {
      console.error("Error fetching planner:", err);
    }
  };

  useEffect(() => {
    fetchCurrentLocation();
    setUserLocation([parseFloat(lng.toFixed(4)), parseFloat(lat.toFixed(4))]);
  }, []);

  const reset = () => {
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
      setSegment(list.slice(0, findClosestIndex(list, coords[index])));
      console.log(`Segment 0: Start to ${index}`);
      L.marker([coords[index - 1][1], coords[index - 1][0]])
        .bindPopup(`<b>Your Location</b>`)
        .addTo(map);
      L.marker([coords[index][1], coords[index][0]], {
        icon: createNumberedMarker(index),
      }).addTo(map);

    } else if (index === coords.length - 1) {
      setSegment(list.slice(findClosestIndex(list, coords[coords.length - 2])));
      console.log(`Segment ${index}: ${coords.length - 2} to end`);
      L.marker([coords[coords.length - 1][1], coords[coords.length - 1][0]], {
        icon: createNumberedMarker(index),
      }).addTo(map);
      L.marker([coords[coords.length - 2][1], coords[coords.length - 2][0]], {
        icon: createNumberedMarker(index),
      }).addTo(map);

    } else {
      const startIdx = findClosestIndex(list, coords[index - 1]);
      const endIdx = findClosestIndex(list, coords[index]);
      setSegment(list.slice(startIdx, endIdx));
      console.log(`Segment ${index}: ${index - 1} to ${index}`);
      L.marker([coords[index - 1][1], coords[index - 1][0]], {
        icon: createNumberedMarker(index),
      }).addTo(map);
      L.marker([coords[index][1], coords[index][0]], {
        icon: createNumberedMarker(index),
      }).addTo(map);
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
  };

  useEffect(() => {
    if (segment && segment.length > 0) {
      showRoute();
    }
  }, [segment]);

  return (
    <main className="flex flex-row">
      <div className="w-5/10 h-screen border-r-4 mr-5 flex flex-col items-center">
        <h1 className="text-6xl font-black mt-10">TARAVEL</h1>
        <h2 className="text-2xl font-bold w-3/5 text-center mb-5">
          "Life's too short to stay in one place"
        </h2>
        <div className="flex flex-col gap-5 w-full items-center pb-5 border-b-5 shadow-2xl">
          <SearchBar setFilteredPlaces={setFilteredPlaces} />
          <button
            className="px-5 py-2 bg-blue-500 shadow-xl text-white font-black rounded-4xl text-xl hover:bg-blue-800"
            onClick={reset}
          >
            TRAVEL AGAIN
          </button>
        </div>
        <Description
          setPlanner={setPlanner}
          planner={planner}
          start={start}
          showDirection={showDirection}
          fetchPlanner={fetchPlanner}
        />
      </div>
      <div className="w-full h-screen p-5 border-2 mt-2 mr-5 rounded-2xl">
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
