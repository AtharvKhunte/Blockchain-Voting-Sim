import React from "react";

export default function Block({ block }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg mb-4 border border-gray-700">
      <p className="text-sm text-gray-400">Index: {block.index}</p>
      <p>🧾 Voter ID: {block.voterId}</p>
      <p>🗳 Candidate: {block.candidate}</p>
      <p className="text-xs mt-2 text-gray-400 truncate">
        Prev Hash: {block.prevHash}
      </p>
      <p className="text-xs text-gray-400 truncate">Hash: {block.hash}</p>
    </div>
  );
}
