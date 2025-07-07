import React, { useState } from "react";

const FloatingInput = ({ label, type, name, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value;

  return (
    <div className="relative border border-gray-300 rounded px-3 pt-4 pb-2 w-full transition-all">
      <label
        className={`absolute left-3 transition-all text-sm bg-white px-1 ${
          isFloating ? "top-1 text-blue-600 text-xs" : "top-2 text-gray-400"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="w-full outline-none bg-transparent pt-1 text-black"
      />
    </div>
  );
};

export default FloatingInput;
