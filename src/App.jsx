import React, { useState, useEffect } from "react";
import BlockCard from "./components/BlockCard";
import VoteChart from "./components/VoteChart";

// Simple hash generator for simulation
function generateHash(voter, candidate, prevHash) {
  return (
    (voter + candidate + prevHash + Date.now())
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0).toString(16), "")
      .substring(0, 32)
  );
}

export default function App() {
  const [blockchain, setBlockchain] = useState(() => {
    const saved = localStorage.getItem("blockchain");
    return saved ? JSON.parse(saved) : [];
  });

  const [voter, setVoter] = useState("");
  const [candidate, setCandidate] = useState("");
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem("candidates");
    return saved ? JSON.parse(saved) : ["Alice", "Bob", "Charlie"];
  });
  const [newCandidate, setNewCandidate] = useState("");
  const [tally, setTally] = useState({});

  // Update tally whenever blockchain changes
  useEffect(() => {
    localStorage.setItem("blockchain", JSON.stringify(blockchain));
    const t = {};
    blockchain.forEach((b) => {
      t[b.candidate] = (t[b.candidate] || 0) + 1;
    });
    setTally(t);
  }, [blockchain]);

  // Save candidate list to localStorage
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  // Add new vote
  const addBlock = () => {
    if (!voter || !candidate)
      return alert("Please enter voter name and select a candidate!");
    const prevHash = blockchain.length
      ? blockchain[blockchain.length - 1].hash
      : "GENESIS";
    const newBlock = {
      voter,
      candidate,
      prevHash,
      hash: generateHash(voter, candidate, prevHash),
    };
    setBlockchain([...blockchain, newBlock]);
    setVoter("");
    setCandidate("");
  };

  // Add a new candidate
  const addNewCandidate = () => {
    if (!newCandidate.trim()) return alert("Enter candidate name!");
    if (candidates.includes(newCandidate.trim()))
      return alert("Candidate already exists!");
    setCandidates([...candidates, newCandidate.trim()]);
    setNewCandidate("");
  };

  // Reset entire blockchain
  const resetBlockchain = () => {
    if (confirm("Are you sure you want to reset all votes?")) {
      localStorage.removeItem("blockchain");
      setBlockchain([]);
      setTally({});
    }
  };

  // Reset candidates to default
  const resetCandidates = () => {
    if (confirm("Reset candidate list to defaults?")) {
      const defaults = ["Alice", "Bob", "Charlie"];
      localStorage.setItem("candidates", JSON.stringify(defaults));
      setCandidates(defaults);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 space-y-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-blue-400 mt-4">
        🪙 Blockchain Voting Simulator
      </h1>

      {/* Input Section */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full md:w-1/2 space-y-4">
        <input
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
          placeholder="Voter Name"
          value={voter}
          onChange={(e) => setVoter(e.target.value)}
        />

        {/* Candidate Dropdown */}
        <select
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
        >
          <option value="">Select Candidate</option>
          {candidates.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Add new candidate */}
        <div className="flex space-x-2">
          <input
            className="flex-grow p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
            placeholder="Add new candidate"
            value={newCandidate}
            onChange={(e) => setNewCandidate(e.target.value)}
          />
          <button
            onClick={addNewCandidate}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
          >
            Add
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-2">
          <button
            onClick={addBlock}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            Add Vote
          </button>

          <button
            onClick={resetCandidates}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold"
          >
            Reset Candidates
          </button>

          <button
            onClick={resetBlockchain}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
          >
            Reset Blockchain
          </button>
        </div>
      </div>

      {/* Blockchain + Chart Section */}
      <div className="flex flex-wrap gap-6 justify-center w-full">
        <VoteChart tally={tally} />
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {blockchain.length === 0 && (
            <p className="text-gray-400 text-center">
              No blocks yet. Add a vote!
            </p>
          )}
          {blockchain.map((block, i) => (
            <BlockCard key={block.hash} block={block} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
