import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CrashChart from "../components/CrashChart";
import AdvicePanel from "../components/AdvicePanel";
import MultiplierTable from "../components/MultiplierTable";

export default function Home() {
  const [crashData, setCrashData] = useState([]);
  const [advice, setAdvice] = useState({threshold1:0, threshold2:0, signals:[]});
  const [groupCounts, setGroupCounts] = useState({small:0, medium:0, high:0});

  useEffect(() => {
    const socket = new WebSocket("wss://crash.tgaproxy.click/ws/gameserver");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const point = parseFloat(data.crash);
      const timestamp = new Date();

      const newData = [...crashData, {point, timestamp}];
      if(newData.length > 200) newData.shift();
      setCrashData(newData);

      processAnalysis(newData);
    };
  }, [crashData]);

  function processAnalysis(data) {
    const small = data.filter(d=>d.point>=1 && d.point<=1.99);
    const medium = data.filter(d=>d.point>=2 && d.point<=3.99);
    const high = data.filter(d=>d.point>=4);
    setGroupCounts({small:small.length, medium:medium.length, high:high.length});

    const smallAvg = small.reduce((a,b)=>a+b.point,0)/small.length || 0;
    const threshold1 = smallAvg/2;
    const threshold2 = smallAvg;

    // Detect repeated multipliers
    const counts = {};
    data.forEach(d=>{
      const key = d.point.toFixed(2);
      if(!counts[key]) counts[key]=[];
      counts[key].push(d.timestamp);
    });
    const signals = [];
    for(const [key,times] of Object.entries(counts)){
      if(times.length>=2){
        const intervals = times.slice(1).map((t,i)=>t - times[i]);
        const avgInterval = intervals.reduce((a,b)=>a+b,0)/intervals.length;
        signals.push({multiplier:key, avgInterval, last: times[times.length-1]});
      }
    }
    signals.sort((a,b)=>b.avgInterval-a.avgInterval);

    setAdvice({threshold1, threshold2, signals});
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Crash Analyzer SaaS</h1>

      <div className="row mb-4">
        <div className="col-lg-6 mb-3">
          <AdvicePanel advice={advice} />
        </div>
        <div className="col-lg-6 mb-3">
          <MultiplierTable groupCounts={groupCounts} />
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white">Live Crash Chart</div>
        <div className="card-body">
          <CrashChart crashData={crashData} />
        </div>
      </div>

      <footer className="text-center mt-4 mb-2 text-muted">
        Powered by PrimeWager Insights — Free SaaS
      </footer>
    </div>
  );
}

