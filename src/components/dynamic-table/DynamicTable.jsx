import "./dynamic-table.scss";

function DynamicTable({ rows = [], loading = true, running = true }) {
  const hasData = rows && rows.length > 0;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Email</th>
            <th>Date</th>
            <th>Earliest</th>
            <th>Latest</th>
            <th># of Players</th>
          </tr>
        </thead>
        <tbody>
          {running && (
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5">
                Adding your new reservation to the queue.
              </td>
            </tr>
          )}
          {hasData ? (
            rows.map((r, i) => (
              <tr key={`${r.email}-${r.date}-${i}`}>
                <td>{r.email}</td>
                <td>{r.date}</td>
                <td>{r.earliest}</td>
                <td>{r.latest}</td>
                <td>{r.players}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ textAlign: "center" }} colSpan="5">
                {loading
                  ? "Loading data"
                  : running
                  ? "Loading new data"
                  : "There are no tee times being made!"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
