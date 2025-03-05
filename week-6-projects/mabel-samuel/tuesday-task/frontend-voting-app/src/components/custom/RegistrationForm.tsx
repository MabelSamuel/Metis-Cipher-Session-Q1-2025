import { TiTick } from "react-icons/ti";
import Input from "../ui/Input";
import SelectTag from "../ui/SelectTag";
import Button from "../ui/Button";
import { useContract } from "../../context/ContractContext";
import { AiOutlineWallet } from "react-icons/ai";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [voterData, setVoterData] = useState({
    name: "",
    age: "",
    nin: "",
    nationality: "",
  });
  const { connectWallet, account, loading, registerVoter } = useContract();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVoterData({ ...voterData, [e.target.name]: e.target.value });
  };

  const handleVoterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerVoter(
      voterData.name,
      parseInt(voterData.age),
      voterData.nin,
      voterData.nationality
    );
    setVoterData({ name: "", age: "", nin: "", nationality: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {account ? (
        <div className="border border-gray-200 w-1/2 flex flex-col items-center py-8 space-y-4 rounded-lg px-8 shadow-md">
          <div className="size-16 bg-blue-700 rounded-full flex justify-center items-center">
            <TiTick className="size-10 text-white" />
          </div>
          <h2 className="font-medium text-2xl">Register to vote</h2>
          <form className="w-full space-y-4" onSubmit={handleVoterSubmit}>
            <Input
              type="text"
              placeholder="Enter your name*"
              id="name"
              onChange={handleInputChange}
            />
            <Input
              type="number"
              placeholder="Enter your age*"
              id="age"
              onChange={handleInputChange}
            />
            <Input
              type="number"
              placeholder="Enter your National Identification Number*"
              id="nin"
              onChange={handleInputChange}
            />
            <SelectTag onChange={handleInputChange} />
            <Button content="Submit" loading={false} classes="w-full" />
          </form>
        </div>
      ) : (
        <div className="border border-gray-200 w-1/2 flex flex-col items-center py-8 space-y-4 rounded-lg px-8 shadow-md bg-white">
          <AiOutlineWallet className="text-blue-700 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Connect Your Wallet
          </h2>
          <p className="text-gray-500 text-center">
            To register as a voter, you need to connect your crypto wallet.
          </p>
          <Button
            content="Connect Wallet"
            eventName={connectWallet}
            loading={loading}
            classes="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
