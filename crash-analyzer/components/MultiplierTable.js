export default function MultiplierTable({groupCounts}) {
  return (
    <div className="card h-100">
      <div className="card-header bg-warning text-dark">Multiplier Group Counts</div>
      <div className="card-body">
        <table className="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>Range</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Small (1.00–1.99x)</td><td>{groupCounts.small}</td></tr>
            <tr><td>Medium (2.00–3.99)</td><td>{groupCounts.medium}</td></tr>
            <tr><td>High (4.00x+)</td><td>{groupCounts.high}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

