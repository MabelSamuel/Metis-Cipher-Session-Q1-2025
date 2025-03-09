import React from "react";

interface SelectTagProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  formData: string;
  errors: string;
}

const SelectTag = ({ onChange, formData, errors }: SelectTagProps) => {
  return (
    <select
      name="nationality"
      id="nationality"
      className={`w-full outline-none border px-4 border-gray-300 rounded-md h-10  block ${errors ? "border-red-500": ""}`}
      onChange={onChange}
      value={formData}
    >
      <option value="">Select your nationality</option>
      <option value="nigerian">Nigerian</option>
      <option value="other">Other</option>
    </select>
  );
};

export default SelectTag;
