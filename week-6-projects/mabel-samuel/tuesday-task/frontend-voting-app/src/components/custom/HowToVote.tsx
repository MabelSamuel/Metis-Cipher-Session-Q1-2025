import {
  AiOutlineWallet,
  AiOutlineUser,
  AiOutlineProfile,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import HowToVoteCard from "../ui/HowToVoteCard";

const HowToVote = () => {
  const howToVote = [
    { cardText: "Connect your wallet", icon: AiOutlineWallet, cardSubText: "Ensure your crypto wallet is connected to access voting" },
    { cardText: "Register as a voter", icon: AiOutlineUser, cardSubText: "Verify your identity and eligibility to vote" },
    { cardText: "Review contestant profiles", icon: AiOutlineProfile, cardSubText: "Check out the contestant details before making a decision" },
    { cardText: 'Click "Vote" to cast your vote', icon: AiOutlineCheckCircle, cardSubText: "Select your candidate and submit your vote" },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">How to Vote</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
        Follow these steps to cast your vote securely in the decentralized voting system.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {howToVote.map((items, index)=>(
            <HowToVoteCard index={index} cardText={items.cardText} cardSubText={items.cardSubText} Icon={items.icon}/>
        ))}
      </div>
    </div>
  );
};

export default HowToVote;
