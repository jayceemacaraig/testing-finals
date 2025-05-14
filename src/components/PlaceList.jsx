import React, { useState } from 'react';

import places from '../places.json';

const PlaceList = ({setPlanner, planner}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 5;

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

  const cardFunction = (name) => {
    if (planner.includes(name)) {
      window.alert('Already in the planner')
    } else {
      setPlanner([...planner, name])
      console.log(name)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lucena City Places</h1>

      <ul className="space-y-4 grid grid-cols-2 gap-10">
        {currentPlaces.map((place, index) => (
          <li key={index} className="p-4 border rounded shadow" onClick={() => cardFunction(place.name)}>
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p className="text-gray-600">{place.description}</p>
            <p className="text-sm text-gray-500">{place.address.barangay}</p>
            <p className="text-sm text-gray-500">{place.address.purok}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>

        
      </div>
    </div>
  );
};

export default PlaceList;
