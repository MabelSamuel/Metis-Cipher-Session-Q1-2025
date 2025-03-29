// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Airdrop is Ownable {
    IERC20 public token;
    bytes32 public merkleRoot;
    uint256 public claimAmount;
    mapping(address => bool) public hasClaimed;

    event AirdropClaimed(address indexed user, uint256 amount);
    event MerkleRootUpdated(bytes32 newRoot);
    event TokensWithdrawn(address indexed admin, uint256 amount);

    constructor(address _token, bytes32 _merkleRoot, uint256 _claimAmount) Ownable(msg.sender) {
        token = IERC20(_token);
        merkleRoot = _merkleRoot;
        claimAmount = _claimAmount;
    }

    function claimAirdrop(bytes32[] calldata merkleProof) external {
        require(!hasClaimed[msg.sender], "Already claimed");
        
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Not whitelisted");

        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, claimAmount), "Transfer failed");

        emit AirdropClaimed(msg.sender, claimAmount);
    }

    function updateMerkleRoot(bytes32 _newRoot) external onlyOwner {
        merkleRoot = _newRoot;
        emit MerkleRootUpdated(_newRoot);
    }

    function updateClaimAmount(uint256 _newAmount) external onlyOwner {
        claimAmount = _newAmount;
    }

    function withdrawTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Withdraw failed");
        emit TokensWithdrawn(owner(), balance);
    }
}
