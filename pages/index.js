import React, { useState } from "react";

export default function Home() {
  const [camera1, setCamera1] = useState("");
  const [camera2, setCamera2] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState({});

  async function handleCompare() {
    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ camera1, camera2 }),
      });

      if (response.status === 404) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      } else {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.error("Fehler beim Vergleich:", error);
    }
  }

  return (
    <div style={{ color: "white", backgroundColor: "#121212", padding: "20px" }}>
      <h1>Kamera Vergleich</h1>
      <input
        type="text"
        placeholder="Kamera 1"
        value={camera1}
        onChange={(e) => setCamera1(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Kamera 2"
        value={camera2}
        onChange={(e) => setCamera2(e.target.value)}
      />
      <button onClick={handleCompare}>Los, zeig was besser ist!</button>

      {suggestions && suggestions.length > 0 && (
        <div>
          <h2>Vorschläge</h2>
          {suggestions.map((sug, index) => (
            <p key={index}>{sug}</p>
          ))}
        </div>
      )}

      {result && (
        <div>
          <h2>Vergleichsergebnisse</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
