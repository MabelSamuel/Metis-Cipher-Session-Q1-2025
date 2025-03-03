import { useContract } from "../../context/ContractContext";

interface AddressTagProps {
  variant?: "primary" | "neutral";
}

const AddressTag = ({ variant = "primary" }: AddressTagProps) => {
  const { account } = useContract();
  return (
    <button
      className={`${
        variant === "neutral"
          ? "bg-white text-blue-700 hover:bg-blue-100 "
          : "bg-blue-700 hover:bg-blue-800 text-white"
      } text-sm text-center font-medium px-4 py-2 rounded-lg w-36`}
    >
      {account?.slice(0, 6)}...{account?.slice(-4)}
    </button>
  );
};

export default AddressTag;
