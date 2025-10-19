import React from "react";

export function Sheet({
  index, // 0,1,2...
  flipped, // boolean: is this sheet flipped to the left?
  isCover, // boolean: sheet 0 with cover on front?
  front, // ReactNode for front page content
  back, // ReactNode for back page content (can be null)
  onNext, // click hotzone -> next
  onPrev, // click hotzone -> prev
  onCoverTransitionEnd, // only used by cover to show left stack after flip
}) {
  return (
    <div
      className={`sheet s${index} ${flipped ? "flipped" : ""}`}
      {...(isCover ? { onTransitionEnd: onCoverTransitionEnd } : {})}
    >
      <section className={`page front ${isCover ? "cover" : ""}`}>
        <div className="page-inner">{front}</div>
        {/* Optional hotzone on the front to go forward */}
        <button
          className="hotzone hot-next"
          aria-label="Next"
          onClick={onNext}
        />
      </section>

      {/* Back page (left side). If null/undefined, render nothing */}
      {back != null && (
        <section className="page back">
          <div className="page-inner">{back}</div>
          {/* Optional hotzone on the back to go backward */}
          <button
            className="hotzone hot-prev"
            aria-label="Previous"
            onClick={onPrev}
          />
        </section>
      )}
    </div>
  );
}
