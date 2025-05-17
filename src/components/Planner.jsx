import L from "leaflet";
import places from "../places.json";
import createNumberedMarker from "../utils/createNumberedMarker";

const Planner = ({
  planner,
  map,
  reset,
  setForDescription,
  setForDescriptionIdx,
  routeLayer,
}) => {
  const markerColors = [
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#E67E22",
    "#9B59B6",
    "#1ABC9C",
    "#F1C40F",
    "#FF69B4",
    "#5D3FD3",
    "#A3CB38",
    "#00CED1",
    "#FF7F50",
    "#2C3E50",
    "#800000",
    "#F39C12",
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 items-center flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Travel Planner</h1>

      <div className="flex-1 overflow-y-auto h-70">
        <ul className="py-5 grid grid-cols-2 gap-5 mb-40 h-70 pr-2">
          {planner.map((item, index) => {
            const place = places.find((p) => p.name === item);
            if (!place) return null;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl p-3 max-w-[500px] select-none flex flex-col items-center"
                onClick={() => {
                  setForDescription(place.name);
                  setForDescriptionIdx(index + 1);
                  planner.map((planner, index) => {
                    for (let e of places) {
                      if (planner === e.name) {
                        createNumberedMarker(
                          map,
                          [e.coordinates.lat, e.coordinates.lng],
                          index + 1
                        ).bindPopup(`<b>${e.name}</b>`);
                      }
                    }
                  });
                  map
                    .removeLayer(routeLayer.current)
                    .setView(
                      [place.coordinates.lat, place.coordinates.lng],
                      19
                    );
                }}
              >
                <img
                  className="w-[180px] h-[90px] object-cover rounded-lg mb-2"
                  src={place.image}
                  alt={place.name}
                />
                <p className="text-center text-sm font-semibold mb-2">
                  {place.name}
                </p>
                <div className="flex flex-row items-center justify-between w-full">
                  <h1 className="text-md font-bold">Destination</h1>
                  <p
                    className="text-center text-sm text-white w-7 h-7 content-center rounded-full border font-bold border-black"
                    style={{ backgroundColor: markerColors[index] }}
                  >
                    {index + 1}
                  </p>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="fixed bottom-0 w-3/9 mb-4 flex justify-center">
        <button
          className="px-5 py-2 w-4/5 border-2 bg-gray-100 border-purple-500 shadow-xl text-purple-600 font-black rounded-xl text-sm hover:bg-gray-200 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-gray-100 cursor-pointer"
          onClick={reset}
          disabled={planner.length === 0}
        >
          Travel Again
        </button>
      </div>
    </div>
  );
};

export default Planner;
