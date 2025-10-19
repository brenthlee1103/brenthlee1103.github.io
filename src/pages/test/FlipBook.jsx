// import React, { useState, useEffect, useMemo } from "react";
// import "./flip-book.scss";
// import pfp from "@/assets/newpfp.gif";
// import MainHeader from "@/components/home-page/main-header/MainHeader";

// // Single-file React component using only HTML + SCSS-compatible CSS + JS.
// // It renders a realistic 3D flipbook with cover + 5 pages and next/prev controls.
// // Pages are arranged as sheets (front/back) so that the back of Page 2 is Page 3.

// function FlipBook() {
//   const [sheet, setSheet] = useState(0); // how many sheets are flipped
//   // We have 3 sheets total: 0 (Cover ↔ Page 1), 1 (Page 2 ↔ Page 3), 2 (Page 4 ↔ Page 5)
//   const totalSheets = 3;

//   // Whether the book is opened (cover fully flipped)
//   const [opened, setOpened] = useState(false);

//   const canPrev = sheet > 0;
//   const canNext = sheet < totalSheets;

//   const goNext = () => canNext && setSheet((s) => s + 1);
//   const goPrev = () => canPrev && setSheet((s) => s - 1);

//   // When the cover finishes flipping, reveal the left stack to avoid a flash of blank
//   const handleCoverTransition = (e) => {
//     if (
//       e.target === e.currentTarget &&
//       e.propertyName === "transform" &&
//       sheet >= 1
//     ) {
//       setOpened(true);
//     }
//   };

//   // Content of the pages
//   const pages = useMemo(
//     () => ({
//       coverTitle: "Brent Lee Portfolio",
//       p1: (
//         <div>
//           <h2>Experience</h2>
//           <ul>
//             <li>Frontend Engineer — React / TypeScript</li>
//             <li>Backend — Node.js, Express, REST</li>
//             <li>Systems — Ubuntu, WireGuard, Cloudflare</li>
//             <li>IoT — ESP32, sensors, smart home</li>
//           </ul>
//         </div>
//       ),
//       p2: (
//         <div>
//           <h2>More</h2>
//           <p>
//             Building interactive UIs, realtime data flows, and polished
//             developer experiences. Loves clean abstractions, strong a11y, and
//             crisp CSS.
//           </p>
//           <p>
//             Recent: portfolio revamp, API server on SBCs, VPN + DDNS setups, and
//             fun browser games (Snake, Pac‑Man) for learning.
//           </p>
//         </div>
//       ),
//       p3: (
//         <div>
//           <h2>Projects</h2>
//           <ul>
//             <li>In‑memory spreadsheet with formulas</li>
//             <li>Voice assistant on SBC (local)</li>
//             <li>Smart switch automations (ESP32)</li>
//             <li>Personal media server + tooling</li>
//           </ul>
//         </div>
//       ),
//       p4: (
//         <div>
//           <h2>Skills</h2>
//           <p>React, Vue 3, Node, Express, JS/TS, CSS/SCSS, Docker, NGINX.</p>
//           <p>Infra basics, CI/CD, testing, perf, observability.</p>
//         </div>
//       ),
//       p5: (
//         <div>
//           <h2>Contact</h2>
//           <p>Email: brent@example.com</p>
//           <p>Site: brenthlee1103.github.io</p>
//           <p>Let’s build something delightful.</p>
//         </div>
//       ),
//     }),
//     []
//   );

//   // Reset to closed state when returning to cover
//   useEffect(() => {
//     if (sheet === 0) setOpened(false);
//   }, [sheet]);

//   return (
//     <div className="page-stuff">
//       <MainHeader />
//       <div className="fill-page">
//         <div className="flipbook-demo">
//           <div className="stage">
//             <div className="book-wrap" aria-label="Flipbook: Brent Lee">
//               {/* Left stack (already-read pages) visual appears only after opening the cover */}
//               {opened && <div className="left-stack" aria-hidden />}
//               {opened && <div className="spine" aria-hidden />}

//               <div className="book">
//                 {/* SHEET 0: Cover (front) ⟷ Page 1 (back) */}
//                 <div
//                   className={`sheet s0 ${sheet >= 1 ? "flipped" : ""}`}
//                   onTransitionEnd={handleCoverTransition}
//                 >
//                   <section className="page front cover">
//                     <div className="page-inner">
//                       <div>
//                         <h1>{pages.coverTitle}</h1>
//                         <img src={pfp} className="pfp-cover" />
//                         {/* <p>Flip the cover to begin.</p> */}
//                       </div>
//                       {/* <div className="num">Cover</div> */}
//                     </div>
//                   </section>
//                   <section className="page back">
//                     <div className="page-inner">
//                       <div>{pages.p1}</div>
//                       <div className="num">Page 1</div>
//                     </div>
//                   </section>
//                 </div>

//                 {/* SHEET 1: Page 2 (front) ⟷ Page 3 (back) */}
//                 <div className={`sheet s1 ${sheet >= 2 ? "flipped" : ""}`}>
//                   <section className="page front">
//                     <div className="page-inner">
//                       {pages.p2}
//                       <div className="num">Page 2</div>
//                     </div>
//                   </section>
//                   <section className="page back">
//                     <div className="page-inner">
//                       {pages.p3}
//                       <div className="num">Page 3</div>
//                     </div>
//                   </section>
//                 </div>

//                 {/* SHEET 2: Page 4 (front) ⟷ Page 5 (back) */}
//                 <div className={`sheet s2 ${sheet >= 3 ? "flipped" : ""}`}>
//                   <section className="page front">
//                     <div className="page-inner">
//                       {pages.p4}
//                       <div className="num">Page 4</div>
//                     </div>
//                   </section>
//                   <section className="page back">
//                     <div className="page-inner">
//                       {pages.p5}
//                       <div className="num">Page 5</div>
//                     </div>
//                   </section>
//                 </div>
//               </div>
//             </div>

//             <div className="controls" role="group" aria-label="Book navigation">
//               <button onClick={goPrev} disabled={!canPrev}>
//                 ◀︎ Previous
//               </button>
//               <button onClick={goNext} disabled={!canNext}>
//                 Next ▶︎
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FlipBook;
import React, { useState, useMemo, useEffect } from "react";
import "./flip-book.scss";
import { Sheet } from "./Sheet"; // <- import the component above
import pfp from "@/assets/newpfp.gif";
import MainHeader from "@/components/home-page/main-header/MainHeader";

/** Pair a flat array of nodes into [front, back] sheets.
 * If coverNode is provided, sheet0 = [coverNode, pages[0]], then rest as pairs.
 */
function toSheets(pages, { coverNode } = {}) {
  const sheets = [];
  let startIndex = 0;

  if (coverNode) {
    sheets.push([coverNode, pages[0] ?? null]); // cover on front, page1 on back
    startIndex = 1;
  }
  for (let i = startIndex; i < pages.length; i += 2) {
    const front = pages[i];
    const back = pages[i + 1] ?? null;
    sheets.push([front, back]);
  }
  return sheets;
}

export default function FlipBook() {
  const [sheet, setSheet] = useState(0); // how many sheets are flipped
  const [opened, setOpened] = useState(false); // show left stack only after cover finishes flip

  // Build your pages as plain nodes (no numbers needed here)
  const pageNodes = useMemo(() => {
    const p1 = (
      <div>
        <h2>Experience</h2>
        <ul>
          <li>Frontend Engineer — React / TypeScript</li>
          <li>Backend — Node.js, Express, REST</li>
          <li>Systems — Ubuntu, WireGuard, Cloudflare</li>
          <li>IoT — ESP32, sensors, smart home</li>
        </ul>
        <div className="num">Page 1</div>
      </div>
    );
    const p2 = (
      <div>
        <h2>More</h2>
        <p>
          Building interactive UIs, realtime data flows, and polished developer
          experiences. Loves clean abstractions, strong a11y, and crisp CSS.
        </p>
        <p>
          Recent: portfolio revamp, API server on SBCs, VPN + DDNS setups, and
          fun browser games (Snake, Pac-Man) for learning.
        </p>
        <div className="num">Page 2</div>
      </div>
    );
    const p3 = (
      <div>
        <h2>Projects</h2>
        <ul>
          <li>In-memory spreadsheet with formulas</li>
          <li>Voice assistant on SBC (local)</li>
          <li>Smart switch automations (ESP32)</li>
          <li>Personal media server + tooling</li>
        </ul>
        <div className="num">Page 3</div>
      </div>
    );
    const p4 = (
      <div>
        <h2>Skills</h2>
        <p>React, Vue 3, Node, Express, JS/TS, CSS/SCSS, Docker, NGINX.</p>
        <p>Infra basics, CI/CD, testing, perf, observability.</p>
        <div className="num">Page 4</div>
      </div>
    );
    const p5 = (
      <div>
        <h2>Contact</h2>
        <p>Email: brent@example.com</p>
        <p>Site: brenthlee1103.github.io</p>
        <p>Let’s build something delightful.</p>
        <div className="num">Page 5</div>
      </div>
    );
    return [p1, p2, p3, p4, p5];
  }, []);

  // Optional cover node (right side only at start)
  const coverNode = useMemo(
    () => (
      <div style={{ textAlign: "center" }}>
        <h1>Brent Lee Portfolio</h1>
        <img src={pfp} className="pfp-cover" alt="Brent profile" />
      </div>
    ),
    []
  );

  // Pair pages into sheets. With a cover, sheet0 = [cover, p1], sheet1 = [p2,p3], sheet2 = [p4,p5]
  const sheets = useMemo(
    () => toSheets(pageNodes, { coverNode }),
    [pageNodes, coverNode]
  );

  const totalSheets = sheets.length;
  const canPrev = sheet > 0;
  const canNext = sheet < totalSheets;

  const goNext = () => canNext && setSheet((s) => s + 1);
  const goPrev = () => canPrev && setSheet((s) => s - 1);

  // When the cover finishes flipping, reveal the left stack to avoid a flash of blank
  const handleCoverTransition = (e) => {
    if (
      e.target === e.currentTarget &&
      e.propertyName === "transform" &&
      sheet >= 1
    ) {
      setOpened(true);
    }
  };

  // Reset to closed state when returning to cover
  useEffect(() => {
    if (sheet === 0) setOpened(false);
  }, [sheet]);

  return (
    <div className="page-stuff">
      <MainHeader />
      <div className="fill-page">
        <div className="flipbook-demo">
          <div className="stage">
            <div className="book-wrap" aria-label="Flipbook: Brent Lee">
              {opened && <div className="left-stack" aria-hidden />}
              {opened && <div className="spine" aria-hidden />}

              <div className="book">
                {sheets.map(([front, back], i) => {
                  const isCover = i === 0;
                  const flipped = sheet >= i + 1; // same threshold logic you had (sheet count means how many flipped)
                  const onTransitionEnd = isCover
                    ? handleCoverTransition
                    : undefined;

                  return (
                    <Sheet
                      key={i}
                      index={i}
                      flipped={flipped}
                      isCover={isCover}
                      front={front}
                      back={back}
                      onNext={goNext}
                      onPrev={goPrev}
                      onCoverTransitionEnd={onTransitionEnd}
                    />
                  );
                })}
              </div>
            </div>

            <div className="controls" role="group" aria-label="Book navigation">
              <button onClick={goPrev} disabled={!canPrev}>
                ◀︎ Previous
              </button>
              <button onClick={goNext} disabled={!canNext}>
                Next ▶︎
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
