// components/Notification.tsx
import React from "react";

const Notification = ({ message, type = "success", onClose }) => {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white transition-all duration-300
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
