
const Planner = ({ planner, showDirection }) => {
    const markerColors = [
    "#E74C3C", // Red
    "#3498DB", // Blue
    "#2ECC71", // Green
    "#E67E22", // Orange
    "#9B59B6", // Purple
    "#1ABC9C", // Teal
    "#F1C40F", // Yellow
    "#FF69B4", // Pink
    "#5D3FD3", // Indigo
    "#A3CB38", // Lime
    "#00CED1", // Cyan
    "#FF7F50", // Coral
    "#2C3E50", // Navy
    "#800000", // Maroon
    "#F39C12", // Gold
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Travel Planner</h1>

      <div className="flex flex-row justify-center gap-5">
        <div>
          <ul className="py-5 grid grid-cols-2 gap-5 content-center">
            {planner.map((place, index) => (
              <li
                key={index}
                className="p-4 border rounded shadow-lg w-50 h-30 text-center flex flex-col "
                onClick={() => showDirection(index + 1)}
              >
                <div>
                  <p className='text-center text-sm text-white w-5 h-5 rounded-full border-1 border-black ' style={{backgroundColor: markerColors[index]}}>{index +  1}</p>
                  <h2 className="text-xl shrink-text font-semibold">{place}</h2>
                </div>
                <button className=" mt-1 px-2 py-1 bg-blue-500 shadow-xl text-white font-black rounded-4xl text-sm hover:bg-blue-800">
                  Show Direction
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Planner;
