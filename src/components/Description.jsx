import React from "react";

const Description = ({ name, description, address, onDirectionClick }) => {
  return (
    <div className="border border-[#2c3e50] rounded-3xl p-6 w-4/5 m-5 flex justify-between items-start shadow-sm self-center">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-[#2c3e50]">Name {name}</h2>
        <p className="text-[#2c3e50] mt-1">Description {description}</p>
        <p className="text-sm text-[#2c3e50] mt-1">{address}</p>
      </div>
      <button
        onClick={onDirectionClick}
        className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm ml-4 hover:bg-blue-600 transition"
      >
        Directions
      </button>
    </div>
  );
};

export default Description;
