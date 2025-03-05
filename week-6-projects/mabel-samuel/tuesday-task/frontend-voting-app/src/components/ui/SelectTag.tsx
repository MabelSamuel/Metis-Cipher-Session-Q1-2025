import React from "react";

interface SelectTagProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTag = ({ onChange }: SelectTagProps) => {
  return (
    <select
      name="nationality"
      id="nationality"
      className="w-full outline-none border border-gray-300 rounded-md h-10 p-4 block"
      onChange={onChange}
    >
      <option value="">Select your nationality</option>
      <option value="nigerian">Nigerian</option>
      <option value="other">Other</option>
    </select>
  );
};

export default SelectTag;
