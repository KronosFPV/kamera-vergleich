import axios from "axios";

export default async function handler(req, res) {
  const { camera1, camera2 } = req.body;

  // Liste bekannter Kameras (als Beispiel, kann erweitert werden)
  const knownCameras = [
    "caddx vista polar starlight",
    "dji o4 air unit",
    "runcam split mini",
    "foxeer predator v5",
  ];

  // Funktion, um Kameras im Internet zu suchen
  async function fetchCameraSuggestions(camera) {
    try {
      const response = await axios.get(`https://api.example.com/search`, {
        params: { query: camera },
      });
      return response.data.suggestions || [];
    } catch (error) {
      console.error("Fehler bei der Kamerasuche:", error);
      return [];
    }
  }

  // Überprüfe Kamera 1
  let camera1Data;
  if (knownCameras.includes(camera1.toLowerCase())) {
    camera1Data = {
      name: camera1,
      latency: "0.43 ms",
      resolution: "1080p",
      fps: "60 fps",
      signalStrength: "-90 dBm",
    };
  } else {
    const suggestions = await fetchCameraSuggestions(camera1);
    return res.status(404).json({
      error: `Kamera "${camera1}" nicht gefunden.`,
      suggestions,
    });
  }

  // Überprüfe Kamera 2
  let camera2Data;
  if (knownCameras.includes(camera2.toLowerCase())) {
    camera2Data = {
      name: camera2,
      latency: "0.05 ms",
      resolution: "1080p",
      fps: "60 fps",
      signalStrength: "-80 dBm",
    };
  } else {
    const suggestions = await fetchCameraSuggestions(camera2);
    return res.status(404).json({
      error: `Kamera "${camera2}" nicht gefunden.`,
      suggestions,
    });
  }

  // Ergebnis zurückgeben
  res.status(200).json({
    camera1: camera1Data,
    camera2: camera2Data,
  });
}
