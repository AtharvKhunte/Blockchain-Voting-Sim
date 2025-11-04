import { motion } from 'framer-motion'

export default function BlockCard({ block, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-700 w-full md:w-1/2"
    >
      <h3 className="text-lg font-semibold text-blue-400 mb-2">Block #{index}</h3>
      <p><span className="font-bold">Voter:</span> {block.voter}</p>
      <p><span className="font-bold">Candidate:</span> {block.candidate}</p>
      <p className="truncate text-sm text-gray-400 mt-2"><span className="font-bold">Hash:</span> {block.hash}</p>
      <p className="truncate text-sm text-gray-400"><span className="font-bold">Prev:</span> {block.prevHash}</p>
    </motion.div>
  )
}
