interface LabelProps {
  id: string;
  labelText: string;
}

const Label = ({ id, labelText }: LabelProps) => {
  return <label htmlFor={id}>{labelText}</label>;
};

export default Label;
