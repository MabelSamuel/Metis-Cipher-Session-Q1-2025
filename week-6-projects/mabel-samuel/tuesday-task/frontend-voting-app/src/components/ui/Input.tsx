import React from "react";

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: string;
  formData: string;
}

const Input = ({ type, id, placeholder, onChange, errors, formData }: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      className={`w-full outline-none border border-gray-300 rounded-md h-10 p-4 block focus:border-blue-700 ${errors ? "border-red-500": ""}`}
      placeholder={placeholder}
      onChange={onChange}
      value={formData}
    />
  );
};

export default Input;
