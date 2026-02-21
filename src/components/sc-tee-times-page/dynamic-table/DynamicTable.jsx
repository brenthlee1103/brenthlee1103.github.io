import { useRef, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import "./dynamic-table.scss";

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
}

function DynamicTable({
  rows = [],
  loading = true,
  running = true,
  // rowClickedData,
  onRowMenu,
  clickMenuObj,
}) {
  const hasData = rows && rows.length > 0;
  const isMobile = useIsMobile();

  const lastPoint = useRef({ x: 0, y: 0 });

  const rememberPointer = (e) => {
    const p = e.nativeEvent || e; // PointerEvent
    lastPoint.current = { x: p.clientX ?? 0, y: p.clientY ?? 0 };
  };

  // const handleRowClick = (row, index) => (e) => {
  //   // use click coords if present; otherwise the last pointerdown coords (mobile safety)
  //   const x = e.clientX ?? lastPoint.current.x;
  //   const y = e.clientY ?? lastPoint.current.y;
  //   onRowMenu?.({ row, index, x, y });
  // };

  // const emailMobile = (email) => email.replace("@", "\u200b@");

  // const [selectedIndex, setSelectedIndex] = useState(null);

  // function handleRowClick(row, index) {
  //   const x = e.clientX ?? lastPoint.current.x;
  //   const y = e.clientY ?? lastPoint.current.y;
  //   onRowMenu?.({ row, index, x, y });
  //   rowClickedData(rows[index]);
  //   setSelectedIndex((prev) => (prev === index ? null : index));
  // }

  // const handleRowClick = (row, index) => (e) => {
  //   // use click coords if present; otherwise the last pointerdown coords (mobile safety)
  //   const x = e.clientX ?? lastPoint.current.x;
  //   const y = e.clientY ?? lastPoint.current.y;
  //   onRowMenu?.({ row, index, x, y });
  //   setSelectedIndex((prev) => (prev === index ? null : index));
  // };

  const handleRowClick = (row, index) => (e) => {
    const x = e.clientX ?? lastPoint.current.x;
    const y = e.clientY ?? lastPoint.current.y;
    onRowMenu?.({ row, index, x, y });
    // if (selectedIndex === index) {
    //   sameClickClose();
    // }
    // setSelectedIndex((prev) => (prev === index ? null : index));
  };

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
            <th style={{ width: "30%" }}>Course</th>
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
            rows.map((r, i) => {
              const rowSpecificClass =
                "filled-row" +
                (clickMenuObj.index === i ? " selected-row-class" : "");
              return (
                <tr
                  key={`${r.course}-${r.date}-${i}`}
                  className={rowSpecificClass}
                  onPointerDown={rememberPointer}
                  onClick={handleRowClick(r, i)}
                >
                  <td>{r.course}</td>
                  <td>{r.date}</td>
                  <td>{r.earliest}</td>
                  <td>{r.latest}</td>
                  <td>{r.players}</td>
                </tr>
              );
            })
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
