const Planner = ({ planner, showDirection }) => {

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Travel Planner</h1>

      <div className="flex flex-row justify-center gap-5">

        <div>
          <ul className="py-5 grid grid-cols-2 gap-5 content-center">
            {planner.map((place, index) => (
              <li
                key={index}
                className="p-4 border rounded shadow-lg w-40 h-20 text-center "
            onClick={() => showDirection(index + 1)}
              >
                <h2 className="text-xl shrink-text font-semibold">
                  {place}
                </h2>
                <button
                className=" mt-1 px-2 py-1 bg-blue-500 shadow-xl text-white font-black rounded-4xl text-sm hover:bg-blue-800"
                >Show Direction</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Planner;
