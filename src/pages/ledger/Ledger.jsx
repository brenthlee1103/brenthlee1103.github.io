import React from "react";
import "./ledger.scss";
import { transactions } from "./transactions";

function Ledger() {
  // --- CONFIGURATION: UPDATE THIS DATA MANUALLY ---

  // 1. The Big Number (Total Pool)
  const totalPoolAmount = "$0.00";

  // 2. The Transaction List (Add new rows here)
  // const transactions = [
  //   {
  //     id: 1,
  //     date: "Jan 01-07, 2026",
  //     source: "YouTube AdSense",
  //     amount: "$0.00",
  //     status: "Pending", // Options: Verified, Pending, Processing
  //     proofLink: "#", // Link to your Imgur screenshot
  //   },
  //   {
  //     id: 2,
  //     date: "Jan 04, 2026",
  //     source: "TikTok Creator Fund",
  //     amount: "$0.00",
  //     status: "Pending",
  //     proofLink: "#",
  //   },
  //   {
  //     id: 3,
  //     date: "Jan 02, 2026",
  //     source: "Mercury Bank (Opening)",
  //     amount: "$0.00",
  //     status: "Verified",
  //     proofLink: "#", // You could link to a redacted bank letter here
  //   },
  // ];

  // ------------------------------------------------

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* HEADER */}
        <header className="header">
          <h1 className="brand-name">SILENT ACTS LLC</h1>
          <div className="status-indicator">
            <span className="dot"></span> SYSTEM ONLINE
          </div>
        </header>

        {/* MAIN DISPLAY */}
        <main className="main-display">
          <div className="pool-container">
            <h2 className="pool-label">LIVE GIVEAWAY POOL</h2>
            <div className="pool-amount">{totalPoolAmount}</div>
            <p className="pool-subtext">
              PRE-MONETIZATION PHASE • ACCUMULATING
            </p>
          </div>

          {/* THE LEDGER TABLE */}
          <div className="table-container">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>SOURCE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>PROOF</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="mono-text">{tx.date}</td>
                    <td>{tx.source}</td>
                    <td className="mono-text">{tx.amount}</td>
                    <td>
                      <span
                        className={`status-pill ${tx.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td>
                      <a
                        href={tx.proofLink}
                        target="_blank"
                        rel="noreferrer"
                        className="proof-link"
                      >
                        VIEW 🔗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p>OFFICIAL PUBLIC LEDGER • SILENT ACTS LLC</p>
          <p className="legal-text">
            Data is updated manually upon receipt of funds. <br />
            <a
              href="https://docs.google.com/document/d/1qYacosVxQgSAT6Kk7DyDcT34DGKkeFaUtV_MjMntp8w/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Official Rules & Disclaimer
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Ledger;
