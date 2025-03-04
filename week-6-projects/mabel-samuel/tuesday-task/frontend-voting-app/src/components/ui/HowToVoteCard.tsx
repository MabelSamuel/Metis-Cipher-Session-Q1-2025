import React from "react";

interface CardProps{
  Icon: React.ComponentType<{ className?: string }>;
  cardText: string;
  cardSubText: string;
  index: number;
}
const HowToVoteCard = ({ cardText, Icon, cardSubText, index }: CardProps) => {
  return (
    <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition-all">
      <Icon className="text-blue-700 size-14 mb-4" />
      <p className="text-lg font-medium">{ cardText }</p>
      <p className="text-gray-500 mt-2">{ cardSubText }.</p>
    </div>
  );
};

export default HowToVoteCard;
