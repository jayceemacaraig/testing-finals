import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const TravelPlan = ({ planner,setPlanner }) => {
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

    const removeFromPlanner = (name) => {
    setPlanner((prev) => prev.filter((place) => place !== name));
  };

  return (
    <div className="border-t-1 border-[#2c3e50] rounded-t-3xl p-6 w-full mt-5 h-100 overflow-y-auto flex flex-col items-start  self-center">
      {planner.length === 0 ? (<h1 className="text-gray-400 text-xl self-center">Add a Place to Visit...</h1>):
      planner.map((place, index) => (
        <div
          key={index}
          className="bg-white border-b-2 border-gray-300 shadow-sm p-3 w-full max-w-[500px] select-none flex flex-col items-center"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row gap-2 items-center">
              <p
                className="text-center text-sm text-white w-7 h-7 content-center rounded-full border font-bold border-black"
                style={{ backgroundColor: markerColors[index] }}
              >
                {index + 1}
              </p>
              <p className="text-center text-sm font-semibold ">
                {place}
              </p>
            </div>
            <FaRegTrashCan className="text-xl text-red-600" onClick={() => removeFromPlanner(place)}/>

          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelPlan;
