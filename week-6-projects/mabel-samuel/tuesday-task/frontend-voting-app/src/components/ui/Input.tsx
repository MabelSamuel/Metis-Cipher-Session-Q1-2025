interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  onChange?: () => Promise<void>;
}

const Input = ({ type, id, placeholder, onChange }: InputProps) => {
  return <input type={type} id={id} className="w-full outline-none border border-gray-300 rounded-md h-10 p-4 block" placeholder={placeholder} onChange={onChange} />;
};

export default Input;
