import { createPortal } from "react-dom";

export default function ClickMenu({
  open,
  x,
  y,
  onCloseDeleteIndex,
  onCloseKeepIndex,
  items = [],
  width = 180,
}) {
  if (!open) return null;

  const pad = 8;
  const vw = window.innerWidth,
    vh = window.innerHeight;
  const approxHeight = Math.min(40 * items.length + 12, 240);
  const left = Math.min(Math.max(pad, x), vw - width - pad);
  const top = Math.min(Math.max(pad, y), vh - approxHeight - pad);

  return createPortal(
    <div
      // FULLSCREEN CLICK CATCHER
      onClick={onCloseDeleteIndex}
      style={{
        position: "fixed",
        inset: 0, // top/right/bottom/left = 0
        zIndex: 9999,
        background: "transparent", // keep page visible
      }}
    >
      <div
        role="menu"
        onClick={(e) => e.stopPropagation()} // don't bubble to overlay
        style={{
          position: "fixed",
          left,
          top,
          width,
          zIndex: 10000,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 12px 36px rgba(0,0,0,.2)",
        }}
      >
        {items.map(({ label, onClick }, i) => (
          <button
            key={i}
            className="menu-item"
            role="menuitem"
            onClick={() => {
              onClick?.();
              onCloseKeepIndex?.();
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              border: 0,
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
