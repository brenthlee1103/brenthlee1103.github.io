import { useMediaQuery, useTheme } from "@mui/material";
import "./dynamic-table.scss";

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
}

function DynamicTable({ rows = [], loading = true, running = true }) {
  const hasData = rows && rows.length > 0;
  const isMobile = useIsMobile();

  const emailMobile = (email) => email.replace("@", "\u200b@");

  return (
    <div className="table-wrap">
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Email</th>
            <th>Date</th>
            <th>Earliest</th>
            <th>Latest</th>
            <th>{isMobile ? "# Ppl" : "Number of Players"}</th>
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
                <td>{isMobile ? emailMobile(r.email) : r.email}</td>
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
