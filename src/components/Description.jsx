import React from "react";
import places from "../places.json";
import formatDistance from "../utils/formatDistance";
import formatDuration from "../utils/formatDuration";

const Description = ({
  forDescription,
  start,
  showDirection,
  forDescriptionidx,
  routeInfo,
}) => {
  const place = places.find((p) => p.name === forDescription);

  if (!place) {
    return (
      <div className="border border-[#2c3e50] rounded-3xl p-10 w-4/5 m-5 flex justify-between items-start shadow-sm self-center text-gray-400 text-xl">
        Select a place....
      </div>
    );
  }

  return (
    <div className="border border-[#2c3e50] rounded-3xl p-6 w-4/5 m-5 flex justify-between items-start shadow-sm self-center min-h-35 overflow-y-auto">
      <div className="flex-1">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#2c3e50]">
            {place.name}
          </h2>
          <button
            className={`${
              start ? "flex" : "hidden"
            } bg-blue-500 text-white px-4 py-1 rounded-full text-sm ml-4 hover:bg-blue-600 transition`}
            onClick={showDirection}
          >
            Directions
          </button>
        </div>
        <p className="text-[#2c3e50] mt-1">{place.description}</p>
        <p className="text-sm text-[#2c3e50] mt-1">{place.address.barangay}</p>

        {start && routeInfo ? (
          <div className="mt-4 border-t border-gray-300 pt-4">
            <p className="text-sm text-[#2c3e50] mt-1">
              <b>Distance</b> {formatDistance(routeInfo[forDescriptionidx - 1]?.distance)}
            </p>
            <p className="text-sm text-[#2c3e50] mt-1">
              <b>Duration</b> {formatDuration(routeInfo[forDescriptionidx - 1]?.duration)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Description;
