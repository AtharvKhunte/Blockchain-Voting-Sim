import sha256 from "crypto-js/sha256";

export class Blockchain {
  constructor() {
    this.chain = [];
  }

  createGenesisBlock() {
    const genesis = {
      index: 0,
      voterId: "0x000",
      candidate: "Genesis Block",
      prevHash: "0",
    };
    genesis.hash = this.calculateHash(genesis);
    this.chain.push(genesis);
  }

  calculateHash(block) {
    return sha256(
      block.index + block.voterId + block.candidate + block.prevHash
    ).toString();
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(voterId, candidate) {
    const prev = this.getLastBlock();
    const newBlock = {
      index: this.chain.length,
      voterId,
      candidate,
      prevHash: prev.hash,
    };
    newBlock.hash = this.calculateHash(newBlock);
    this.chain.push(newBlock);
  }

  verifyIntegrity() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.prevHash !== previous.hash) return false;
      if (current.hash !== this.calculateHash(current)) return false;
    }
    return true;
  }
}
