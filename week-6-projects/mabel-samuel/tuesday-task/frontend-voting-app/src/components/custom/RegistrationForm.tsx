import { NFTStorage, Blob } from "nft.storage";
import { TiTick } from "react-icons/ti";
import Input from "../ui/Input";
import SelectTag from "../ui/SelectTag";
import Button from "../ui/Button";
import { useContract } from "../../context/ContractContext";
import { AiOutlineWallet } from "react-icons/ai";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [voterData, setVoterData] = useState({
    name: "",
    age: "",
    nin: "",
    nationality: "",
  });

  const [voterErrors, setVoterErrors] = useState({
    name: "",
    age: "",
    nin: "",
    nationality: "",
  });

  const { connectWallet, account, loading } = useContract();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setVoterData({ ...voterData, [e.target.name]: e.target.value });
    console.log(voterData);
    setVoterErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateVoter = () => {
    const errors: any = {};
    if (!voterData.name) errors.name = "Name is required";
    if (!voterData.age || parseInt(voterData.age) < 18)
      errors.age = "Must be at least 18 years old";
    if (!voterData.nin || voterData.nin.length < 8)
      errors.nin = "NIN must be at least 8 characters";
    if (!voterData.nationality) errors.nationality = "Nationality is required";
    setVoterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const client = new NFTStorage({ token: import.meta.env.VITE_API_KEY });

  const uploadToIPFS = async (data: object) => {
    try {
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const cid = await client.storeBlob(blob);
      return `https://ipfs.io/ipfs/${cid}`;
    } catch (error) {
      toast.error("Failed to upload data to IPFS.");
      console.error("IPFS Upload Error:", error);
      return null;
    }
  };

  const handleVoterSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateVoter()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    const ipfsUrl = await uploadToIPFS(voterData);
    if (ipfsUrl) {
      toast.success("Voter data submitted successfully.");
      console.log("Stored on IPFS:", ipfsUrl);
      setVoterData({ name: "", age: "", nin: "", nationality: "" });
    }
    setVoterData({ name: "", age: "", nin: "", nationality: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {account ? (
        <div className="border border-gray-200 w-1/2 flex flex-col items-center py-8 space-y-4 rounded-lg px-8 shadow-md">
          <div className="size-16 bg-blue-700 rounded-full flex justify-center items-center">
            <TiTick className="size-10 text-white" />
          </div>
          <h2 className="font-medium text-2xl">Voter Registration Request</h2>
          <form
            className="w-full space-y-4"
            onSubmit={handleVoterSubmitRequest}
          >
            <Input
              type="text"
              placeholder="Enter your name*"
              id="name"
              onChange={handleInputChange}
              errors={voterErrors.name}
              formData={voterData.name}
            />
            <Input
              type="number"
              placeholder="Enter your age*"
              id="age"
              onChange={handleInputChange}
              errors={voterErrors.age}
              formData={voterData.age}
            />
            <Input
              type="number"
              placeholder="Enter your National Identification Number*"
              id="nin"
              onChange={handleInputChange}
              errors={voterErrors.nin}
              formData={voterData.nin}
            />
            <SelectTag
              onChange={handleInputChange}
              formData={voterData.nationality}
              errors={voterErrors.nationality}
            />
            <Button content="Submit Request" loading={false} classes="w-full" />
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
