interface InputProps {
  type: string;
  id: string;
  placeholder: string;
}

const Input = ({ type, id, placeholder }: InputProps) => {
  return <input type={type} id={id} className="" placeholder={placeholder} />;
};

export default Input;
