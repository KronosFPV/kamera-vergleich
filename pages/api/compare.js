export default async function handler(req, res) {
  const { camera1, camera2 } = req.query;

  // Dummy-Daten für Kameravergleich
  const fetchData = async (camera) => ({
    name: camera,
    latency: Math.random().toFixed(2) + ' ms',
    resolution: '1080p',
    fps: '60 fps',
    signalStrength: Math.random().toFixed(2) + ' dBm',
  });

  const cam1Data = await fetchData(camera1);
  const cam2Data = await fetchData(camera2);

  res.status(200).json({ camera1: cam1Data, camera2: cam2Data });
}
