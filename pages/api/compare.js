import axios from "axios";

const API_KEY = "DEIN_GOOGLE_API_KEY"; // Hier den API-Schlüssel einfügen
const CX_ID = "DEINE_CX_ID"; // Hier die Suchmaschinen-ID einfügen

export default async function handler(req, res) {
  const { camera1, camera2 } = req.body;

  // Funktion zur Suche von Kameras mit Google Custom Search
  async function fetchCameraSuggestions(camera) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            key: API_KEY,
            cx: CX_ID,
            q: camera,
          },
        }
      );
      return response.data.items.map((item) => item.title); // Extrahiert die Titel der Ergebnisse
    } catch (error) {
      console.error("Fehler bei der Kamerasuche:", error);
      return [];
    }
  }

  // Bekannte Kameras
  const knownCameras = [
    "caddx vista polar starlight",
    "dji o4 air unit",
    "runcam split mini",
    "foxeer predator v5",
  ];

  // Kamera 1 überprüfen
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

  // Kamera 2 überprüfen
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

  // Ergebnisse zurückgeben
  res.status(200).json({
    camera1: camera1Data,
    camera2: camera2Data,
  });
}
