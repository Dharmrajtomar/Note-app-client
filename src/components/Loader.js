import React from "react";
import "./Loader.css";
import img from "../asseset/icon/vector.png";

const Loader = () => {
  return (
    <div className="w-10 h-10 flex items-center justify-center animate-spin">
      <svg
        className="w-full h-full"
        viewBox="0 0 32 32"
        fill="none"
        src={img}
        alt=""
      >
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="15"
            y="2"
            width="2"
            height="8"
            fill="#367AFF"
            transform={`rotate(${i * 30} 16 16)`}
            opacity={i / 12}
          />
        ))}
      </svg>
    </div>
  );
};

export default Loader;
