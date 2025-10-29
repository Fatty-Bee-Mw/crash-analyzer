export default function AdvicePanel({advice}) {
  return (
    <div className="card h-100">
      <div className="card-header bg-success text-white">Safe Cashout Advice</div>
      <div className="card-body">
        <p className="mb-2">Threshold 1 (conservative): <strong>{advice.threshold1.toFixed(2)}x</strong></p>
        <p className="mb-3">Threshold 2 (moderate): <strong>{advice.threshold2.toFixed(2)}x</strong></p>
        <h5>Next Likely Signals</h5>
        <ul className="list-group list-group-flush">
          {advice.signals.map((s,i)=>(
            <li key={i} className="list-group-item">
              {s.multiplier}x → approx {(s.avgInterval/1000).toFixed(1)}s later
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

