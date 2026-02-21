import "./script-editor.scss";
import { useState } from "react";

function ScriptEditor() {
  const [transcript, setTranscript] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [descriptionPrefix, setDescriptionPrefix] = useState("");
  const [dayNum, setDayNum] = useState("");

  // ⬇️ Official Rules & Links: https://linktr.ee/silentacts

  return (
    <div className="container">
      <div className="col">
        <h3>Day #</h3>
        <input
          id="daynum"
          value={dayNum}
          onChange={(e) => setDayNum(e.target.value)}
        />
        <h3>Description Prefix:</h3>
        <textarea
          rows="2"
          value={descriptionPrefix}
          onChange={(e) => setDescriptionPrefix(e.target.value)}
        />
        <h3>Transcript:</h3>
        <textarea
          rows="20"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <h3>Hashtags:</h3>
        <input
          id="hashtags"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
      </div>
      <div className="col">
        <h3>Final description:</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {`${descriptionPrefix}\n\n⬇️ Official Rules & Links:\nhttps://linktr.ee/silentacts\n\nTranscript:\nDay ${dayNum}. ${transcript}\n\n${hashtags}`}
        </p>
      </div>
    </div>
  );
}

export default ScriptEditor;
