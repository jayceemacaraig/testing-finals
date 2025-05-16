import L from "leaflet";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";


const PlaceList = ({
  setPlanner,
  planner,
  filteredPlaces,
  map,
  fetchPlanner,
  setForDescription,
  setActiveTab,
}) => {
  const [array, setArray] = useState(filteredPlaces);
  const AddtoPlanner = (name) => {
    setPlanner((prev) => [...prev, name]);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  return (
    <div className="max-w-3xl items-center py-4 flex flex-col">
      <div className="flex flex-row items-center justify-between w-full px-5">
      <h1 className="text-2xl font-bold mb-2  self-start">
        Recommendations
      </h1>
      <IoMdRefresh onClick={() => setArray(shuffleArray(filteredPlaces))} className="text-2xl mr-10"/>
      </div>

      <div className="flex flex-col justify-between gap-5">
        <div>
          {filteredPlaces.length === 0 ? (
            <div className="h-70 w-full content-center text-2xl">
              No Results
            </div>
          ) : (
            <ul className="px-2 grid grid-cols-2 gap-5 overflow-y-scroll h-70">
              {array.map((place, index) => {
                const isAdded = planner.includes(place.name);

                return (
                  <div
                    className="bg-white rounded-xl shadow-xl/25 p-3 max-w-[500px] h-45 select-none flex flex-col items-center"
                    key={index}
                    onClick={() => {
                      setForDescription(place.name);
                      map.setView(
                        [place.coordinates.lat, place.coordinates.lng],
                        19
                      );
                      L.popup()
                        .setLatLng([
                          place.coordinates.lat,
                          place.coordinates.lng,
                        ])
                        .setContent(
                          `<b>${place.name}</b><br>${place.description}`
                        )
                        .openOn(map);
                    }}
                  >
                    <img
                      className="w-[180px] h-[90px] object-cover rounded-lg mb-2"
                      src={place.image}
                      alt="Pacific Mall"
                    />
                    <p className="text-center text-xs font-semibold mb-2">
                      {place.name}
                    </p>
                    <button
                      className="text-xs rounded-full px-6 py-1 block mx-auto disabled:cursor-not-allowed bg-green-400 disabled:bg-gray-400 text-white"
                      onClick={() => {
                        AddtoPlanner(place.name);
                        setActiveTab("travelplan");
                      }}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex flex-row fixed bottom-0 -left-7 w-2/6  mb-5 items-center justify-center">
          <button
            onClick={fetchPlanner}
            className="px-5 py-2 w-4/5 font-bold bg-purple-500 hover:bg-purple-700 text-white text-sm rounded-md cursor-pointer"
          >
            Start Travel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceList;
