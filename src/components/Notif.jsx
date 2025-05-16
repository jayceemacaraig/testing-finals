import { useEffect, useState } from "react";import React from 'react'

const Notif = ({ message = "Successfully saved!", onClose }) => {
const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
    setShow(true);

    // Auto-hide after 2 seconds
    const timer = setTimeout(() => {
      setShow(false);

      // Optional: call onClose after animation ends
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // matches transition duration
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300
        ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
    >
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg px-5 py-3 flex items-center gap-2">
        <span className="text-green-600 text-xl">✔</span>
        <div>
          <p className="font-semibold text-gray-800">Successfully saved!</p>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Notif