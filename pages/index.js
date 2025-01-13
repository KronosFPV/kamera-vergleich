import { useState } from 'react';

export default function Home() {
  const [camera1, setCamera1] = useState('');
  const [camera2, setCamera2] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await fetch(`/api/compare?camera1=${encodeURIComponent(camera1)}&camera2=${encodeURIComponent(camera2)}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#f5f5f5',
        minHeight: '100vh',
        backgroundImage: 'url(/Medien.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity: 0.5,
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>Kamera Vergleich</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cam 1"
          value={camera1}
          onChange={(e) => setCamera1(e.target.value)}
          style={{
            padding: '10px',
            width: '200px',
            border: '1px solid #444',
            borderRadius: '5px',
            backgroundColor: '#1e1e1e',
            color: '#f5f5f5',
          }}
        />
        <input
          type="text"
          placeholder="Cam 2"
          value={camera2}
          onChange={(e) => setCamera2(e.target.value)}
          style={{
            padding: '10px',
            width: '200px',
            border: '1px solid #444',
            borderRadius: '5px',
            backgroundColor: '#1e1e1e',
            color: '#f5f5f5',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Los, zeig was besser ist!
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ textAlign: 'center', color: '#ffffff' }}>Vergleichsergebnisse</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              backgroundImage: 'url(/Medien.jpg)',
              backgroundSize: '200px 200px',
              animation: 'rotateTiles 20s infinite linear',
              opacity: 0.5,
              padding: '20px',
            }}
          >
            {/* Kamera 1 */}
            <div style={{ flex: 1, border: '1px solid #444', borderRadius: '10px', padding: '20px', background: '#1e1e1e' }}>
              <h3 style={{ textAlign: 'center', color: '#ffffff' }}>{result.camera1.name}</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#cccccc' }}>
                <li><strong>Latenz:</strong> {result.camera1.latency}</li>
                <li><strong>Auflösung:</strong> {result.camera1.resolution}</li>
                <li><strong>FPS:</strong> {result.camera1.fps}</li>
                <li><strong>Signalstärke:</strong> {result.camera1.signalStrength}</li>
              </ul>
            </div>

            {/* Kamera 2 */}
            <div style={{ flex: 1, border: '1px solid #444', borderRadius: '10px', padding: '20px', background: '#1e1e1e' }}>
              <h3 style={{ textAlign: 'center', color: '#ffffff' }}>{result.camera2.name}</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: '#cccccc' }}>
                <li><strong>Latenz:</strong> {result.camera2.latency}</li>
                <li><strong>Auflösung:</strong> {result.camera2.resolution}</li>
                <li><strong>FPS:</strong> {result.camera2.fps}</li>
                <li><strong>Signalstärke:</strong> {result.camera2.signalStrength}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
