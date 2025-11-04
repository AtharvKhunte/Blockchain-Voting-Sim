import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function VoteChart({ tally }) {
  const data = {
    labels: Object.keys(tally),
    datasets: [
      {
        label: 'Votes',
        data: Object.values(tally),
        backgroundColor: 'rgba(59,130,246,0.6)',
        borderRadius: 8,
      },
    ],
  }

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg w-full md:w-1/2">
      <h3 className="text-lg font-semibold text-green-400 mb-2">Vote Tally</h3>
      <Bar data={data} />
    </div>
  )
}
