import { createContext, ReactNode, useContext } from "react";
import { useState, useEffect } from "react";
import { ethers, Eip1193Provider } from "ethers";
import contractABI from "../abi/abi.json";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

interface ContractContextType {
  account: string | null;
  contract: ethers.Contract | null;
  isAdmin: boolean;
  electionActive: boolean;
  totalVotes: number;
  winner: string | null;
  loading: boolean;
  connectWallet: () => Promise<void>;
  startElection: () => Promise<void>;
  endElection: () => Promise<void>;
  addAdmin: (newAdmin: string) => Promise<void>;
  registerVoter: (name: string, age: number, nin: string, nationality: string) => Promise<void>;
  registerContestant: (name: string, age: number, party: string, manifesto: string) => Promise<void>;
}

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const contractAddress = "0xCbBC75BCaB7cF020Bf49940BB4BA8b8040614e5b";
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [electionActive, setElectionActive] = useState<boolean>(false);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (signer) {
      const initContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(initContract);
      console.log("Contract initialized with signer");
    }
  }, [signer]);

  async function connectWallet() {
    console.log("Connecting to wallet...");
    if (!window.ethereum) {
      console.log("MetaMask not installed");
      return;
    }
    try {
      setLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const user = await provider.getSigner();
      setSigner(user);
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const userAddress = await user.getAddress();
      setAccount(userAddress);
      checkAdmin(contractInstance, userAddress);
      fetchElectionStatus(contractInstance);
      fetchTotalVotes(contractInstance);
      fetchWinner(contractInstance);
      toast.success("Wallet Connected!")
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Error Connecting")
    }
    setLoading(false);
  }

  async function getAdmins(contractInstance: ethers.Contract) {
    try {
      let adminList: string[] = [];
      let index = 0;

      while (true) {
        try {
          const adminAddress = await contractInstance.admins(index);
          adminList.push(adminAddress);
          index++;
        } catch (error) {
          break;
        }
      }

      return adminList;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return [];
    }
  }

  async function checkAdmin(
    contractInstance: ethers.Contract,
    userAddress: string
  ) {
    const adminList = await getAdmins(contractInstance);
    setIsAdmin(adminList.includes(userAddress));
  }

  async function fetchElectionStatus(contractInstance: ethers.Contract) {
    if (contract) {
      const status = await contractInstance.electionActive();
      setElectionActive(status);
    }
  }

  async function fetchTotalVotes(contractInstance: ethers.Contract) {
    if (contract) {
      const votes = await contractInstance.getTotalVotes();
      setTotalVotes(Number(votes));
    }
  }

  async function fetchWinner(contractInstance: ethers.Contract) {
    if (contract) {
      const winnerAddress = await contractInstance.presidentElect();
      setWinner(winnerAddress);
    }
  }

  async function startElection() {
    if (contract) {
      setLoading(true);
      try {
        const tx = await contract.startElection();
        await tx.wait();
        fetchElectionStatus(contract);
      } catch (error) {
        console.error("Error starting election:", error);
      }
      setLoading(false);
    }
  }

  async function endElection() {
    if (contract) {
      setLoading(true);
      try {
        const tx = await contract.endElection();
        await tx.wait();
        fetchElectionStatus(contract);
        fetchWinner(contract);
      } catch (error) {
        console.error("Error ending election:", error);
      }
      setLoading(false);
    }
  }

  async function addAdmin(newAdmin: string) {
    if (contract) {
      setLoading(true);
      try {
        const tx = await contract.addAdmin(newAdmin);
        await tx.wait();
        toast.success("Admin added successfully!");
      } catch (error) {
        console.error("Error adding admin:", error);
        toast.error("Error adding admin")
      }
      setLoading(false);
    }
  }

  async function registerVoter(name: string, age: number, nin: string, nationality: string) {
    if (!contract) {
      toast.info("Wallet not connected!");
      return;
    }
  
    setLoading(true);
    try {
      const tx = await contract.registerVoter(account, name, age, nin, nationality);
      toast.info("Registering Voter...");
      await tx.wait();
      toast.success("Voter Registered Successfully!");
    } catch (error) {
      console.error("Error registering voter:", error);
      toast.error("Failed to register voter!");
    }
    setLoading(false);
  }
  
  async function registerContestant(name: string, age: number, party: string, manifesto: string) {
    if (!contract) {
      toast.info("Wallet not connected!");
      return;
    }
  
    setLoading(true);
    try {
      const tx = await contract.registerContestant(account, name, age, party, manifesto);
      toast.info("Registering Contestant...");
      await tx.wait();
      toast.success("Contestant Registered Successfully!");
    } catch (error) {
      console.error("Error registering contestant:", error);
      toast.error("Failed to register contestant!");
    }
    setLoading(false);
  }
  

  return (
    <ContractContext.Provider
      value={{
        account,
        contract,
        isAdmin,
        electionActive,
        totalVotes,
        winner,
        loading,
        startElection,
        endElection,
        addAdmin,
        connectWallet,
        registerVoter,
        registerContestant
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
