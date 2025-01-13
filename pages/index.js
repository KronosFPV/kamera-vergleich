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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Kamera Vergleich</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cam 1"
          value={camera1}
          onChange={(e) => setCamera1(e.target.value)}
          style={{
            padding: '10px',
            width: '200px',
            border: '1px solid #ccc',
            borderRadius: '5px',
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
            border: '1px solid #ccc',
            borderRadius: '5px',
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
          <h2 style={{ textAlign: 'center' }}>Vergleichsergebnisse</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Kamera 1 */}
            <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#f9f9f9' }}>
              <h3 style={{ textAlign: 'center', color: '#333' }}>{result.camera1.name}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><strong>Latenz:</strong> {result.camera1.latency}</li>
                <li><strong>Auflösung:</strong> {result.camera1.resolution}</li>
                <li><strong>FPS:</strong> {result.camera1.fps}</li>
                <li><strong>Signalstärke:</strong> {result.camera1.signalStrength}</li>
              </ul>
            </div>

            {/* Kamera 2 */}
            <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '20px', background: '#f9f9f9' }}>
              <h3 style={{ textAlign: 'center', color: '#333' }}>{result.camera2.name}</h3>
              <ul style={{ listStyle: 'none', padding: 
