const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

const whitelist = [
  "0x1234567890abcdef1234567890abcdef12345678",
  "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  "0x9876543210abcdef9876543210abcdef98765432"
];

const leafNodes = whitelist.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const merkleRoot = merkleTree.getHexRoot();
console.log("Merkle Root:", merkleRoot);

whitelist.forEach(addr => {
  const proof = merkleTree.getHexProof(keccak256(addr));
  console.log(`Proof for ${addr}:`, proof);
});
