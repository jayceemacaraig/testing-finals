import L from "leaflet";

const PlaceList = ({
  setPlanner,
  planner,
  filteredPlaces,
  map,
  fetchPlanner,
}) => {
  const AddtoPlanner = (name) => {
    setPlanner((prev) => [...prev, name]);
  };

  const removeFromPlanner = (name) => {
    setPlanner((prev) => prev.filter((place) => place !== name));
  };

  return (
    <div className="max-w-3xl items-center py-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-2 ml-5 self-start">Recommendations</h1>

      <div className="flex flex-col justify-between gap-5">
        <div>
            {filteredPlaces.length === 0 ? (<div className="h-70 w-full content-center text-2xl">No Results</div>)
          :(<ul className="px-2 grid grid-cols-2 gap-5 overflow-y-scroll h-70">
            {filteredPlaces.map((place, index) => {
              const isAdded = planner.includes(place.name);

              return (
                <div
                  className="bg-white rounded-xl shadow-xl/25 p-3 max-w-[500px] h-45 select-none flex flex-col items-center"
                  key={index}
                  onClick={() => {
                    map.setView(
                      [place.coordinates.lat, place.coordinates.lng],
                      19
                    );
                    L.popup()
                      .setLatLng([place.coordinates.lat, place.coordinates.lng])
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
                    onClick={() => AddtoPlanner(place.name)}
                    disabled={isAdded}
                  >
                    {isAdded ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}
          </ul>)}
        </div>

        <div className="flex flex-row absolute bottom-0 w-full mb-5 items-center justify-center backdrop-blur-xs pt-3">
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
