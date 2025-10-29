import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function CrashChart({crashData}) {
  const labels = crashData.map(d => new Date(d.timestamp).toLocaleTimeString());
  const data = crashData.map(d => d.point);
  const pointColors = crashData.map(d => d.point<=1.99?"green":d.point<=3.99?"orange":"red");

  const chartData = {
    labels,
    datasets:[{
      label:"Crash Points",
      data,
      borderColor:"blue",
      backgroundColor:pointColors,
      pointRadius:5,
      pointHoverRadius:7
    }]
  };

  return <div style={{height:"400px"}}><Line data={chartData} /></div>;
}

