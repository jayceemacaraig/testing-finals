import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import places from "../places.json";

export default function SearchBar({ setFilteredPlaces }) {
    const [input, setInput] = useState("");

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
        <div style={{ padding: "16px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Search places..."
                className="border-2 px-5 rounded-xl w-full text-2xl"
            />
        </div>
    );
}