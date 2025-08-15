import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, bg, color, className, to, type , onClick }) => {
  return (
    <>
      {type === "link" ? (
        <Link to={to} className={`md:px-8 md:py-3 px-5 md:text-base text-sm py-2 ${bg} ${color} ${className}`}>
          {text}
        </Link>
      ) : <button   className={`md:px-8 md:py-3 px-5 md:text-base text-sm py-2 flex items-center justify-center ${bg} ${color} ${className}`} onClick={onClick}>
          {text}
        </button>
      
      }
    </>
  );
};

export default Button;
