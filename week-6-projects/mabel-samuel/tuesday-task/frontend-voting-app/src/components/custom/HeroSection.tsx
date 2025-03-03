import { useNavigate } from "react-router";
import { useContract } from "../../context/ContractContext";
import AddressTag from "../ui/AddressTag";
import Button from "../ui/Button";

const HeroSection = () => {
  const { connectWallet, loading, account } = useContract();
  const navigate = useNavigate();
  const goToRegister = () =>{
    navigate("register");
  }

  return (
    <div className="px-16 h-screen bg-blue-600 text-white">
      <div className="py-36 space-y-4">
        <p className="font-medium">ONLINE RANKED CHOICE VOTING APP</p>
        <h1 className="font-black text-6xl">
          Secure, Transparent, and Trustless Elections for Everyone
        </h1>
        <p className="font-medium">
          Empowering Democracy with Decentralized Voting.
        </p>
        {account ? (
          <div className="flex space-x-7">
            <AddressTag variant="neutral" />
            <Button loading={false} variant="neutral" content="Register to vote" eventName={goToRegister} />
          </div>
        ) : (
          <Button
            eventName={connectWallet}
            content="Connect Wallet"
            loading={loading}
            variant="neutral"
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
