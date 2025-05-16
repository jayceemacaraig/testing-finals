import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import places from "../places.json";
import { FaCar, FaCog, FaInfoCircle, FaSearch, FaChevronDown } from 'react-icons/fa';

export default function SearchBar({ setFilteredPlaces, input, setInput }) {

    const fuse = useMemo(
        () =>
            new Fuse(places, {
                keys: ["name", "description", "tags", "address.barangay", "address.purok"],
                threshold: 0.3,
            }),
        []
    );

    const handleChange = (e) => {
        const text = e.target.value;
        setInput(text);

        if (!text.trim()) {
            setFilteredPlaces(places);
            return;
        }

        const matches = fuse.search(text).map(({ item }) => item);
        setFilteredPlaces(matches);
    };

    return (
        <form className="mb-6 relative mx-6">
          <input 
          className="w-full border border-gray-400 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
          placeholder="Search"
          type='text'
          value={input}
          onChange={handleChange}
           />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch className="text-lg" />
          </span>
        </form>
    );
}