import React, { useState } from "eslint-plugin-react-hooks";
import PlaceList from "./PlaceList";
import Planner from "./Planner";

const Description = ({ setPlanner, planner, start, showDirection }) => {
  return (
    <div className="flex flex-col gap-y-5 pt-3 w-full h-screen justify-items-center overflow-auto">
      {start ? (
        <Planner planner={planner} showDirection={showDirection} />
      ) : (
        <>
          <PlaceList setPlanner={setPlanner} planner={planner} />
          <button
            onClick={() => console.log(planner)}
            className="px-5 py-2 text-xl font-bold border-2 fixed bottom-5 border-blue-500 bg-blue-200 w-1/5 self-center rounded-xl"
          >
            Start Travel
          </button>
        </>
      )}
    </div>
  );
};

export default Description;
