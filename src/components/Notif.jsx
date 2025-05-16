import { useEffect } from "react";

const Notif = ({ notifMessage = "Action completed!", showNotif, onClose }) => {
  useEffect(() => {
    if (!showNotif) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [showNotif, onClose]);

  return (
    <div
      className={`fixed z-[9999] bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300
        ${showNotif ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
    >
      <div className="bg-white border border-gray-300 rounded-xl shadow-lg px-5 py-3 flex items-center gap-2">
        <span className="text-green-600 text-xl">✔</span>
        <div>
          <p className="font-semibold text-gray-800">{notifMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Notif;
