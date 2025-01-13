export default function handler(req, res) {
  const { camera1, camera2 } = req.query;

  const dummyData = {
    "caddx vista polar starlight": {
      name: "Caddx Vista Polar Starlight",
      specs: {
        latency: "0.43 ms",
        resolution: "1080p",
        fps: "60 fps",
        signalStrength: "0.00 dBm",
        weight: "28 g",
        fov: "150°",
        bitrate: "25 Mbps",
        compatibility: "DJI FPV Goggles V2",
      },
    },
    "dji o4 air unit": {
      name: "DJI O4 Air Unit",
      specs: {
        latency: "0.05 ms",
        resolution: "1080p",
        fps: "60 fps",
        signalStrength: "0.03 dBm",
        weight: "36 g",
        fov: "155°",
        bitrate: "50 Mbps",
        compatibility: "DJI Goggles 2, Integra",
      },
    },
  };

  const camera1Data = dummyData[camera1.toLowerCase()] || null;
  const camera2Data = dummyData[camera2.toLowerCase()] || null;

  if (!camera1Data || !camera2Data) {
    res.status(404).json({ error: "Eine oder beide Kameras wurden nicht gefunden." });
    return;
  }

  res.status(200).json({ camera1: camera1Data, camera2: camera2Data });
}
