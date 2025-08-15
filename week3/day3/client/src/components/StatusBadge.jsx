import React from "react";

const StatusBadge = ({ status }) => {

  const baseClasses =  "px-3 py-1  rounded-full text-sm font-medium backdrop-blur-md border border-white/20 shadow-md";

  const statusStyles = {
    pending: "bg-yellow-400/20 text-yellow-300",
    completed: "bg-green-400/20 text-green-300",
  };
  return <span className={`${baseClasses} ${statusStyles[status]} sm:max-w-28 max-w-24 px-1 text-center w-full inline-block`}>
    {status.toUpperCase()}
  </span>;
};

export default StatusBadge;
