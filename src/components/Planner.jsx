import L from "leaflet";
import places from "../places.json";

const Planner = ({ planner, map, reset }) => {
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

      <div className="flex-1 overflow-y-auto">
             <ul className="py-5 grid grid-cols-2 gap-5 h-70 pr-2">
               {planner.map((item, index) => {
                 const place = places.find((p) => p.name === item);
                 if (!place) return null;
     
                 return (
                   <div
                     key={index}
                     className="bg-white rounded-xl shadow-xl p-3 max-w-[500px] select-none flex flex-col items-center"
                     onClick={() => {
                       map.setView(
                         [place.coordinates.lat, place.coordinates.lng],
                         19
                       );
                       L.popup()
                         .setLatLng([place.coordinates.lat, place.coordinates.lng])
                         .setContent(`<b>${place.name}</b><br>${place.description}`)
                         .openOn(map);
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
                       <p
                         className="text-center text-sm text-white w-7 h-7 content-center rounded-full border font-bold border-black"
                         style={{ backgroundColor: markerColors[index] }}
                       >
                         {index + 1}
                       </p>
                       <button
                         className="mt-1 px-2 py-1 bg-blue-500 shadow-xl text-white font-black rounded-3xl text-sm hover:bg-blue-800"
                         onClick={(e) => {
                           e.stopPropagation();
                           console.log("Show Direction clicked for", place.name);
                         }}
                       >
                         Show Direction
                       </button>
                     </div>
                   </div>
                 );
               })}
             </ul>
           </div>
        <div className="absolute bottom-0 w-full mb-4 flex justify-center backdrop-blur-xs pt-3">
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
