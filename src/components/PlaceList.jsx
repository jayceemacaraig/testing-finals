import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

import places from "../places.json";

const PlaceList = ({ setPlanner, planner }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 4;

  const totalPages = Math.ceil(places.length / placesPerPage);
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const AddtoPlanner = (name) => {
    setPlanner((prev) => [...prev, name]);
  };

  const removeFromPlanner = (name) => {
  setPlanner((prev) => prev.filter((place) => place !== name));
};


  const handlers = useSwipeable({
    onSwipedLeft: goToNextPage,
    onSwipedRight: goToPreviousPage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">Lucena City Places</h1>
      <span className="text-gray-700 self-center">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex flex-row justify-center gap-5">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="text-5xl px-2 rounded disabled:opacity-50"
        >
          &lt;
        </button>

        <div {...handlers}>
          <ul className="py-5 grid grid-cols-2 gap-5 content-center">
            {currentPlaces.map((place, index) => {
              const isAdded = planner.includes(place.name);

              return (
                <li
                  key={index}
                  className="p-1 border rounded shadow-lg w-40 h-20 text-center "
                  onClick={()=>{}}
                >
                  <h2 className="text-xl shrink-text font-semibold">
                    {place.name}
                  </h2>

                  <div className="flex flex-row justify-center gap-2 mt-2">
                    <button
                      className="py-1 px-2 bg-green-400 disabled:bg-gray-400 text-white rounded-xl cursor-pointer"
                      onClick={() => AddtoPlanner(place.name)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added" : "Add"}
                    </button>
                    <button
                      className="py-1 px-2 bg-red-600 disabled:bg-red-400 text-white rounded-xl cursor-pointer"
                      onClick={() => removeFromPlanner(place.name)}
                      disabled={!isAdded}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="text-5xl px-2 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PlaceList;
